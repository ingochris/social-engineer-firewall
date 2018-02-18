# Houndify JavaScript SDK

The Houndify JavaScript SDK allows you to make voice and text queries to the Houndify API from web browser or Node.js scripts. It comes in two forms: the in-browser javascript library [**houndify.js**](https://www.houndify.com/sdks#web) and the server-side Node.js module [**houndify**](https://www.npmjs.com/package/houndify). Both parts contain functions for sending text and voice requests to the Houndify API. Additionally the in-browser library has `AudioRecorder` for capturing audio from microphone, and Node.js module has authentication and proxy middleware creators for Express servers.


## Set up

### Client Side

Client side of the JavaScript SDK doesn't have any dependencies and consists of a single JS file. You can include it via script tag and work with global `Houndify` object.

```html
<script src="/path/to/houndify.js"></script>
<script>
var voiceRequest = new Houndify.VoiceRequest({ /* options */ });
</script>
```

Or you can *require* `Houndify` as a CommonJS module.

```javascript
// From houndify.js
var Houndify = require('path/to/houndify'); 
// From installed Node.js module
var Houndify = require('houndify');
```


### Server Side

Server side of SDK is a `HoundifyExpress` object in the a [**houndify**](https://www.npmjs.com/package/houndify) module. Run `npm install houndify --save` to install it.

`HoundifyExpress` object in the module has three methods used for authenticating and proxying voice and text search requests.

```javascript
var houndifyExpress = require('houndify').HoundifyExpress;

app.get('/textSearchProxy', houndifyExpress.createTextProxyHandler());
```


### Example Project

*example* folder contains a project that shows a working setup of SDK. It contains a node *server.js* and *public* folder with frontend. 

`npm install` should install both [**express**](https://www.npmjs.com/package/express) and [**houndify**](https://www.npmjs.com/package/houndify).

You'll need to fill in your Houndify Client information in *config.json*. Make sure you also change "YOUR_CLIENT_ID" to your actual Houndify Client Id in *example/public/index.html* file.

**The latest versions of web browsers require secure connection for giving access to microphone.** While you can test JavaScript SDK on *localhost* with HTTP server, you'll need to set up a HTTPS server for a different host. Set "https" flag in config file to **true**, and point "sslCrtFile" to ssl certificate and "sslKeyFile" to ssl key file.

Run `node server.js` in the project folder and go to the url from the process output.

*example* folder also contains *node-client-text.js* and *node-client-voice.js* Node.js scripts that show how to send text requests and stream audio from a file on a server side. You can find test audio files in *test_audio* folder.

```bash
node node-client-text.js --query "what is weather like in New York?"
node node-client-voice.js --audio ./path/to/audio.wav
```


## Using SDK

`Houndify` contains following constructors and utility methods:

* VoiceRequest - constructor for initializing voice requests;

* TextRequest - constructor for initializing text requests;

* AudioRecorder - constructor for initializing audio recorder for browsers (Chrome, Firefox);

* decodeAudioData - utility for decoding audio data uploaded with `FileReader`;

* HoundifyExpress.createAuthenticationHandler - utility for creating middleware for authenticating all Houndify requests through Express server;

* HoundifyExpress.createTextProxyHandler - utility for creating middleware for proxying text requests through Express server;


### VoiceRequest

Pass Client Id, authentication endpoint/Client Key, request info, conversation state object, sample rate, VAD preference, and event handlers (partial transcripts, final response, error) to `VoiceRequest` constructor to start the query.

```javascript
var voiceRequest = new Houndify.VoiceRequest({
  // Your Houndify Client ID
  clientId: "YOUR_CLIENT_ID",

  // For testing environment you might want to authenticate on frontend without Node.js server. 
  // In that case you may pass in your Houndify Client Key instead of "authURL".
  // clientKey: "YOUR_CLIENT_KEY",

  // Otherwise you need to create an endpoint on your server
  // for handling the authentication.
  // See SDK's server-side method HoundifyExpress.createAuthenticationHandler().
  authURL: "/houndifyAuth",

  // Request Info JSON
  // See https://houndify.com/reference/RequestInfo
  requestInfo: {
    UserID: "test_user",
    Latitude: 37.388309, 
    Longitude: -121.973968
  },

  // Pass the current ConversationState stored from previous queries
  // See https://www.houndify.com/docs#conversation-state
  conversationState: conversationState,

  // Sample rate of input audio
  sampleRate: 16000,

  // Enable Voice Activity Detection, default: true
  enableVAD: true,
  
  // Partial transcript, response and error handlers
  onTranscriptionUpdate: function(transcipt) {
    console.log("Partial Transcript:", transcipt.PartialTranscript);
  },

  onResponse: function(response, info) {
    console.log(response);
    if (response.AllResults && response.AllResults.length) {
      // Pick and store appropriate ConversationState from the results. 
      // This example takes the default one from the first result.
      conversationState = response.AllResults[0].ConversationState;
    }
  },

  onError: function(err, info) {
    console.log(err);
  }
});
```

`VoiceRequest` object has *write()*, *end()* and *abort()* methods for streaming the audio and ending the request.

```javascript
// Streams 8/16 kHz mono 16-bit little-endian PCM samples 
// in Int16Array chunks to backend
voiceRequest.write(audioChunk);

/* ... */

// Ends streaming voice search requests, expects the final response from backend
voiceRequest.end();

/* ... */

// Aborts voice search request, does not expect final response from backend
voiceRequest.abort();
```

**Note!** For voice search to work in production the frontend should be served through secure connection. See example project for HTTPS Express server setup. You do not need HTTPS for *localhost*.

You can use Voice Search in the browser without setting up Node.js server. You can pass in the authentication information (Houndify Client Key) directly to `HoundifyClient` object and use server of your choice without server-side **houndify** module. **Important!** Your Client Key is private and should not be exposed in the browser in production. Use `VoiceRequest` without server-side authentication only for testing, internal applications or Node.js scripts.


### TextRequest

`TextRequest` expects query string, Client Id, authentication endpoint/Client Key, request info, conversation state, proxy details and handlers.

```javascript
var textRequest = new Houndify.TextRequest({
  // Text query
  query: "What is the weather like?",

  // Your Houndify Client ID
  clientId: "YOUR_CLIENT_ID",

  // For testing environment you might want to authenticate on frontend without Node.js server. 
  // In that case you may pass in your Houndify Client Key instead of "authURL".
  // clientKey: "YOUR_CLIENT_KEY",

  // Otherwise you need to create an endpoint on your server
  // for handling the authentication.
  // See SDK's server-side method HoundifyExpress.createAuthenticationHandler().
  authURL: "/houndifyAuth",

  // Request Info JSON
  // See https://houndify.com/reference/RequestInfo
  requestInfo: { 
    UserID: "test_user",
    Latitude: 37.388309, 
    Longitude: -121.973968
  },

  // Pass the current ConversationState stored from previous queries
  // See https://www.houndify.com/docs#conversation-state
  conversationState: conversationState,

  // You need to create an endpoint on your server
  // for handling the authentication and proxying 
  // text search http requests to Houndify backend
  // See SDK's server-side method HoundifyExpress.createTextProxyHandler().
  proxy: {
    method: 'POST',
    url: "/textSearchProxy",
    // headers: {}
    // ... More proxy options will be added as needed
  },
  
  // Response and error handlers
  onResponse: function(response, info) {
    console.log(response);
    if (response.AllResults && response.AllResults.length) {
      // Pick and store appropriate ConversationState from the results. 
      // This example takes the default one from the first result.
      conversationState = response.AllResults[0].ConversationState;
    }
  },

  onError: function(err, info) {
    console.log(err);
  }
});
```

**Note!** In order to use Text Search you'll need a proxy endpoint on your server. `HoundifyExpress` object contains *createTextProxyHandler()* method for setting that up.


### AudioRecorder

You can use `AudioRecorder` to record audio in Chrome and Firefox and feed it into `VoiceRequest` object. It has *start()*, *stop()*, *isRecording()* methods and accepts handlers for "start", "data", "end" and "error" events.

```javascript
var recorder = new Houndify.AudioRecorder();

recorder.on('start', function() { /* recording started */ });
recorder.on('data', function(data) { /* data chunk captured */ });
recorder.on('end', function() { /* recording stopped */ });
recorder.on('error', function(err) { /* recorder error */ });

// Start capturing the audio
recorder.start();

// Stop capturing the audio
recorder.stop();

// Check if recorder is currently capturing the audio
recorder.isRecording();
```

## Reimplementing HoundifyExpress for other servers

Node.js module **houndify** contains server-side `HoundifyExpress` object with two methods. Below are these methods annotated to help reimplementing the server-side logic if you're not using Express server.

**createAuthenticationHandler({ clientId, clientKey })** accepts an object with Houndify Client Id and secret Houndify Client Key and returns an Express handler for authentication requests from client-side `HoundifyClient`. These requests will send a token as a query parameter and expect the signature back as a plain text.

```javascript
var crypto = require('crypto');

/**
 * Given Houndify Client Id and Client Key in options objects
 * returns an Express request handler for authenticating Voice Requests.
 * Signs a token/message with Houndify Client Key using the HMAC scheme.
 * The request for authentications will contain "token" query parameter
 * that needs to be signed with secret Client Key.
 *
 * @param {Object} opts - Options
 * @return {Function} An Express request handler
 */
function createAuthenticationHandler(opts) { 
    return function (req, res) {
        var clientKey = opts.clientKey.replace(/-/g, "+").replace(/_/g, "/");
        var clientKeyBin = new Buffer(clientKey, "base64");
        var hash = crypto.createHmac("sha256", clientKeyBin).update(req.query.token).digest("base64");
        var signature = hash.replace(/\+/g, "-").replace(/\//g, "_");
        res.send(signature);
    }
}
```

**createTextProxyHandler()** returns a simple Express handler for proxying Text Requests from client-side `HoundifyClient` to Houndify backend. Query parameters of the incoming request should be reused for the request to backend (GET https://api.houndify.com/v1/text). Pick all "hound-*" headers from the incoming request, and send them to the backend with the same names.

```javascript
var request = require('request');

/**
 * Returns a simple Express handler for proxying Text Requests.
 * The handler takes query parameters and houndify headers, 
 * and sends them in the request to backend (GET https://api.houndify.com/v1/text). 
 *
 * @return {Function} An Express request handler
 */
function createTextProxyHandler() {
    return function (req, res) {
        var houndifyHeaders = {};
        for (var key in req.headers) {
            var splitKey = key.toLowerCase().split("-");
            if (splitKey[0] == "hound") {
                var houndHeader = splitKey.map(function(pt) {
                    return pt.charAt(0).toUpperCase() + pt.slice(1);
                }).join("-");
                houndifyHeaders[houndHeader] = req.headers[key];
            }
        }
 
        //GET requests contain Request Info JSON in header.
        //POST requests contain Request Info JSON in body. 
        //Use POST proxy if Request Info JSON is expected to be bigger than header size limit of server
        houndifyHeaders['Hound-Request-Info'] = houndifyHeaders['Hound-Request-Info'] || req.body;

        request({
            url: "https://api.houndify.com/v1/text",
            qs: req.query,
            headers: houndifyHeaders
        }, function (err, resp, body) {
            //if there's an request error respond with 500 and err object
            if (err) return res.status(500).send(err.toString());
            
            //else send the response body from backend as it is
            res.status(resp.statusCode).send(body);
        });  
    }
}
```
