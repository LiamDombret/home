$(document).ready(function(){

  $('#searchbar').val("");
  setCaret();

  function getQuote() {
    var random;
    var quote = ["No tree, it is said, can grow to heaven unless its roots reach down to hell.", "You're gonna carry that weight.", "Without vices we are robots.", "Colombialism!", "Tower bridge, classic!", "The way is lit. The path is clear. We require only the strength to follow it.", "A pump is like riding 2 jetskis, except 1 is a rhino farting lightning and the other is 2 jetskis.", "ya mother gimme top", "There is no Dark Side of the Moon, really. As a matter of fact, it's all dark. The only thing that makes it look light is the sun.", "so first i get a quote from kanye west and then i get one from carl jung? thats pretty funny",  "The risk I took was calculated, but man, am I bad at math."];
    var author = ["Carl Jung", "Shinichirou Watanabe", "David", "Janoy Cresva", "Ren&eacute;", "The Ancestor", "Dom Mazzetti", "Boobie Lootaveli", "Gerry O'Driscoll", "Ian", "Mockingbird"];
    random = Math.floor(Math.random() * quote.length);
    document.getElementById("quote").innerHTML = "&quot;" + quote[random] + "&quot;";
    document.getElementById("author").innerHTML = " - " + author[random];
  }

  setTimeout(function() {
    if(($("#quote").text().length + $("#author").text().length) < 78) {
      $("#terminal").css('animation', 'drawConsole 1s ease forwards');
    } else if(($("#quote").text().length + $("#author").text().length) < 156) {
      $("#terminal").css('animation', 'drawConsole2 1s ease forwards');
    } else {
      $("#terminal").css('animation', 'drawConsole3 1s ease forwards');
    }
  }, 1);

  setTimeout(function() {
    $("#terminalcontent").css('display', 'block');
    $("#terminalcontent").css('animation', 'searchPopup 1.5s ease forwards');
  }, 1000);

  function getDateTime() {
    var monthNames = ["January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"];
    var today = new Date();
    $("#time").html("The current time is "+addZeroes(today.getHours()) +":"+addZeroes(today.getMinutes())+":"+addZeroes(today.getSeconds()));
    setInterval(function() {
      var today = new Date();
      $("#time").html("The current time is "+addZeroes(today.getHours()) +":"+addZeroes(today.getMinutes())+":"+addZeroes(today.getSeconds()));
    }, 1000);
    var date = today.getDate();
    $("#date").html(" on "+date+" "+monthNames[today.getMonth()]+" "+today.getFullYear()+".");
  }

  function addZeroes(time) {
    return (time >= 0 && time < 10) ? "0" + time : time + "";
  }

  getDateTime();

  window.onload = getQuote();
  $('#searchform').submit(function(e) {
    var query = $('#searchbar').val();
    var queryPreface = query.substring(0, $('#searchbar').val().indexOf(' '));
    var queryFixed;

    switch(queryPreface) {
      case "ddg":
      $('#searchform').attr('action', 'http://duckduckgo.com/');
      break;
      case "yt":
      $('#searchform').attr('action', 'https://youtube.com/results');
      break;
      case "eco":
      $('#searchform').attr('action', 'https://www.ecosia.org/search');
      break;
      case "fb":
      $('#searchform').attr('action', 'https://www.facebook.com/search/top/');
      break;
      case "opgg":
      event.preventDefault();
      queryFixed = query.replace(query.substring(0, queryPreface.length + 1), "");
      window.location.href = "https://www.op.gg/champion/"+queryFixed;
      break;
      case "wg":
      event.preventDefault();
      window.location.href = "https://boards.4chan.org/wg/";
      break;
      case "gd":
      event.preventDefault();
      window.location.href = "https://boards.4chan.org/gd/";
      break;
      default:
      $('#searchform').attr('action', 'https://google.com/search');
    }
    if ($('#searchform').attr('action') != 'https://google.com/search') {
      queryFixed = query.replace(query.substring(0, queryPreface.length + 1), "");
      $('#searchbar').val(queryFixed);
    }
    setTimeout(function(){
      $('#searchform')[0].reset();
      setCaret();
      ;}, 300);
  });



  function getWeather() {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Hemiksem&APPID=d89c478a1189e5c46c4ffadabf02bd57";

    $.ajax ({
      url: url,
      success: function (result) {
        $("#weatherText").html("Outside it is ");

        var displaySky = `${result.weather[0].description}.`;
        $("#sky").html(displaySky);

        var C = Math.round(result.main.temp - 273.15);
        var displayDegrees = `${C}°C, with `;
        $("#temperature").html(displayDegrees);
      }
    });
  }

  getWeather();

  setTimeout(function(){  $("input:text").focus();}, 300);

  function setCaret() {
    const charwidth = 9.6;
    var textchars = $("#searchbar").val().length;
    var caretposition;
    if (textchars <= 72) {
      caretposition = textchars * charwidth;
      $("#caret").css('margin-left', 1 + caretposition+"px");
      $("#caret").css('animation', '0s');
    } else {
      caretposition = 72 * charwidth;
      $("#caret").css('margin-left', 1 + caretposition+"px");
    }
  }

  $("#searchbar").on('input', function() {
    setCaret();
  });

  $("#searchbar").on('keyup', function() {
    $("#caret").css('animation', 'blink 0.8s step-start infinite');
  });

  $("#searchbar").focus(function() {
    $("#caret").css('animation', 'blink 0.8s step-start infinite');
  });

  $("#searchbar").focusout(function() {
    $("#caret").css('animation', '0s');
  });
});
