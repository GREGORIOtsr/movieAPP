const { db } = require("../config/sql_connection");
const { DataTypes } = require("sequelize");

const User_favorites = db.define(
  "User_favorites",
  {
    user_id: {
      field: "user_id",
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    movie_id: {
      field: "movie_id",
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    db,
    modelName: "User_favorites",
    tableName: "user_favorites",
    timestamps: false
  }
);

User_favorites.sync();

module.exports = User_favorites;
