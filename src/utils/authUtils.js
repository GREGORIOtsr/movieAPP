const jwt = require("jsonwebtoken");
require('dotenv').config();

const isValidToken = (token) => {
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (error) {
    // error
    return false;
  }
};

const retrieveToken = (headers) => {
  if (headers && headers.authorization) {
    const tokens = headers.authorization.split(" ");
    if (tokens && tokens.length === 2) {
      return tokens[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

const getCurrentUser = (token) => {
  const user = jwt.decode(token, process.env.JWT_SECRET);
  return user;
};

const utils = {
    isValidToken,
    retrieveToken,
    getCurrentUser
};

module.exports = utils;
