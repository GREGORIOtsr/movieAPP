const User = require('../schemas/mongo.users.schema');
const Movie = require('../schemas/mongo.movies.schema');

const userSeed = [
    {
        email: 'member@example.com',
        username: 'Member',
        password: 'member1234',
        profile_pic: 'https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'
    },
    {
        email: 'admin@example.com',
        username: 'Admin',
        password: 'admin1234',
        profile_pic: 'https://cdn.discordapp.com/attachments/480749096093876239/1165967153988644887/BE60479B-4B15-4827-A606-3B6E87161B92.jpg',
        role: 'Admin'
    }
];

const movieSeed = [
    {

    }
];

const populateUser = async () => {
    await User.create(userSeed);
    console.log('User collection populated.');
};

const populateMovie = async () => {
    await Movie.create(movieSeed);
    console.log('Movie collection populated.');
}

populateUser();

