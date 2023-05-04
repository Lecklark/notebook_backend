const ApiError = require('../error/api-error');
const { User } = require('../models/models');
const bcrypt = require('bcrypt');
const tokenService = require('../service/token-service');

class UserController {
  async registration(req, res, next) {
    const {email, password} = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest('Некорректный email или password'))
    }
    const candidate = await User.findOne({where: {email}});
    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким email уже существует'))
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({email, password: hashPassword});
    const tokens = tokenService.generateTokens({id: user.id, email: email})
    res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
    return res.json(tokens)
  }

  async login(req, res, next) {
    const {email, password} = req.body
    const user = await User.findOne({where: {email}});
    if (!user) {
      return next(ApiError.badRequest('Пользователь не найден'))
    }
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.badRequest('Указан неверный пароль'))
    }
    const tokens = tokenService.generateTokens({id: user.id, email: email})
    res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
    return res.json(tokens);
  }

  async refresh(req, res, next) {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return next(ApiError.unauthorizedError())
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    if (!userData) {
      return next(ApiError.unauthorizedError())
    }
    const tokens = tokenService.generateTokens({id: userData.id, email: userData.email})
    res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
    return res.json(tokens);
  }
}

module.exports = new UserController();
