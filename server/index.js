var express = require('express');
var app = express();
app.use(express.static('./client/dist'));
const bodyparser = require('body-parser');// parses objects -> req.body
app.use(bodyparser.json());//invokes it for json
var port = 3000;
var models = require('../db/models.js');

app.get('/api/movies', (req, res) => {
  models.selectMovie()
    .then((data) => {
      res.send(data).status(200);
    })
    .catch((error) => {
      console.log(error);
      res.send(':(').status(404);
    });
});

app.post('/api/movies', (req, res) => {
  console.log('req.body', req.body)
  let {title} = req.body;
  console.log('title', title);
  models.insertMovie([title])
    .then((data) => {
      res.send(data).status(201);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.put('/', (req, res) => {
  res.send('Working');
});

app.delete('/', (req, res) => {
  res.send('Deleted');
});




app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

