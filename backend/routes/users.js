var express = require('express');
var router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const auth = require('../services/auth');
//POST Register User
router.post('/signup', async (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send('Username and password required');
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  User.create({
    username: req.body.username,
    password: hashedPassword,
  })
    .then((newUser) => {
      res.json({
        id: newUser.id,
        username: newUser.username,
      });
    })
    .catch(() => {
      res.status(400).send();
    });
});

//POST SignIn
router.post('/login', async (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then(async (user) => {
    //check if user exists
    if (!user) {
      res.status(404).send('invalid username or password');
      return;
    }
    //check the password
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (valid) {
      //create the token
      const jwt = auth.createJWT(user);
      res.status(200).send({ jwt });
    } else {
      res.status(401).send('invalid username or password');
    }
  });
});

module.exports = router;
