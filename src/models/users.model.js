const User = require('../schemas/mongo.users.schema');


const getUser = async (userId) => {
    try {
        if (userId) {
            const user = await User.findOne({ _id: userId });
            if (!user) {
                return await User.find();
            }
            return user;
        } else {
            return await User.find();
        }
    } catch (error) {
        throw error;
    }
};



const createUser = async (userData) => {
    try {
        const user = new User(userData);
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
}

const updateUser = async (userId, updateData) => {
    try {
        const movie = await User.findByIdAndUpdate(userId, updateData, { new: true });
        return movie;
    } catch (error) {
        throw error;
    }
}


const deleteUser = async (userId) => {
    try {
        const user = await User.findByIdAndDelete(userId);
        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = { getUser, createUser, updateUser, deleteUser };