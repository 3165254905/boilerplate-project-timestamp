// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  if (req.params.date == null) {
    res.json({
      unix: new Date().getTime(),
      utc: new Date().toUTCString()
    })
  } else if (req.params.date.includes("-")) {
    if (new Date(req.params.date).toUTCString() === "Invalid Date") {
      res.json({
        error: "Invalid Date"
      })
    } else {
      res.json({
        unix: new Date(req.params.date).getTime(),
        utc: new Date(req.params.date).toUTCString()
      })
    }
  } else {
    res.json({
      unix: req.params.date,
      utc: new Date(req.params.date * 1000).toUTCString(),
    })
  }
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
