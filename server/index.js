const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));

app.get('/joey', function (req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, "/../joey/dist")});
});

app.get('/joey/:assetName', function(req, res) {
  res.sendFile(req.params.assetName, {root: path.join(__dirname, "/../joey/dist")});
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});