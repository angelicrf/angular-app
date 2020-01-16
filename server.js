const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/dist/devlogger'));

const port  = process.env.PORT;
app.listen(port || 8080);

if (process.env.NODE_ENV === "production") {
  app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname) + 'dist' , 'devlogger', 'index.html');
  });
}
console.log(`The server is running on port: ${port}`);
