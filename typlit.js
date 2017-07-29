var textForAll = "I met a traveller from an antique land,    Who said 'Two vast and trunkless legs of stone    Stand in the desert.... Near them, on the sand,    Half sunk a shattered visage lies, whose frown,    And wrinkled lip, and sneer of cold command,    Tell that its sculptor well those passions read    Which yet survive, stamped on these lifeless things,    The hand that mocked them, and the heart that fed;    And on the pedestal, these words appear:    My name is Ozymandias, King of Kings;    Look on my Works, ye Mighty, and despair!    Nothing beside remains. Round the decay    Of that colossal Wreck, boundless and bare    The lone and level sands stretch far away.'";
var textArray = textForAll.split("    ");
var lineOn = 0;
var letrOn = 0;
var wordsDone = 0;
var timeStart = new Date($.now());

function checkTyping(keypress) {
  linearray = processText(1);
  if (keypress == linearray[letrOn]) {
    letrOn += 1;
  };
  if (letrOn >= linearray.length) {
    letrOn = 0;
    lineOn += 1;
    wordsDone += 1;
    if (lineOn >= textArray.length) {
      lineOn = 0;
    };
  };
  if (linearray[letrOn] == " " && linearray[letrOn-1] != " " && letrOn != 0) {
    wordsDone += 1;
  };
  var timeon = new Date($.now());
  countWords(timeon);
  writeLines();
};

function countWords(timeon) {
  if (timeon == 0) {
    $("#wpmtext").html("WPM: Ready!");
  } else {
    timeintr = (timeon - timeStart)/1000;
    $("#wpmtext").html("WPM: "+Math.round(wordsDone/(timeintr/60)));
    //"<br/>"+wordsDone+" / "+timeintr
  };
};

function writeLines() {
  linearray = processText(0);

  var typedtext = "";
  var lefttext = "";
  for (var i = 0; i < letrOn; i++) {
    typedtext += linearray[i];
  };
  for (var i = letrOn+1; i < linearray.length; i++) {
    lefttext += linearray[i];
  };

  $("#headtext").html(typedtext);
  if (linearray[letrOn] == "&nbsp;") {
    $("#currtext").html("_");
  } else {
    $("#currtext").html(linearray[letrOn]);
  }
  $("#tailtext").html(lefttext);

  var nextlines = "";
  for (i = lineOn+1; i < textArray.length; i++) {
    nextlines += textArray[i] + "<br/>"
  };
  $("#nexttext").html(nextlines);
};

function processText(arg) {
  linearray = textArray[lineOn].split("");
  if (arg == 1) {
    return linearray;
  } else {
    for (i = 0; i < linearray.length; i++) {
      if (linearray[i] == " ") {
        linearray[i] = "&nbsp;";
      };
    };
    return linearray;
  };
};

$(document).on("keypress", function(event) {
  var keypress = String.fromCharCode(event.keyCode);
  checkTyping(keypress);
});

$(document).ready(function() {
  countWords(0);
  writeLines(textArray[lineOn].split(""))
});
