const db = require('../config/sql_connection');
const Users = require('../schemas/sql.users.schema');
const User_favorites = require('../schemas/sql.user_favorites.schema');

Users.hasMany(User_favorites, {foreignKey: 'user_id'});

const usersSeed = [
    {
        email: 'gralfonsotr@gmail.com'
    },
    {
        email: 'alexfmarquez@gmail.com'
    },
    {
        email: 'mariadiananaghiu09@gmail.com'
    }
]

const favsSeed = [
    {
        user_id: 1,
        movie_id: '597'
    },
    {
        user_id: 1,
        movie_id: '27205'
    },
    {
        user_id: 1,
        movie_id: '12599'
    },
    {
        user_id: 2,
        movie_id: '91314'
    },
    {
        user_id: 2,
        movie_id: '120'
    },
    {
        user_id: 2,
        movie_id: '1154598'
    },
    {
        user_id: 3,
        movie_id: '9479'
    },
    {
        user_id: 3,
        movie_id: '8392'
    },
    {
        user_id: 3,
        movie_id: '507089'
    },
]

const populateDb = async (schema, seed) => {
    await schema.bulkCreate(seed);
};

const populateUsers = async () => {
    await populateDb(Users, usersSeed);
    console.log('Table users populated');
    console.log('----------------------------------------------------------------');
};

const populateFavs = async () => {
    await populateDb(User_favorites, favsSeed);
    console.log('Table user_favorites populated');
    console.log('----------------------------------------------------------------');
};

populateUsers();
populateFavs();
