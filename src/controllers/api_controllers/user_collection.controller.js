/**
 * @author Gregorio Tremont, Maria Diana Noaghiul, Alejandro Márquez 
 * @exports user_collection
 * @namespace CRUDuser_collection 
 */

const User = require("../../schemas/mongo.users.schema");
const Movie = require("../../schemas/mongo.movies.schema");


/**
 * Obtiene información sobre un usuario utilizando su correo electrónico.
 * @memberof CRUDuser_collection 
 * @method getUser
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud (request) Express que contiene el correo electrónico del usuario en el cuerpo (body).
 * @param {Object} res - Objeto de respuesta (response) Express.
 * @throws {Object} Si se produce un error, devuelve un objeto con un mensaje de error.
 * @returns {Promise<void>} No devuelve ningún valor directamente, pero responde con la información del usuario en formato JSON.
 */
const getUser = async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email}, '-_id -__v -password');
    if (!user) {
      res.status(400).send({message: `User with email: '${req.body.email}' could not be found.`})
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};


/**
 * Crea un nuevo usuario utilizando los datos proporcionados en el cuerpo de la solicitud.
 * @memberof CRUDuser_collection 
 * @method createUser
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud (request) Express que contiene los datos del nuevo usuario en el cuerpo (body).
 * @param {Object} res - Objeto de respuesta (response) Express.
 * @throws {Object} Si se produce un error, devuelve un objeto con un mensaje de error.
 * @returns {Promise<void>} No devuelve ningún valor directamente, pero responde con un mensaje indicando que el usuario fue creado con éxito.
 */
const createUser = async (req, res) => {
    try {
        const user = await new User(req.body).save();
        res.status(201).json({message: `User created.`, data: user});
    } catch (error) {
        res.status(400).json({message: `ERROR: ${error.stack}`});
    }
};


/**
 * Actualiza un usuario existente en la base de datos utilizando el correo electrónico proporcionado en el cuerpo de la solicitud y los nuevos datos en el cuerpo de la solicitud.
 * @memberof CRUDuser_collection 
 * @method updateUser
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud (request) Express que contiene el correo electrónico del usuario a actualizar y los nuevos datos en el cuerpo (body).
 * @param {Object} res - Objeto de respuesta (response) Express.
 * @throws {Object} Si se produce un error, devuelve un objeto con un mensaje de error.
 * @returns {Promise<void>} No devuelve ningún valor directamente, pero responde con un mensaje indicando que el usuario fue actualizado con éxito.
 */
const updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ email: req.body.email }, req.body, {new: true});
    if (!user) {
      res.status(400).send({message: `User with email: '${req.body.email}' could not be found.`})
    } else {
      res.status(200).json({ message: `User updated.`, data: user});
    }
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};


/**
 * Elimina un usuario de la base de datos utilizando el correo electrónico proporcionado en el cuerpo de la solicitud.
 * @memberof CRUDuser_collection 
 * @method deleteUser
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud (request) Express que contiene el correo electrónico del usuario a eliminar en el cuerpo (body).
 * @param {Object} res - Objeto de respuesta (response) Express.
 * @throws {Object} Si se produce un error, devuelve un objeto con un mensaje de error.
 * @returns {Promise<void>} No devuelve ningún valor directamente, pero responde con un código 204 (sin contenido) si el usuario se elimina con éxito, o un mensaje de error si el usuario no se encuentra o hay películas asociadas.
 */
const deleteUser = async (req, res) => {
  try {
    const email = { email: req.body.email };
    const user = await User.findOne(email);
    if (user.role === "Admin") {
      const user_id = user._id.toString();
      const movies = await Movie.find({ createdBy: user_id });
      if (movies.length !== 0) {
        res.status(409).json({
          message: `User could not been deleted because there are movies associated with the user.`,
        });
      } else {
        await User.deleteOne(email);
        res.status(200).json({ message: `User deleted.` });
      }
    } else {
      await User.deleteOne(email);
      res.status(200).json({ message: `User deleted.` });
    }
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const controllers = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};

module.exports = controllers;
