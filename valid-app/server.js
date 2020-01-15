const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(__dirname + '/dist/valid-app'));

app.get('*', function (req, res) {

  res.sendFile(path.join(__dirname+`/dist/valid-app/index.html`));

});
let port = process.env.PORT;
app.listen( port || 7080);

console.log(`The server is running on port: ${port}`);
