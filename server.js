const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/dist/valid-app'));

const port  = process.env.PORT;
app.listen(port || 8080);
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/valid-app/'));
});
console.log(`The server is running on port: ${port}`);
