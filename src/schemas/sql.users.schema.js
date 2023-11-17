const { db } = require("../config/sql_connection");
const { DataTypes } = require("sequelize");
const regex = require("../utils/regex");

const Users = db.define(
  "Users",
  {
    user_id: {
      field: "id",
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    email: {
      field: "email",
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
      validate: {
        isEmail(value) {
          if (!regex.email.test(value)) {
            throw new Error("Invalid Email format!");
          }
        },
      }
    },
  },
  {
    db,
    modelName: "Users",
    tableName: "users",
    timestamps: false
  }
);

Users.sync();

module.exports = Users;
