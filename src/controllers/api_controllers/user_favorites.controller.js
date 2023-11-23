const Users = require('../../schemas/sql.users.schema');
const User_favorites = require('../../schemas/sql.user_favorites.schema');

const jwt = require('jsonwebtoken');

const getUserEmailFromToken = (req) => {
    try {
      const authHeader = req.headers['authorization'];
      console.log(authHeader)
      const token = authHeader && authHeader.split(' ')[1];
      if (!token) {
        throw new Error('No token provided');
      }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded.email;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      throw error;
    }
  };


const getFavs = async (req, res) => {
    try {
        const user = await Users.findOne({ where: {email: req.body.email} })
        const movies = await User_favorites.findAll({ where: {user_id: user.id}});
        res.status(200).json(movies);
    } catch (error) {
        res.status(400).json({message: `ERROR: ${error.stack}`});
    }
};

const createFav = async (req, res) => {
    try {
        const user = await Users.findOne({ where: {email: req.body.email} })
        const newFav = await User_favorites.create({
            user_id: user.id,
            movie_id: req.body.movie_id
        });
        res.status(201).json(newFav);
    } catch (error) {
        res.status(400).json({message: `ERROR: ${error.stack}`});
        
    }
};



// const createFav = async (req, res) => {
//     try {
//       const email = getUserEmailFromToken(req);
//       if (!email) {
//         return res.status(401).json({ message: 'Token no válido o email no encontrado.' });
//       }
  
//       const user = await Users.findOne({ where: { email } });
//       if (!user) {
//         return res.status(404).json({ message: 'Usuario no encontrado.' });
//       }
  
//       const newFav = await User_favorites.create({
//         user_id: user.id,
//         movie_id: req.body.movie_id
//       });
  
//       res.status(201).json(newFav);
//     } catch (error) {
//       res.status(400).json({ message: `ERROR: ${error.message}` });
//     }
// };


const deleteFav = async (req, res) => {
    try {
        const user = await Users.findOne({ where: {email: req.body.email} })
        const movie = await User_favorites.destroy({ where: {
            user_id: user.id,
            movie_id: req.body.movie_id
        }});
        res.status(200).json(movie);
    } catch (error) {
        res.status(400).json({message: `ERROR: ${error.stack}`});
    }
};

const controllers = {
    getFavs,
    createFav,
    deleteFav
}

module.exports = controllers;



