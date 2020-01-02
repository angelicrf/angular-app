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
const server_port = process.env.SERVER_PORT;
app.use('/', restApi);
app.listen(server_port);
console.log(`The server is running on port :${server_port}`);

