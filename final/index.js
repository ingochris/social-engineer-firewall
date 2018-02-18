function checkText() {
      //var query = JSON.parse($("#responseJSON").val()).Disambiguation.ChoiceData[0].Transcription;
      //var query = JSON.parse($("#query").val()).Disambiguation.ChoiceData["0"].FixedTranscription;
      var query = $("#query").val();
      console.log(query);
      if (query != "") {
            if (query.search(/smash/gi) >= 0) {
                  // Set the headers
                  var headers = {
                        'Content-Type': 'application/json'
                  }

                  // Configure the request
                  var options = {
                        url: 'http://ogabay.stdlib.com/smash-service@dev/',
                        method: 'POST',
                        headers: headers,
                        qs: {
                              "sender": "18189328759",
                              "receiver": "13615023120",
                              "message": query,
                              "createdDatetime": "2018-02-01"
                        }
                  }

                  var url = "http://ogabay.stdlib.com/smash-service@dev/";
                  var params = {
                        "sender": "18189328759",
                        "receiver": "13615023120",
                        "message": query,
                        "createdDatetime": "2018-02-01"
                  };
                  var xhr = new XMLHttpRequest();
                  xhr.open("POST", url, true);

                  //Send the proper header information along with the request
                  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                  console.log(params);
                  xhr.send(JSON.stringify(params));

            } else {
                  var pattern = /(maiden\sname)|(first\spet)|(favorite\steacher)|(first\sschool)|(first\sjob)|(first\scar)|(favorite\sbook)|(favorite\sfood)|(\bcity\W+(?:\w+\W+)*?born\b)|(\bcity\W+(?:\w+\W+)*?birth\b)|(first\steacher)|(\bchildhood\W+(?:\w+\W+)*?friend\b)|(\bmeet\W+(?:\w+\W+)*?spouse\b)|(mascot)/gi;
                  var result = pattern.exec(query);

                  if (!result) {
                        console.log("No attacks detected");
                  } else {
                        alert('Warning! Possible Social Engineering Attack Detected!') // return true and the trigger word
                  }
            }
      }
}