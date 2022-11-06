const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { getFiles, getFilesFromID, searchFor } = require('./driveFunctions');

const app = express();

app.use(morgan('combined'));
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    message: 'go to /getfiles to check'
  });
});

app.get('/getfiles', async (req, res) => {
  let files = await getFiles();
  res.json({
    files
  });
});

app.get('/getfilesfromid/:id', async (req, res) => {
  console.log(req.params.id);
  let files = await getFilesFromID(req.params.id);
  res.json({
    files
  });
});

app.post('/search', async (req, res) => {
  console.log(req.query.term);
  let { files } = await searchFor(req.query.term);
  res.json({
    files
  });
});

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}.`));

module.exports = app;
