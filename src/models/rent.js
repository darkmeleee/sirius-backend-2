const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const rentSchema = new Schema({
        bookID: String,
        readerID: String,
        rentDate: Number,
        rentPeriod: Number,
        penaltyAmount: Number,
});

module.exports = mongoose.model('Rent', rentSchema, 'rents');