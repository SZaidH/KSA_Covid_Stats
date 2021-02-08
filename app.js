//Importing modules
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const cron = require('node-cron');
const api_insert = require('./api_insert');
require('dotenv').config();

//Specifying the port number
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`---- Server listening at port ${PORT} ----`));
app.use(express.static('public'));

//MongoDB Info
const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const client2 = new MongoClient(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const DB_NAME = process.env.DB_NAME;
const COLLECTION_NAME = process.env.COLLECTION_NAME;

//Serving static files
app.use(express.static("public"));

// Scheduling a cron job for DB insertion
cron.schedule('10 16 * * *', () => {
  api_insert.checkApi();
  console.log('Server: Cron Job (API Check) executed!');
}, {
  timezone: "Asia/Riyadh"
});

//GET response - Send API Data
app.get('/api', async (req, res) => {
  //Asynchronous function to fetch document from DB and sending it as a response
  async function findData() {
    try {
      await client.connect();
      console.log("Server: Connected to the Database! (GET RESPONSE - findData)");
      const db = client.db(DB_NAME);
      const col = db.collection(COLLECTION_NAME);
      const stats_sort = { updated: -1 };
      const docs = await col.find().sort(stats_sort).limit(1).toArray();
      await res.json(docs);
      console.log(`Server: API Document successfully sent!`);
    } catch (err) {
      res.end;
      console.log(err.stack);
    }
  }
  findData();
});

//GET response - Send data for Chart.JS
app.get('/chart', async (req, res) => {
  //Asynchronous function to fetch document from DB and sending it as a response
  async function chartData() {
    try {
      await client2.connect();
      console.log("Server: Connected to the Database! (GET RESPONSE - chartData)");
      const db = client2.db(DB_NAME);
      const col = db.collection(COLLECTION_NAME);
      const docs = await col.find({}).project({ updated: 1, todayCases: 1, todayDeaths: 1, todayRecovered: 1 }).sort({ $natural: -1 }).limit(90).toArray();
      await res.json(docs);
      console.log(`Server: Chart Documents successfully sent!`);
    } catch (err) {
      res.end;
      console.log(err.stack);
    }
  }
  chartData();
});