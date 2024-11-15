const { Schema, default: mongoose } = require("mongoose");

const ChapterSchema = new Schema({
    title : {type: String, required: true, unique: true},
    numberoflessons: {type: Number, required: true},
    isactive: {type: Boolean, default: false},
    author: {type: String, required: true},
}, {
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret._id;
            delete ret.__v;
        }
    }
});

module.exports.Chapter = mongoose.model('chapter', ChapterSchema);