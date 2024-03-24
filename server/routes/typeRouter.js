const Router = require('express');
const typeController = require('../controllers/typeController')
const router = new Router();
const chekRole = require('../middleware/checkRoleMiddleware');

router.post('/', chekRole('ADMIN'), typeController.create)
router.get('/', typeController.getAll)

module.exports = router;