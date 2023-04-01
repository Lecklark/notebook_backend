const Router = require('express');
const router = new Router();
const userRouter = require('./user-router');
const contactRouter = require('./contact-router');

router.use('/user', userRouter);
router.use('/contacts', contactRouter);

module.exports = router;
