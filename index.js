// const sender = require('./twilio/sender');
const utils = require('./utils');
const ma = require('./ma');

async function btcBot (interval) {
  console.log("starting at: ", new Date().toLocaleString());

  // fetch data from cryptowatch for sychronization
  const data = await utils.getData(utils.getTimeString(), String(interval));

  // calculate time between now and next closing time
  let time_till_next_close = new Date(data[0][0] * 1000) - Date.now();
  console.log(`waiting ${Math.round(time_till_next_close / 1000)} secs...\n`);

  // wait until 1 ms before next close
  await new Promise(r => setTimeout(r, time_till_next_close - 1));

  // fetch candle at every interval
  while(true) {
    const data = await utils.getData(utils.getTimeString(), String(interval));
    console.log(new Date().toLocaleString())
    console.log(utils.convertToCandle(data));
    console.log(`waiting ${interval} secs...\n`)
    await new Promise(r => setTimeout(r, interval * 1000));
    // sender.sendMessage("you should buy");
  }
}

// run bot
// btcBot(utils.intervals["1m"])

async function maINIT() {
  ssma = ma.sma(utils.intervals["5m"], 3)
  await ssma.init()
  ssma.addClose(48000.00)
  console.log(ssma.getCloses())
  // sma.init(data);
}

maINIT()

