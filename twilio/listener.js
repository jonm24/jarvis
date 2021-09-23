const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/sms', (req, res) => {
  body = req.body.Body;
  const twiml = new MessagingResponse();

  if (body.includes("how")) {
    twiml.message('im doing well, thank you.'); 
  } else {
    twiml.message('hey this is jarvis');
  }

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});