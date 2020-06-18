//Importing packages
const express = require('express');
const app = express();
const api_insert = require('./api_insert');
require('dotenv').config();

//Specifying the port number
const PORT = process.env.PORT;

//Starting the server
app.listen(PORT, () => console.log(`Server listening at port ${PORT}!`));
console.log(api_insert());

app.use(express.static('public'));