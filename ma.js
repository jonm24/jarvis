const utils = require('./utils');

// simple moving avg object (function-based data structure)
// interval = chart timeframe
// size = amount of periods
function sma(interval, size) {
  const closes = []; // array of closes; insertion sorted to be newest -> oldest 
  let avg = 0; // current moving average for given interval and size

  return {
    // initalize simple moving average 
    // fetch data, push closes to closes array
    init: async () => {
      const data = await utils.getData( 
        Math.round((Date.now() / 1000) - (interval * size)), // ((current time in unix) - (timeframe - amt of periods))
        String(interval)
      );
      data.pop() // pop most recent timestamp (hasnt closed yet)
      data.map(candle => closes.unshift(candle[4])) // push to closes
      avg = Number((closes.reduce((a, b) => a + b, 0) / size).toFixed(2)) // calculate average

      console.log(`\n${size} period ${interval / 60}m sma \ncurrent avg: ${avg}\narray size: ${closes.length}\navg: ${avg}`)
    },

    // remove oldest, add newest, recalculate average
    addClose: (close) => {
      closes.pop() // pop oldest close
      closes.unshift(close) // add newest close to front
      avg = Number((closes.reduce((a, b) => a + b, 0) / size).toFixed(2)) // recalculate average
      console.log(`\n${size} period ${interval / 60}m sma \ncurrent avg: ${avg}\narray size: ${closes.length}\navg: ${avg}\n`)
    },

    // helper functions
    checkLength: () => { // check that init size and length of arrays are the same
      return size === closes.length;
    },

    // getter functions
    getLengths: () => {
      return `init length: ${size}\narray length: ${closes.length}\n`;
    },
    getInterval: () => {
      return `${interval / 60}m\n`
    },
    getCloses: () => {
      return closes
    },
    getVal: () => {
      return avg;
    },
  }
}

exports.sma = sma;