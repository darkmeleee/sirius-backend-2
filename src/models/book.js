const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    bookName: String,
    bookTime: Number,
    bookLink: String,
    authorID: String
});

module.exports = mongoose.model('Book', bookSchema, "books");
