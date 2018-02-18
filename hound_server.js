var express = require('express');
var fs = require('fs');
var https = require('https');
var path = require('path');
var bodyParser = require('body-parser');
var request = require('request');
var Houndify = require('houndify');


//parse arguments
var argv = require('minimist')(process.argv.slice(2));

//config file
var configFile = argv.config || 'config';
var config = require(path.join(__dirname, configFile));

//express app
var app = express();
var port = config.port || 8446;
var publicFolder = argv.public || 'public';
app.use(express.static(path.join(__dirname, publicFolder)));

//authenticates requests
app.get('/houndifyAuth', Houndify.HoundifyExpress.createAuthenticationHandler({ 
  clientId:  "ye7rYadOoK_HaLyF22Kn6w==", 
  clientKey: "-FFk1j5D3GQTJdNcaal_v_glnzF2iRLbGtzxc-JNEfTlxmIV0HvVnqz5ONZ8jmFKBuU3WnmDOl3ZkcUyQ-IxNg=="
}));

//sends the request to Houndify backend with authentication headers
app.post('/textSearchProxy', bodyParser.text({ limit: '15mb' }), Houndify.HoundifyExpress.createTextProxyHandler());



if (config.https) {

  //ssl credentials
  var privateKey = fs.readFileSync(config.sslKeyFile);
  var certificate = fs.readFileSync(config.sslCrtFile);
  var credentials = { key: privateKey, cert: certificate };

  //https server
  var httpsServer = https.createServer(credentials, app);
  httpsServer.listen(port, function() {
    console.log("HTTPS server running on port", port);
    console.log("Open https://localhost:" + port, "in the browser to view the Web SDK demo");
  });

} else {

  app.use(bodyParser.json());

  app.post('/responseGetter', function(req, res) {
    console.log(req.body);
    var og_quer = req.body.Disambiguation.ChoiceData[0].FixedTranscription;
    
    if(og_quer.search(/smash/gi) >= 0) {
            // Set the headers
      var headers = {
        'Content-Type':     'application/json'
      }

      // Configure the request
      var options = {
        url: 'http://ogabay.stdlib.com/smash-service@dev/',
        method: 'POST',
        headers: headers,
        qs: {
          "sender": "18189328759",
          "receiver": "13615023120",
          "message": og_quer,
          "createdDatetime": "2018-02-01"
        }
      }

      // Start the request
      request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            console.log(body)
        } else {
          console.log(response);
        }
      })
    }
    else {
      var patt = /(maiden\sname)|(first\spet)|(favorite\steacher)|(first\sschool)|(first\sjob)|(first\scar)|(favorite\sbook)|(favorite\sfood)|(\bcity\W+(?:\w+\W+)*?born\b)|(\bcity\W+(?:\w+\W+)*?birth\b)|(first\steacher)|(\bchildhood\W+(?:\w+\W+)*?friend\b)|(\bmeet\W+(?:\w+\W+)*?spouse\b)|(mascot)/gi;
      var res = patt.exec(og_quer);
      if(res == null) {
        // return false and empty string
      } else {
        // return true and the trigger word
      }
    }
    res.sendStatus(200);
  })

  app.listen(port, function() {
    console.log("HTTP server running on port", port);
    console.log("Open http://localhost:" + port, "in the browser to view the Web SDK demo");
  });

}

