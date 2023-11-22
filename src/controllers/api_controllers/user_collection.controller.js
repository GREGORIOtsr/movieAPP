const User = require("../../schemas/mongo.users.schema");
const Movie = require("../../schemas/mongo.movies.schema");

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }, "-_id -__v");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const createUser = async (req, res) => {
    try {
        await new User(req.body).save();
        res.status(201).json({message: `User created.`});
    } catch (error) {
        res.status(400).json({message: `ERROR: ${error.stack}`});
    }
};

const updateUser = async (req, res) => {
  try {
    await Provider.findOneAndUpdate({ email: req.body.email }, req.body, {
      new: true,
    });
    res.status(200).json({ message: `User updated.` });
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

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
