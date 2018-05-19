const express = require('express');
const path = require('path')
const axios = require("axios");
const app = express();
const bodyParser = require('body-parser');

// dont know if I need json here
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('main'))

app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.post('/jobs', function(req, res) {
    const site = req.body.url;
    res.send(site);
});

app.listen(3000, function () {
  console.log('Dev app listening on port 3000!');
});
