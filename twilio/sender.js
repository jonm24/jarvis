require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

function sendMessage(body) {
  client.messages
  .create({
     body: body,
     from: '+15046084910',
     to: '+12489244140'
   })
  .then(message => console.log(message.sid));
}

exports.sendMessage = sendMessage;