// Package to fetch data from an external API (Source: https://github.com/NovelCOVID/API) and saving it to DB 
const fetch = require('node-fetch');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

//MongoDB URL
const MONGO_URL = process.env.MONGO_URL;

//API URL
const API_URL = process.env.API_URL;

//Check API
async function checkApi() {
  const response = await fetch(API_URL);
  const api_data = await response.json();

  //if the API call returns the desired values, execute insertData() 
  if (api_data.todayCases !== 0) {
    insertData();
  }
  else {
    console.log("Server: Desired API data not found. Will retry after 15 minutes");
    setTimeout(function () {
      checkApi();
    }, 900000);
  }
}

//Inserting API Data
async function insertData() {
  const response = await fetch(API_URL);
  const api_data = await response.json();

  //Assigning the API data to variables
  const cases = api_data.cases;
  const todayCases = api_data.todayCases;
  const deaths = api_data.deaths;
  const todayDeaths = api_data.todayDeaths;
  const recovered = api_data.recovered;
  const todayRecovered = api_data.todayRecovered;
  const active = api_data.active;
  const critical = api_data.critical;
  const tests = api_data.tests;
  const population = api_data.population;

  //Establishing MongoDB connection
  MongoClient.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    const DB_NAME = process.env.DB_NAME;
    const dbo = db.db(DB_NAME);
    //Stats Object
    let statsObj = {
      updated: new Date(),
      cases,
      todayCases,
      deaths,
      todayDeaths,
      recovered,
      todayRecovered,
      active,
      critical,
      tests,
      population
    };

    //Passing the Stats Object to the collection to be saved as a document
    const COLLECTION_NAME = process.env.COLLECTION_NAME;
    dbo.collection(COLLECTION_NAME).insertOne(statsObj, (err, res) => {
      if (err) throw err;
      console.log("DB: 1 document inserted");
      db.close();
    });
  });
};

//Exporting the modules
module.exports = {
  checkApi,
  insertData
};