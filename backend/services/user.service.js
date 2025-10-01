const UserModel = require("../models/user.model");

class UserService {
    async findUser(filter) {
        const user = await UserModel.findOne(filter);

        return user;
    }

    async createUser(payload) {
        const user = await UserModel.create(payload);

        return user;
    }
}

module.exports = new UserService();