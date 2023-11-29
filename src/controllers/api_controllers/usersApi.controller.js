/**
 * @author Gregorio Tremont, Maria Diana Noaghiul, Alejandro Márquez
 * @exports usersApi
 * @namespace CRUDusersApi
 */

const express = require("express");
const User = require("../../models/users.model");


/**
 * Obtiene información sobre un usuario utilizando su ID.
 * @memberof CRUDusersApi 
 * @method getUser
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud (request) Express que contiene el ID del usuario en los parámetros (params).
 * @param {Object} res - Objeto de respuesta (response) Express.
 * @throws {Object} Si se produce un error, devuelve un objeto con un mensaje de error.
 * @returns {Promise<void>} No devuelve ningún valor directamente, pero responde con la información del usuario en formato JSON o un mensaje de error si el usuario no se encuentra.
 */
const getUser = async (req, res) => {
  try {
      const userId = req.params.userId; 
      const user = await User.getUser(userId); 
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


/**
 * Crea un nuevo usuario utilizando los datos proporcionados en el cuerpo de la solicitud y responde con el usuario creado.
 * @memberof CRUDusersApi 
 * @method postUser
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud (request) Express que contiene los datos del nuevo usuario en el cuerpo (body).
 * @param {Object} res - Objeto de respuesta (response) Express.
 * @throws {Object} Si se produce un error, devuelve un objeto con un mensaje de error.
 * @returns {Promise<void>} No devuelve ningún valor directamente, pero responde con el nuevo usuario en formato JSON o un mensaje de error si la creación del usuario falla.
 */
const postUser = async (req, res) => {
  try {
      const userData = req.body; 
      const user = await User.createUser(userData)
      res.status(201).json(user);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


/**
 * Actualiza un usuario existente en la base de datos utilizando su ID y los nuevos datos proporcionados en el cuerpo de la solicitud.
 * @memberof CRUDusersApi 
 * @method putUser
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud (request) Express que contiene el ID del usuario en los parámetros (params) y los nuevos datos en el cuerpo (body).
 * @param {Object} res - Objeto de respuesta (response) Express.
 * @throws {Object} Si se produce un error, devuelve un objeto con un mensaje de error.
 * @returns {Promise<void>} No devuelve ningún valor directamente, pero responde con el usuario actualizado en formato JSON o un mensaje de error si el usuario no se encuentra.
 */
const putUser = async (req, res) => {
  try {
      const userId = req.params.userId; 
      const updateData = req.body; 
      const user = await User.updateUser(userId, updateData)
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


/**
 * Elimina un usuario de la base de datos utilizando su ID.
 * @memberof CRUDusersApi 
 * @method removeUser
 * @async
 * @function
 * @param {Object} req - Objeto de solicitud (request) Express que contiene el ID del usuario en los parámetros (params).
 * @param {Object} res - Objeto de respuesta (response) Express.
 * @throws {Object} Si se produce un error, devuelve un objeto con un mensaje de error.
 * @returns {Promise<void>} No devuelve ningún valor directamente, pero responde con un código 200 (éxito) y un mensaje indicando que el usuario se eliminó con éxito, o un mensaje de error si el usuario no se encuentra.
 */
const removeUser = async (req, res) => {
  try {
      const userId = req.params.userId; 
      const user = await User.deleteUser(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User successfully deleted' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

module.exports = {getUser, postUser, putUser, removeUser};


