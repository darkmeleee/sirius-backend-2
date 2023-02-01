/*
my code is my own property...
"there is no reason not to break my hands"
(c) Michael Korolev - 2022
*/


const { graphqlHTTP } = require('express-graphql');
const express = require("express");
const schema = require('./schema/schema');    
const mongoose  = require('mongoose');
const app = express();

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://mishakma:1488kek@cluster0.6z3kv.mongodb.net/mainbase2?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true}) // открыто специально
const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error ${err }`));
dbConnection.once('open', () => console.log(`Connected`));

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));




app.listen(PORT, () => {
    console.log(`${PORT} - running on`);
});
