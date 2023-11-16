const Users = require('./sql.users.schema');
const User_favorites = require('./sql.user_favorites.schema');

Users.hasMany(User_favorites, {foreignKey: 'user_id'});
