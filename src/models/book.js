const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const bookSchema = new Schema({
    bookName: String,
    bookTime: Number,
    bookLink: String,
    authorID: String
});

module.exports = mongoose.model('Book', bookSchema, "books");
