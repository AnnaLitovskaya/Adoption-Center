const Sequelize = require('sequelize');
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/cat_shelter_db',
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
  sex: {
    type: DataTypes.ENUM,
    values: ['Male', 'Female'],
  },
  color: {
    type: DataTypes.ENUM,
    values: [
      'Tabby',
      'Tuxedo',
      'Calico',
      'Siamese',
      'Black',
      'Patched',
      'White',
    ],
  },
  hairLength: {
    type: DataTypes.ENUM,
    values: ['Long Hair', 'Short Hair'],
  },
});

const Family = db.define('family', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Family.hasMany(Cat);
Cat.belongsTo(Family);
Cat.belongsTo(Cat, { as: 'pair' });

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
      Piper,
      Katie,
      Amber,
      Princess,
    ] = await Promise.all([
      Cat.create({
        name: 'Abby',
        age: 'Kitten',
        sex: 'Female',
        color: 'White',
        hairLength: 'Short Hair',
      }),
      Cat.create({
        name: 'Bruce',
        age: 'Kitten',
        sex: 'Male',
        color: 'Patched',
        hairLength: 'Short Hair',
      }),
      Cat.create({
        name: 'Emily',
        age: 'Young',
        sex: 'Female',
        color: 'Tabby',
        hairLength: 'Long Hair',
      }),
      Cat.create({
        name: 'Gabriel',
        age: 'Adult',
        sex: 'Male',
        color: 'Tabby',
        hairLength: 'Long Hair',
      }),
      Cat.create({
        name: 'Huggles',
        age: 'Adult',
        sex: 'Male',
        color: 'Tabby',
        hairLength: 'Short Hair',
      }),
      Cat.create({
        name: 'Lovebug',
        age: 'Adult',
        sex: 'Male',
        color: 'Tabby',
        hairLength: 'Short Hair',
      }),
      Cat.create({
        name: 'Midnight',
        age: 'Young',
        sex: 'Male',
        color: 'Black',
        hairLength: 'Short Hair',
      }),
      Cat.create({
        name: 'Mishka',
        age: 'Adult',
        sex: 'Male',
        color: 'Tuxedo',
        hairLength: 'Long Hair',
      }),
      Cat.create({
        name: 'Petunia',
        age: 'Adult',
        sex: 'Female',
        color: 'Tabby',
        hairLength: 'Short Hair',
      }),
      Cat.create({
        name: 'Porkchop',
        age: 'Senior',
        sex: 'Male',
        color: 'Patched',
        hairLength: 'Short Hair',
      }),
      Cat.create({
        name: 'Spots',
        age: 'Senior',
        sex: 'Male',
        color: 'Patched',
        hairLength: 'Short Hair',
      }),
      Cat.create({
        name: 'Wayne',
        age: 'Kitten',
        sex: 'Male',
        color: 'Patched',
        hairLength: 'Short Hair',
      }),
      Cat.create({
        name: 'Piper',
        age: 'Senior',
        sex: 'Female',
        color: 'Tuxedo',
        hairLength: 'Short Hair',
      }),
      Cat.create({
        name: 'Katie',
        age: 'Young',
        sex: 'Female',
        color: 'Tabby',
        hairLength: 'Short Hair',
      }),
      Cat.create({
        name: 'Amber',
        age: 'Adult',
        sex: 'Female',
        color: 'Calico',
        hairLength: 'Short Hair',
      }),
      Cat.create({
        name: 'Princess',
        age: 'Adult',
        sex: 'Female',
        color: 'Siamese',
        hairLength: 'Short Hair',
      }),
    ]);

    const [fluffington, mcmeow, pawskiy] = await Promise.all([
      Family.create({ name: 'Fluffington' }),
      Family.create({ name: 'McMeow' }),
      Family.create({ name: 'Pawskiy' }),
    ]);

    Bruce.familyId = fluffington.id;
    Wayne.familyId = fluffington.id;
    Spots.familyId = fluffington.id;
    Bruce.pairId = Wayne.id;
    Wayne.pairId = Bruce.id;
    Katie.familyId = mcmeow.id;
    Emily.familyId = mcmeow.id;
    Gabriel.familyId = mcmeow.id;
    Amber.pairId = Princess.id;
    Princess.pairId = Amber.id;
    Mishka.familyId = pawskiy.id;
    Porkchop.familyId = pawskiy.id;
    Midnight.familyId = pawskiy.id;
    Piper.familyId = pawskiy.id;
    Huggles.pairId = Lovebug.id;
    Lovebug.pairId = Huggles.id;

    await Promise.all([
      Bruce.save(),
      Emily.save(),
      Gabriel.save(),
      Huggles.save(),
      Lovebug.save(),
      Midnight.save(),
      Mishka.save(),
      Porkchop.save(),
      Spots.save(),
      Wayne.save(),
      Piper.save(),
      Katie.save(),
      Amber.save(),
      Princess.save(),
    ]);
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = { syncAndSeed, db, model: { Cat, Family } };
