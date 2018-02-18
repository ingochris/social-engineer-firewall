// var og_quer = req.body.Disambiguation.ChoiceData[0].FixedTranscription;
// var patt = /(maiden\sname)|(first\spet)|(favorite\steacher)|(first\sschool)|(first\sjob)|(first\scar)|(favorite\sbook)|(favorite\sfood)|(\bcity\W+(?:\w+\W+)*?born\b)|(\bcity\W+(?:\w+\W+)*?birth\b)|(first\steacher)|(\bchildhood\W+(?:\w+\W+)*?friend\b)|(\bmeet\W+(?:\w+\W+)*?spouse\b)|(mascot)/gi;
// var res = patt.exec(og_quer);
// 	if(res == null) {
//         	//loop listener
//       } else {
//         	alert('Warning! Possible Social Engineering Attack Detected!') // return true and the trigger word
//       }


//       //


function checkText() {
    var query = JSON.parse($("#responseJSON").val()).Disambiguation.ChoiceData[0].Transcription;
    var patt = /(maiden\sname)|(first\spet)|(favorite\steacher)|(first\sschool)|(first\sjob)|(first\scar)|(favorite\sbook)|(favorite\sfood)|(\bcity\W+(?:\w+\W+)*?born\b)|(\bcity\W+(?:\w+\W+)*?birth\b)|(first\steacher)|(\bchildhood\W+(?:\w+\W+)*?friend\b)|(\bmeet\W+(?:\w+\W+)*?spouse\b)|(mascot)/gi;
    var res = patt.exec(query);
    
    if(res == null) {
            //loop liste''ner
            console.log("cool");
      } else {
        	alert('Warning! Possible Social Engineering Attack Detected!') // return true and the trigger word
      }
}