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
/*let data= "somerandom string";
fetch('http://localhost:30026/coffees', {
  method: 'post',
  body: JSON.stringify({
    name: data,// this is posted on another server
  })
}).then(function (res) {
  return res.text();
}).then((body)=> {
  console.log(body)// body can be used to get data from another server
});*/
app.listen(host,server_port);
console.log(`The server is running on port :${server_port}`);

