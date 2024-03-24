const Router = require('express');
const deviceController = require('../controllers/deviceController')
const router = new Router();
const chekRole = require('../middleware/checkRoleMiddleware');

router.post('/', chekRole('ADMIN'), deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)

module.exports = router;