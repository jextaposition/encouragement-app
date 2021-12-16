const express = require('express');
const router = express.Router();
const { Encouragement } = require('../models');

/* GET all encouragements. */
router.get('/', function (req, res, next) {
  //res.send('respond with a resource');
  Encouragement.findAll().then((encourageList) => {
    res.json(encourageList);
  });
});

//GET /:id get individual encouragement
router.get('/:id', (req, res, next) => {
  const encourageId = parseInt(req.params.id);

  Encouragement.findOne({
    where: {
      id: encourageId,
    },
  }).then((theEncouraged) => {
    if (theEncouraged) {
      res.json(theEncouraged);
    } else {
      res.status(404).send();
    }
  });
});

// POST create an encouragement
router.post('/', async (req, res, next) => {
  const user = req.user;

  if (!user) {
    res.status(403).send();
    return;
  }
  //create the post with the user id
  Encouragement.create({
    title: req.body.title,
    scripture: req.body.scripture,
    encouragement: req.body.encouragement,
    prayer: req.body.prayer,
    UserId: user.id,
  })
    .then((newEncouragement) => {
      res.json(newEncouragement);
    })
    .catch(() => {
      res.status(400).send;
    });
});

// PUT update an encouragement

router.put('/:id', (req, res, next) => {
  const encourageId = parseInt(req.params.id);

  if (!encourageId || encourageId <= 0) {
    res.status(400).send('Invalid ID 😪');
    return;
  }

  const user = req.user;

  if (!user) {
    res.status(403).send();
    return;
  }

  Encouragement.update(
    {
      title: req.body.title,
      scripture: req.body.scripture,
      encouragement: req.body.encouragement,
      prayer: req.body.prayer,
    },
    {
      where: {
        id: encourageId,
      },
    }
  )
    .then(() => {
      res.status(204).send();
    })
    .catch(() => {
      res.status(400).send();
    });
});

// DELETE delete an encouragement

router.delete('/:id', (req, res, next) => {
  const encourageId = parseInt(req.params.id);

  if (!encourageId || encourageId <= 0) {
    res.status(400).send('Invalid ID 😪');
    return;
  }

  const user = req.user;

  if (!user) {
    res.status(403).send();
    return;
  }

  Encouragement.destroy({
    where: {
      id: encourageId,
    },
  })
    .then(() => {
      res.status(204).send();
    })
    .catch(() => {
      res.status(400).send();
    });
});

module.exports = router;
