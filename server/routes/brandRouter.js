const Router = require('express');
const brandController = require("../controllers/brandController")
const router = new Router();
const chekRole = require('../middleware/checkRoleMiddleware');

router.post('/', chekRole('ADMIN'), brandController.create)
router.get('/', brandController.getAll)

module.exports = router;