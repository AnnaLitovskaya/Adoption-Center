const express = require('express');
const app = express();
const { syncAndSeed, db } = require('./db/seed');
const path = require('path');
const router = require('./router');

app.use('/', router);

app.use('/assets', express.static(path.join(__dirname, 'assets')));

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
