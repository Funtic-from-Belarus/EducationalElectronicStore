const { Sequelize } = require('sequelize');

module.exports = new Sequelize({
   database: process.env.DB_NAME,
   username: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   dialect: 'postgres',
   host: process.env.DB_HOST,
   port: process.env.DB_PORT
}
)
// const Sequelize = require("sequelize");
// const sequelize = new Sequelize("usersdb2", "root", "123456", {
//   dialect: "postgres"
// });

