require('dotenv').config();

const express = require('express');
const models = require("./modules/module")
const sequelize = require('./db');
const app = express();
const cors = require('cors');
const router = require('./routes/index')
const errorHadler = require('./middleware/errorHandlingMiddleware')
const fileUpload = require('express-fileupload');
const path = require('path')

app.use(cors());
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}));
app.use('/api', router)
//app.use(express.static())

app.use(errorHadler)

const PORT = process.env.PORT || 5000;


const start = async () => {
   try {
      await sequelize.authenticate()
      await sequelize.sync()
      app.listen(PORT, () => console.log(`Server started on port ${PORT} ${process.env.SEKRET_KEY}`))

   } catch (error) {
      console.log(error);
   }
}

start();


