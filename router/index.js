var express = require('express');
var router = express.Router();
const {
  model: { Cat, Family },
} = require('../db/seed');

router.get('/', async (req, res, next) => {
  try {
    const cats = await Cat.findAll({
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
    });
    res.send(`
      <!DOCTYPE html>
      <head>
        <link rel="stylesheet" href="../assets/style.css">
        <script src="https://kit.fontawesome.com/c53e161ee7.js" crossorigin="anonymous"></script>
        <title>Kitty Bean Shelter</title>
      </head>
      <body>
        <div id="head">
          <h1><a href='/'>Kitty Bean Shelter</a></h1>
        </div>
        <div>
          <ul id='cats'>
          ${cats
            .map((cat) => {
              return `
                <li>
                  <h3>${cat.name}</h3>
                  <a href='/cats/${cat.id}'>
                    <img src="../assets/images/${cat.image}" /></a>
                  <div>${cat.sex} <i class="fas fa-paw"></i> ${cat.age}</div>
                  <div>
                    ${cat.color} <i class="fas fa-paw"></i> ${cat.hairLength}
                  </div>
                  <div>
                    ${
                      cat.familyId !== null
                        ? ` <div>Family: <a href='/family/${cat.familyId}'>
                        ${cat.family.name}</a></div> `
                        : ''
                    }
                  </div>
                  <div>
                    ${
                      cat.pairId !== null
                        ? ` <div>Adopt With: <a href='/cats/${cat.pair.id}'>${cat.pair.name}</a></div> `
                        : ''
                    }
                  </div>
                </li>`;
            })
            .join('')}
          </ul>
        </div>
      </body>
      </html>
    `);
  } catch (ex) {
    next(ex);
  }
});

router.get('/cats/:id', async (req, res, next) => {
  try {
    const cat = await Cat.findByPk(req.params.id, {
      include: [
        {
          model: Cat,
          as: 'pair',
        },
        {
          model: Family,
          include: {
            model: Cat,
          },
        },
      ],
    });
    res.send(`
    <!DOCTYPE html>
    <head>
      <link rel="stylesheet" href="../assets/style.css">
      <script src="https://kit.fontawesome.com/c53e161ee7.js" crossorigin="anonymous"></script>
      <title>Kitty Bean Shelter</title>
    </head>
    <body>
      <div id="head">
        <h1><a href='/'>Kitty Bean Shelter</a></h1>
      </div>
      <div id='cats'>
        <div id='cat'>
          <h3>${cat.name}</h3>
          <a href='/cats/${cat.id}'>
            <img src="../assets/images/${cat.image}" /></a>
          <div>${cat.sex} <i class="fas fa-paw"></i> ${cat.age}</div>
          <div>
            ${cat.color} <i class="fas fa-paw"></i> ${cat.hairLength}
          </div>
          <div>
            ${
              cat.familyId !== null
                ? ` <div>Family: <a href='/family/${cat.familyId}'>
                ${cat.family.name}</a></div> `
                : ''
            }
          </div>
          <div>
            ${
              cat.pairId !== null
                ? ` <div>Adopt With: <a href='/cats/${cat.pair.id}'>${cat.pair.name}</a></div> `
                : ''
            }
          </div>
        </div>
      </div>
    </body>
    </html>`);
  } catch (ex) {
    next(ex);
  }
});

router.get('/family/:id', async (req, res, next) => {
  try {
    const family = await Family.findByPk(req.params.id, {
      include: {
        model: Cat,
        include: [
          {
            model: Cat,
            as: 'pair',
          },
          {
            model: Family,
            include: {
              model: Cat,
            },
          },
        ],
      },
    });
    // res.send(family);
    res.send(`
      <!DOCTYPE html>
      <head>
        <link rel="stylesheet" href="../assets/style.css">
        <script src="https://kit.fontawesome.com/c53e161ee7.js" crossorigin="anonymous"></script>
        <title>Kitty Bean Shelter</title>
      </head>
      <body>
        <div id="head">
          <h1><a href='/'>Kitty Bean Shelter</a></h1>
        </div>
        <div>
          <ul id='cats'>
          ${family.cats
            .map((cat) => {
              return `
                <li>
                  <h3>${cat.name}</h3>
                  <a href='/cats/${cat.id}'>
                    <img src="../assets/images/${cat.image}" /></a>
                  <div>${cat.sex} <i class="fas fa-paw"></i> ${cat.age}</div>
                  <div>
                    ${cat.color} <i class="fas fa-paw"></i> ${cat.hairLength}
                  </div>
                  <div>
                    ${
                      cat.familyId !== null
                        ? ` <div>Family: <a href='/family/${cat.familyId}'>
                        ${cat.family.name}</a></div> `
                        : ''
                    }
                  </div>
                  <div>
                    ${
                      cat.pairId !== null
                        ? ` <div>Adopt With: <a href='/cats/${cat.pair.id}'>${cat.pair.name}</a></div> `
                        : ''
                    }
                  </div>
                </li>`;
            })
            .join('')}
          </ul>
        </div>
      </body>
      </html>
    `);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
