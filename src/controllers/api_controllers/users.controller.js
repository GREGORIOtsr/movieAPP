const Users = require('../schemas/sql.users.schema');
const User_favorites = require('../schemas/sql.user_favorites.schema');

const getUser = async (req, res) => {
    try {
        const user = await Users.findOne({ where: {email: req.body.email} });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({message: `ERROR: ${error.stack}`});
    }
};

const createUser = async (req, res) => {
    try {
        const user = await Users.create({email: req.body.email});
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({message: `ERROR: ${error.stack}`});
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await Users.update({email: req.body.newEmail}, {
            where: {
                email: req.body.email
            }
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({message: `ERROR: ${error.stack}`});
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await Users.findOne({ where: {email: req.body.email} });
        await User_favorites.destroy({ where: {user_id: user.id} });
        await user.destroy();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({message: `ERROR: ${error.stack}`});
    }
};

const controllers = {
    getUser,
    createUser,
    updateUser,
    deleteUser
};

module.exports = controllers;
