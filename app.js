const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
const corsOptions = {
  origin: true,
  credentials: true
};

dotenv.config();
app.use(bodyParser.json({ limit: "200mb" }));
app.use(bodyParser.urlencoded({ limit: "200mb",  extended: true, parameterLimit: 1000000 }));
app.use(cors(corsOptions))

app.use(cookieParser());


global.appRoot = path.resolve(__dirname);



var router = require('./src/routes/index')


app.use('/', router)


app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});




module.exports = app;
