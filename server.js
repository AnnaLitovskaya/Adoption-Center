const express = require('express');
const app = express();
const { syncAndSeed, db } = require('./db/seed');

app.get('/', (req, res, next) => {
  try {
    res.send(`<h1>sup</h1>`);
  } catch (ex) {
    next(ex);
  }
});

const init = async () => {
  try {
    db.authenticate;
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`App listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
