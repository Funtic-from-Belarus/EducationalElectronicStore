require('dotenv').config();
const ApiError = require("../error/ApiError");
const { User, Basket } = require('../modules/module')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const generateJwt = (id, email, role) => {
   return jwt.sign(
      { id, email, role },
      process.env.SEKRET_KEY,
      { expiresIn: '24h' }
   )
}


class UserController {

   async registration(req, res, next) {
      const { email, password, role } = req.body;
      if (!email || !password) {
         next(ApiError.badRequest("Incorrect email or password"))
      }
      const candidate = await User.findOne({ where: { email } })
      if (candidate) {
         next(ApiError.badRequest("There is already the user with this email"))
      }
      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({ email, role, password: hashPassword });
      const basket = await Basket.create({ userId: user.id });
      const token = generateJwt(user.id, user.email, user.role)
      return res.json(token)
   }

   async login(req, res, next) {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
         return next(ApiError.internal('Пользователь c email не найден'))
      }
      let comparePassword = bcrypt.compareSync(password, user.password)
      if (!comparePassword) {
         return next(ApiError.internal('Указан неверный пароль'))
      }
      const token = generateJwt(user.id, user.email, user.role);

      return res.json(token);
   }

   async check(req, res, next) {
      const token = generateJwt(req.user.id, req.user.email, req.user.role);
      return res.json({ token })
   }

}

module.exports = new UserController();