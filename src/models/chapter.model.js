const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChapterSchema = new Schema({
    name: { type: String },
    country: { type: String },
    city: { type: String },
    adress: { type: String },
    phoneNumber: { type: String },
    email: { type: String },
    excos: [{ position: { type: String, enum: ["President", "Vice President", "Sec. General", "Ass. Sec. General", "Financial Sec", "Tresurer", "Public Relation Officer", "Welfare Officer", "Provost", "Ex-Officio"] }, user: { type: mongoose.Types.ObjectId, ref: "User" } }]
}, {
    timestamps: true
});
// Pre-save hook to check for duplicate positions
ChapterSchema.pre('save', function (next) {
    const positions = new Set();
    for (const excos of this.excos) {
        if (positions.has(excos.position)) {
            const err = new Error('Each position can only be held by a single person.');
            return next(err);
        }
        positions.add(excos.position);
    }
    next();
});
module.exports = mongoose.model('Chapter', ChapterSchema);


