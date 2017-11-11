const request = require('request-promise');

const getCoinInfo = function(coinName) {
  console.log('GET COIN INFO ON COIN: ', coinName);
  return request(`https://api.coinmarketcap.com/v1/ticker/${coinName}/`)
    .then((results) => {
      console.log(results[0]);
      console.log('GONNA SEND A QUERY THAT IS: ', `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${JSON.parse(results)[0].symbol}&tsyms=USD`)
      return request(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${JSON.parse(results)[0].symbol}&tsyms=USD`);
    });
}

module.exports.getCoinInfo = getCoinInfo;