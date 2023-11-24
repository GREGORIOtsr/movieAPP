const jwt = require("jsonwebtoken");
const User = require("../schemas/mongo.users.schema");
const sqlUser = require("../schemas/sql.users.schema");
const transporter = require('../config/nodemailer');
const bcrypt = require('bcrypt');
require("../config/google.config");
require("dotenv").config();

const signUpUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      await sqlUser.create({ email: req.body.email });
      await new User(req.body).save();
      res.status(201).redirect("/");
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
            if (user.role == 'Admin') {
              res
                .cookie("access-token", token, {
                  httpOnly: true,
                  sameSite: "strict"
                })
                .redirect("/dashboardAdmin");
            } else {
              res
                .cookie("access-token", token, {
                  httpOnly: true,
                  sameSite: "strict"
                })
                .redirect("/dashboard");
            }
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
      email: user.email,
      username: user.username,
      profile_pic: user.profile_pic,
      role: user.role,
      logged: user.logged,
    };
    const token = jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: 3600000,
    });
    res
      .cookie("access-token", token, {
        httpOnly: true,
        sameSite: "lax"
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
      res.clearCookie("access-token").redirect("/");
    });
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const recoverPassword = async (req, res) => {
  try {
      const recoverToken = jwt.sign({email: req.body.email}, process.env.JWT_SECRET, {expiresIn: '20m'});
      const url = `${process.env.DOMAIN_URL || 'http://localhost:3000'}/resetpassword/` + recoverToken;
      await transporter.sendMail({
          from: process.env.MAIL_USER,
          to: req.body.email,
          subject: 'MovieAPP - Recover Password',
          html: `<h3>Recover Password</h3>
              <a href = ${url}>Click to recover password</a>
              <p>Link will expire in 20 minutes!</p>`
      });
      res.status(200).json({
          message: 'A recovery email has been sent to your mail direction'
      })
  } catch (error) {
      console.log('Error:', error)
  }
};

const resetPassword = async (req, res) => {
  try {
      const recoverToken = req.params.token;
      const payload = jwt.verify(recoverToken, process.env.JWT_SECRET);
      console.log(payload);
      const password = req.body.password
      const hashPassword = await bcrypt.hash(password, 10);
      await User.findOneAndUpdate(
          {email: payload.email},
          {password: hashPassword}  
      );
      res.status(200).json({message: 'Password updated'});
  } catch (error) {
      console.log('Error:', error);
  }
};

const controllers = {
  signUpUser,
  loginUser,
  googleAuth,
  signOut,
  recoverPassword,
  resetPassword
};

module.exports = controllers;
