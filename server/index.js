const express = require('express');
const nedb = require('nedb');
const rest = require('express-nedb-rest');
const cors = require('cors');

const app = express();
const dataStore = new nedb({
                  filename: "mycoffeeapp.db",
                   autoload: true});

const restApi = rest();
restApi.addDatastore('coffees',dataStore);
app.use(cors());
app.use('/', restApi);
app.listen(process.env.PORT);


