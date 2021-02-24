const Sequelize = require('sequelize');
const db = new Sequelize(
  process.send.DATABASE_URL || 'postgres://localhost/cat_shelter_db',
  { logging: false }
);
const { DataTypes } = Sequelize;

const Cat = db.define('cat', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  image: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.name}.jpeg`;
    },
  },
  age: {
    type: DataTypes.ENUM,
    values: ['Kitten', 'Young', 'Adult', 'Senior'],
  },
});

const Breed = db.define('breed', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Breed.belongsTo(Cat);
Cat.belongsTo(Cat, { as: 'relative' });

const syncAndSeed = async () => {
  try {
    await db.sync({ force: true });

    const [
      Abby,
      Bruce,
      Emily,
      Gabriel,
      Huggles,
      Lovebug,
      Midnight,
      Mishka,
      Petunia,
      Porkchop,
      Spots,
      Wayne,
    ] = await Promise.all([
      Cat.create({ name: 'Abby', age: 'Kitten' }),
      Cat.create({ name: 'Bruce', age: 'Kitten' }),
      Cat.create({ name: 'Emily', age: 'Young' }),
      Cat.create({ name: 'Gabriel', age: 'Adult' }),
      Cat.create({ name: 'Huggles', age: 'Adult' }),
      Cat.create({ name: 'Lovebug', age: 'Adult' }),
      Cat.create({ name: 'Midnight', age: 'Young' }),
      Cat.create({ name: 'Mishka', age: 'Adult' }),
      Cat.create({ name: 'Petunia', age: 'Adult' }),
      Cat.create({ name: 'Porkchop', age: 'Senior' }),
      Cat.create({ name: 'Spots', age: 'Senior' }),
      Cat.create({ name: 'Wayne', age: 'Kitten' }),
    ]);

    Bruce.relativeId = Wayne.id;
    Wayne.relativeId = Bruce.id;

    await Promise.all([Bruce.save(), Wayne.save()]);
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = { syncAndSeed, db };
