function checkText() {
    var query = JSON.parse($("#responseJSON").val()).Disambiguation.ChoiceData[0].Transcription;

    if (query != "") {
        var pattern = /(maiden\sname)|(first\spet)|(favorite\steacher)|(first\sschool)|(first\sjob)|(first\scar)|(favorite\sbook)|(favorite\sfood)|(\bcity\W+(?:\w+\W+)*?born\b)|(\bcity\W+(?:\w+\W+)*?birth\b)|(first\steacher)|(\bchildhood\W+(?:\w+\W+)*?friend\b)|(\bmeet\W+(?:\w+\W+)*?spouse\b)|(mascot)/gi;
        var result = pattern.exec(query);
        
        if (!result) {
                console.log("No attacks detected");
          } else {
                alert('Warning! Possible Social Engineering Attack Detected!') // return true and the trigger word
          }
    }
   
}