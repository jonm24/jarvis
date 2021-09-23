// intervals for cryptowatch api
const intervals = {
  "1m": 60,
  "3m": 180,
  "5m": 300,
  "15m": 900,
  "30m": 1800,
  "1h": 3600,
  "2h": 7200,
  "4h": 14400,
  "6h": 21600,
  "12h": 43200,
  "1d": 86400,
  "3d": 259200,
  "1w": 604800,
}
// minutes to milliseconds
function mins2ms(mins) {
  return mins * 60000
}
// get current time in unix
function getTimeString() {
  return String(Math.round(Date.now() / 1000))
}
// convert ohlc to candle object
function convertToCandle(data) {
  let candle = {}
  candle.close_timestamp = data[0]
  candle.close_time = new Date(data[0] * 1000).toLocaleString()
  candle.open = data[1]
  candle.high = data[2]
  candle.low = data[3]
  candle.close = data[4]
  candle.volumeBTC = data[5]
  candle.volumeUSD = data[6]
  return candle
}

// fetch binance bitcoin data from cryptowatch
// time = timestamp to fetch data after
// interval = chart timeframe
const axios = require('axios');
function getData (time, interval) {
  let path = `https://api.cryptowat.ch/markets/binance/btcusdt/ohlc?periods=${interval}&after=${time}`
  return axios.get(path)
    .then(res => res.data.result[interval])
    .catch (err => console.error(err))
}

exports.intervals = intervals;
exports.mins2ms = mins2ms;
exports.getTimeString = getTimeString;
exports.convertToCandle = convertToCandle;
exports.getData = getData;

