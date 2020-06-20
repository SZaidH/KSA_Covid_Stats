//Importing modules
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const api_insert = require('./api_insert');
require('dotenv').config();

//Specifying the port number
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`---- Server listening at port ${PORT} ----`));
app.use(express.static('public'));

//MongoDB Info
const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const DB_NAME = process.env.DB_NAME;
const COLLECTION_NAME = process.env.COLLECTION_NAME;

//Serving static files
app.use(express.static("public"));

//Executing DB insertion at regular intervals
let timer = setTimeout(function executeFunc() {
  api_insert();
  timer = setTimeout(executeFunc, 86400000);
}, 86400000);

//GET response
app.get('/api', async (req, res) => {
  //Asynchronous function to fetch document from DB and sending it as a response
  async function findData() {
    try {
      await client.connect();
      console.log("Server: Connected to the Database!");
      const db = client.db(DB_NAME);
      const col = db.collection(COLLECTION_NAME);
      const stats_sort = { updated: -1 };
      const docs = await col.find().sort(stats_sort).limit(1).toArray();
      await res.json(docs);
      console.log(`Server: Document successfully sent!`);
    } catch (err) {
      res.end;
      console.log(err.stack);
    }
  }
  findData();
});


