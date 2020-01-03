const express = require('express');
const path = require('path');


const app = express();
let routing ='';
app.use(express.static(__dirname + `/dist/coffee-app`));

app.get('*', function (req, res) {
  routing = req.route;
  console.log("the route is" , routing);
  res.sendFile(path.join(__dirname+`/dist/coffee-app/index.html`));

});
const port = process.env.PORT;

app.listen(port);
console.log(`the Connectng is running on port ${port} and route is ${routing}`);
