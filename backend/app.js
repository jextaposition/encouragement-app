const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const models = require('./models');

const usersRouter = require('./routes/users');
const encouragementsRouter = require('./routes/encouragements');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

models.sequelize.sync({ alter: true }).then(function () {
  console.log("DB Sync'd up");
});

app.use('/users', usersRouter);
app.use('/encouragements', encouragementsRouter);

module.exports = app;
