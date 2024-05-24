const userModel = require("../models/user.model")

class UserController {
    constructor() { }
    async registerUser(obj) {
        try {
            const user = userModel(obj);
            const result = await user.save();
            return { ok: true, data: result };
        } catch (error) {
            return { ok: false, message: error.message };
        }
    }

    async getUser(id) {
        try {
            const user = await userModel.findById(id).populate(["chapter", "class"]).exec();
            if (!user) {
                return { ok: false, message: "User not found" };
            }
            return { ok: true, data: user };
        } catch (error) {
            return { ok: false, message: error.message };
        }
    }

    async getUsers() {
        try {
            const users = await userModel.find().populate(["chapter", "class"]).exec();

            return { ok: true, data: users };
        } catch (error) {
            return { ok: false, message: error.message };
        }
    }

    async updateUser(id, updateData) {
        try {
            const user = await userModel.findByIdAndUpdate(id, { $set: updateData }, { new: true });
            if (!user) {
                return { ok: false, message: "User not found" };
            }
            return { ok: true, data: user };
        } catch (error) {
            return { ok: false, message: error.message };
        }
    }

    async deleteUser(id) {
        try {
            const user = await userModel.findByIdAndDelete(id);

            return { ok: true, data: `${user.firstName} has been deleted` }
        }
        catch (error) {
            return { ok: false, message: error.message };
        }
    }

}
module.exports = new UserController();