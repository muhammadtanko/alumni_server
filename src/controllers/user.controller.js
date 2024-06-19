const userModel = require("../models/user.model")
const classModel = require("../models/class.model")
const chapterModel = require("../models/chapter.model")

const jwt = require("jsonwebtoken");
const { webToken } = require("../config");


class UserController {
    constructor() { }
    async registerUser(obj) {
        try {
            const year = obj.graduationYear
            const chapter = obj.chapter;
            let selectedClass = await classModel.findOne({ yearOfGraduation: year });
            let selectedChapter = await chapterModel.findOne({ name: chapter });
            obj = obj.toJSON ? obj.toJSON() : obj;
            obj.class = selectedClass._id;
            obj.chapter = selectedChapter._id;
            const NewUser = userModel(obj);
            const user = await NewUser.save();
            user.password = "******"
            return { ok: true, payLoad: { user, message: "User Registered successfully" } };
        } catch (error) {
            return { ok: false, message: error.message };
        }
    }

    async onBoardUser(id, data) {
        try {
            const user = await userModel.updateOne({ "_id": id },
                {
                    $set: {
                        phoneNumber: data.phone,
                        stateOrCity: data.city,
                        photo: data.photo,
                        sports: data.sports,
                        socials: data.socialLinks,
                        countryOfResidence: data.country,
                        fieldOfStudy: data.fieldOfStudy,
                        profession: data.profession,
                        businessVentures: data.businessVentures,
                        registrationStatus:"registrationStatus"
                    }
                },
                { new: true });
            if (user) {
                return { ok: true, payLoad: user, message: "User onboarded successfully" };
            } else {
                return { ok: false, message: "User not found" };
            }
        } catch (error) {
            return { ok: false, message: error.message };
        }
    }

    async loginUser({ email, password }) {
        try {
            let user = await userModel.findOne({ email: email });
            if (user) {
                const isValid = await user.isValidPassword(password)
                if (isValid) {
                    const token = jwt.sign({
                        id: user._id,
                        email: user.email,
                        position: user.position,
                        userType: user.userType
                    }, webToken.secretKey, { expiresIn: webToken.expiresIn });
                    user = user.toJSON(user);
                    user.password = "******";
                    user.jwToken = token;
                    return { ok: true, payLoad: user, customMessage: "Logged in successfully" };
                } else {
                    return { ok: false, customMessage: "Password incorrect, Please try again" };
                }
            } else {
                return { ok: false, customMessage: "user not found" };
            }
        } catch (error) {
            return { ok: false, message: error.message };

        }
    }

    async approveUser(id) {
        try {
            const user = await userModel.findByIdAndUpdate(id, { status: "active" }, { new: true });
            return { ok: true, payLoad: user };
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
            return { ok: true, payLoad: user };
        } catch (error) {
            return { ok: false, message: error.message };
        }
    }

    async getUsers() {
        try {
            const users = await userModel.find().populate(["chapter", "class"]).exec();
            return { ok: true, payLoad: users };
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
            return { ok: true, payLoad: user };
        } catch (error) {
            return { ok: false, message: error.message };
        }
    }

    async deleteUser(id) {
        try {
            const user = await userModel.findByIdAndDelete(id);
            return { ok: true, payLoad: `${user.firstName} has been deleted` }
        }
        catch (error) {
            return { ok: false, message: error.message };
        }
    }

}
module.exports = new UserController();