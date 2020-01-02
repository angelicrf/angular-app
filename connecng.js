const express = require('express');
const path = require('path');


const app = express();

app.use(express.static(__dirname + `/dist/coffee-app`));

app.get('*', function (req, res) {

  res.sendFile(path.join(__dirname+`/dist/coffee-app/index.html`));

});
const port = process.env.PORT;

app.listen(port);
console.log(`the Connectng is running on port ${port}`);
