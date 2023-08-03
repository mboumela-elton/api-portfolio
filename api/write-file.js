const fs = require('fs');
const express = require('express');

const app = express();

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/save-data', (req, res) => {
  const { name, email, message } = req.body;
  const data = { name, email, message };

  fs.readFile('./file/data.json', 'utf-8', (err, jsonString) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading file');
      return;
    }

    let dataArr = [];
    if (jsonString) {
      dataArr = JSON.parse(jsonString);
    }

    dataArr.push(data);

    fs.writeFile('./file/data.json', JSON.stringify(dataArr), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error writing file');
        return;
      }

      console.log('Data written successfully');
      res.send('Data written successfully');
    });
  });
});

app.get('/api/get-comment', (req, res) => {
  fs.readFile('./file/data.json', 'utf-8', (err, jsonString) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading file');
      return;
    }

    let dataArr = [];
    if (jsonString) {
      dataArr = JSON.parse(jsonString);
    }

    res.json(dataArr);
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});