var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/coins');

var coinSchema = mongoose.Schema({
    name: String,
    price_usd: Number,
    date: Number
});

var Coin = mongoose.model('Coin', coinSchema);

var insertCoin = function(coin, coinname) {
  console.log('Attempting to insert coin: ', coinname);
  coin = JSON.parse(coin);
  var myCoin = new Coin({name: coinname, price_usd: coin[Object.keys(coin)[0]].USD, date: Date.now()});
  
  return Coin.find({name: coin.name})
    .then((coins) => {
      // if (coins.length === 0) {
      return myCoin.save();
      // } else {
      //   return Promise.resolve();
      // }
    });
}

var getCoins = function() {
  // return Coin.find()
  //   .then((coins) => {
  //     if (coins.length === 0) {
  //       return Promise.resolve();
  //     } else {
  //       return Promise.resolve(coins);
  //     }
  //   });

  return Coin.distinct('name')
    .then((coinNames) => {
      var coinPromises = [];

      coinNames.forEach((coinName)=>{
        coinPromises.push(
          Coin.find({name: coinName}).sort({date: -1}).limit(10)
        );
      });
      return Promise.all(coinPromises);
    });

}
/*

Coin.distinct()
  .then((coinNames) => {
    var coinPromises = [];

    coinNames.forEach((coinName)=>{
      coinPromises.push(
        Coin.find({name: coinName});
      );
    });
    return Promise.all(coinPromises);
  })


*/


module.exports.insertCoin = insertCoin;
module.exports.getCoins = getCoins;