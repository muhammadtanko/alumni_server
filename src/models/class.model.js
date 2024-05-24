const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClassSchema = new Schema({
    yearOfGraduation: { type: Date },
    classRep: { type: mongoose.Types.ObjectId, ref:"User"  },
},{
    timestamps:true
});

module.exports = mongoose.model('Class', ClassSchema);


const BookSchema = new mongoose.Schema({
    "name": {type: String, required: true},
    "author_name": {type: String, required: true},
    "published_date": {type: Date, required: false},
    "copies": [
        {
            "isbn_number": {type: String, required: true},
            "status": {type: String, required: true, default: "Available"},
            "due_back": {type: Date, required: false},
            "loaned_to": {type: mongoose.Schema.Types.ObjectId, required: false, ref: "User"}
        },
    ]
},{
    strictPopulate: false
} )