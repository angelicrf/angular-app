const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname + '/dist/valid-app')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/valid-app/index.html'));
});
const port  = process.env.PORT;
app.listen(port || 8080);
console.log(`The server is running on port: ${port}`);
