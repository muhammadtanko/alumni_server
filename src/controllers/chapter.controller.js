const chapterModel = require("../models/chapter.model")

class ChapterController {
    constructor() { }
    async registerChapter(obj) {
        try {
            const chapter = chapterModel(obj);
            const result = await chapter.save();
            return { ok: true, data: result };
        } catch (error) {
            return { ok: false, message: error.message };
        }
    }

    async getChapter(id) {
        try {
            const chapter = await chapterModel.findById(id);
            if (!chapter) {
                return { ok: false, message: "Chapter not found" };
            }
            return { ok: true, data: chapter };
        } catch (error) {
            return { ok: false, message: error.message };
        }
    }

    async getChapters() {
        try {
            const chapters = await chapterModel.find();
            return { ok: true, data: chapters };
        } catch (error) {
            return { ok: false, message: error.message };
        }
    }

    async updateChapter(id, updateData) {
        try {
            const chapter = await chapterModel.findByIdAndUpdate(id, { $set: updateData }, { new: true });
            if (!chapter) {
                return { ok: false, message: "Chapter not found" };
            }
            return { ok: true, data: chapter };
        } catch (error) {
            return { ok: false, message: error.message };
        }
    }

    async deleteChapter(id) {
        try {
            const chapter = await chapterModel.findByIdAndDelete(id);
            if (!chapter) {
                return { ok: false, message: "Chapter not found" };
            }
            return { ok: true, data: `${chapter.name} has been deleted` }
        }
        catch (error) {
            return { ok: false, message: error.message };
        }
    }

}
module.exports = new ChapterController();