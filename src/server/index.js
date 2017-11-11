const express = require('express');
const path = require('path');
const app = express();
const cryptoHelper = require('../api-helpers/cryptoHelper.js');
const db = require('../database/mongodbhelper.js');

app.use(express.static(__dirname + '/../client/public'));

// app.use('/static', express.static(path.join(__dirname, 'public')));


app.get('/query', (req, res) => {
  // console.log('Received a get request in server');
  db.getCoins().then((coins) => {
    res.send(coins);
  });
});

app.post('/query', (req, res) => {
  var body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  //NEED TO CHECK DATABASE BEFORE WE JUST SEND ANOTHER REQ
  req.on('end', () => {
    console.log('Received: ', body);

    
    cryptoHelper.getCoinInfo(body)
      .then((coinResults) => {
        console.log(coinResults, 'ARE THE RESULTS OF THE QUERY TO THE APIS');
        var coinPromise = db.insertCoin(coinResults, body);
        
        coinPromise.then(()=>{
    res.statusCode = 201;
    res.send('Successful Save');
        });
      });


  });
});

app.listen(3000, () => console.log('Listening on port 3000'));