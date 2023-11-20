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
        title: "Inception",
        poster: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
        date: "2010-07-15",
        genre: ["Action", "Science Fiction", ],
        runtime: 148,
        synopsis: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: 'inception', the implantation of another person's idea into a target's subconscious.",
        director: "Christopher Nolan",
        actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ken Watanabe"]
    },
    {
        title: "Titanic",
        poster: "/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
        date: "1997-11-18",
        genre: ["Drama", "Romance"],
        runtime: 194,
        synopsis: "101-year-old Rose DeWitt Bukater tells the story of her life aboard the Titanic, 84 years later. A young Rose boards the ship with her mother and fiancé. Meanwhile, Jack Dawson and Fabrizio De Rossi win third-class tickets aboard the ship. Rose tells the whole story from Titanic's departure through to its death—on its first and last voyage—on April 15, 1912.",
        director: "James Cameron",
        actors: ["Leonardo DiCaprio", "Kate Winslet"]
    },
    {
        title: "Avengers: Endgame",
        poster: "/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        date: "2019-04-24",
        genre: "Action",
        runtime: 149,
        synopsis: "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.",
        director: ["Anthony Russo", "Joe Russo"]
    }
];

const populateUser = async () => {
    await User.create(userSeed);
    console.log('User collection populated.');
};

const populateMovie = async () => {
    const admin = await User.findOne({email: 'admin@example.com'});
    let seed = movieSeed.map(obj => {
        obj.poster = 'https://www.themoviedb.org/t/p/original/' + obj.poster;
        obj.createdBy = admin._id.toString();
        return obj;
    })
    await Movie.create(seed);
    console.log('Movie collection populated.');
};

populateUser();
populateMovie();
