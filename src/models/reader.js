const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const readerSchema = new Schema({
    readerName: String,
    readerEmail: String,
    readerPenalty: Number
});

module.exports = mongoose.model('Reader', readerSchema, 'readers');