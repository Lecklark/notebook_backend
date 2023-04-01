const Router = require('express');
const router = new Router();
const contactController = require('../controllers/contact-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/',authMiddleware, contactController.create)
router.get('/',authMiddleware, contactController.getAll)
router.delete('/:id',authMiddleware, contactController.delete)

module.exports = router;
