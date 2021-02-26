var express = require('express');
var router = express.Router();
const {
  model: { Cat, Family },
} = require('../db/seed');

router.get('/cats', async (req, res, next) => {
  try {
    res.send(
      await Cat.findAll({
        include: [
          {
            model: Cat,
            as: 'pair',
          },
          {
            model: Family,
          },
        ],
        order: ['name'],
      })
    );
  } catch (ex) {
    next(ex);
  }
});

router.get('/cats/:id', async (req, res, next) => {
  try {
    res.send(
      await Cat.findByPk(req.params.id, {
        include: {
          model: Cat,
          as: 'pair',
        },
        include: {
          model: Family,
          include: {
            model: Cat,
          },
        },
      })
    );
  } catch (ex) {
    next(ex);
  }
});

router.get('/family', async (req, res, next) => {
  try {
    res.send(
      await Family.findAll({
        include: {
          model: Cat,
        },
      })
    );
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
