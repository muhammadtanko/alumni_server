const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    status: {
        type: String,
       enum:["Pending","Active","Disabled"],default:"Pending"
    },
    chapter: { type: mongoose.Types.ObjectId, ref: "Chapter" },
    class: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
    dob: { type: Date },
    photo: { type: String },
    phoneNumber: { type: String },
    userType: { type: String, enum: ["Member", "Exco"], default: "Member" },
    position: { type: String, enum: ["None","President", "Vice President", "Sec. General", "Ass. Sec. General", "Financial Sec", "Tresurer","Public relation officer", "Welfare officer", "Provost", "Ex-officio"], default: "None" },
    countryOfResidence: { type: String },
    stateOrCity: { type: String },
    fieldOfStudy: { type: String },
    profession: { type: String },
    businessVentures: { type: [String], default: [] },
    sports: { type: [String], default: [] },
    socials: { type: [String], default: [] },
}, {
    timestamps: true,
    strictPopulate: false
});


userSchema.pre('save', function(next) {
    if (this.userType === 'Member' && this.position !== 'None') {
        return next(new Error('Members can only have "None" as their position'));
    }
    if (this.userType === 'Exco' && this.position === 'None') {
        return next(new Error('Excos cannot have "None" as their position'));
    }
    next();
});

module.exports = mongoose.model('User', userSchema);


