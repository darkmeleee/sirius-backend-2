const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const authorSchema = new Schema({
    authorName: String,
    authorPhotourl: String,
    authorBirthday: String,
    authorDeath: String,
    authorBooks: Number
});

module.exports = mongoose.model('Author', authorSchema, 'authors');