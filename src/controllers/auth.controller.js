const jwt = require("jsonwebtoken");
const User = require("../schemas/mongo.users.schema");
const sqlUser = require("../schemas/sql.users.schema");
require("../config/google.config");
require("dotenv").config();

const signUpUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      await sqlUser.create({ email: req.body.email });
      await new User(req.body).save();
      res.status(201).redirect("/login");
    } else {
      res
        .status(409)
        .send({ success: false, message: `Email already registered.` });
    }
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const loginUser = async (req, res) => {
  try {
    const email = req.body.email || "";
    const password = req.body.password || "";
    if (email && password) {
      let user = await User.findOne({ email: email });
      if (!user) {
        res
          .status(400)
          .json({ success: false, message: `User does not exist.` });
      } else {
        user.comparePassword(password, async (error, isMatch) => {
          if (isMatch && !error) {
            await User.updateOne({ email: user.email }, { logged: true });
            user = await User.findOne(
              { email: user.email },
              "-_id -__v -password"
            );
            const token = jwt.sign(user.toJSON(), `${process.env.JWT_SECRET}`, {
              expiresIn: 3600000,
            });
            const data = JSON.stringify(user, {httpOnly: true, sameSite: "strict", maxAge: 3600000});
            res.cookie('movieapp-user', data);
            res
              .cookie("access-token", token, {
                httpOnly: true,
                sameSite: "strict"
              })
              .redirect("/dashboard");
          } else {
            res
              .status(401)
              .json({ success: false, message: `Invalid password.` });
          }
        });
      }
    }
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const googleAuth = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.user.emails[0].value });
    if (!user) {
      const data = {
        email: req.user.emails[0].value,
        username: req.user.displayName,
        profile_pic: req.user.photos[0].value,
      };
      await sqlUser.create({ email: data.email });
      user = await new User(data).save();
    }
    user = await User.findOneAndUpdate(
      { email: user.email },
      { logged: true },
      { new: true }
    );
    const data = {
      emai: user.email,
      username: user.username,
      profile_pic: user.profile_pic,
      role: user.role,
      logged: user.logged,
    };
    const token = jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: 3600000,
    });
    res.cookie('movieapp-user', data, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 3600000
    });
    res
      .cookie("access-token", token, {
        httpOnly: true,
        sameSite: "strict",
      })
      .redirect("/dashboard");
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const signOut = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { email: req.cookies.email },
      { logged: false }
    );
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      req.session.destroy();
      res.clearCookie('movieapp-user');
      res.clearCookie("access-token").redirect("/login");
    });
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const controllers = {
  signUpUser,
  loginUser,
  googleAuth,
  signOut,
};

module.exports = controllers;
