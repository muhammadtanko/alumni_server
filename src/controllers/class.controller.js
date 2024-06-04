const classModel = require("../models/class.model")


class ClassController {
    constructor() { }

    async registerClass(obj) {
        try {
            const newClass = classModel(obj);
            const result = await newClass.save();
            return { ok: true, data: result }
        } catch (error) {
            return { ok: false, message: error.message };
        }
    }

    async getClasses() {
        try {
            const classes = await classModel.find();
            return { ok: true, data: classes }
        } catch (error) {
            return { ok: false, message: error.message };
        }

    }

    async getClass(id) {
        try {
            const singleClass = await classModel.findById(id);
            if (!singleClass) {
                return { ok: false, message: "Class not found" };
            }
            return { ok: true, data: singleClass }
        } catch (error) {
            return { ok: false, message: error.message };
        }

    }

    async getClassByRep(yearOfGraduation) {
        try {
            const singleClass = await classModel.findOne({ yearOfGraduation });
            return { ok: true, data: singleClass }
        } catch (error) {
            return { ok: false, message: error.message };
        }

    }

    async updateClass(id,updateData) {
        try {
            const updatedClass = await classModel.findByIdAndUpdate(id,{$set:updateData});
            if (!chapter) {
                return { ok: false, message: "Class not found" };
            }
            return { ok: true, data: updatedClass }
        } catch (error) {
            return { ok: false, message: error.message };
        }

    }

    async deleteClass(id) {
        try {
            const deletedClass = await classModel.findByIdAndDelete(id);
            return { ok: true, data: "deleted" }
        } catch (error) {
            return { ok: false, message: error.message };
        }

    }
    

}


module.exports = new ClassController();