const tokenService = require('../service/token-service');

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      res.status(401).json({message: 'Пользователь не авторизован'})
      return;
    }
    const userDecoded = tokenService.validateAccessToken(token);

    if (!userDecoded) {
      res.status(401).json({message: 'Пользователь не авторизован'})
      return
    }

    req.user = userDecoded
    next()
  } catch (err) {
    res.status(401).json({message: 'Пользователь не авторизован'})
  }
}
