let conversationContext = "";
let recorder;
let context;
let tmp_resp = "";
let tmp_stt_response = "";

function displayMediaDiv(type, str) {
  console.log("*****************");
  console.log("SET CAMERA CENTER");
  console.log("*****************");
  AvatarStartVideo();

  let msgHtml = "";

  if (type == "video") {
    msgHtml +=
      '<video width="100%" height="100%" autoplay controls style="outline: none">';
    msgHtml += '<source src="' + str + '" type="video/mp4">';
    msgHtml += "Your browser does not support the video tag.";
    msgHtml += "</video>";
  } else if (type == "pdf") {
    msgHtml +=
      '<embed src="' +
      str +
      '" type="application/pdf" width="100%" height="100%" />';
  } else if (type == "image") {
    msgHtml += "<img src='" + str + "' width='100%'' height='100%'' >";
  }

  /*
  msgHtml = '<iframe width="13-" height="100" src="' + str + '" ';
  msgHtml+= 'frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" '; 
  msgHtml+= 'allowfullscreen></iframe>';
  */

  /*
  msgHtml = '<iframe width="13-" height="100" src="https://www.youtube.com/embed/M7Go7aFCv9c?controls=0" ';
  msgHtml+= 'frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" '; 
  msgHtml+= 'allowfullscreen></iframe>';
  */

  /*
  msgHtml= '<iframe width="130" height="100"';
  msgHtml+= 'src="'+str+'">';
  msgHtml+= '</iframe>';
  */
  /*  
  msgHtml= '<video width="320" height="240" controls>'; 
  msgHtml+='<source src="movie.mp4" type="video/mp4">';
  msgHtml+= '<source src="movie.ogg" type="video/ogg">';
  msgHtml+= 'Your browser does not support the video tag.';
  msgHtml+= '</video>';
  */

  //msgHtml += str;
  //msgHtml += "</div><div class='" + who + "-line'>" + who + '</div></div>';

  console.log(msgHtml);
  $("#media-messages")
    .empty()
    .append(msgHtml);
  //$('#media-messages').scrollTop($('#media-messages')[0].scrollHeight);
}

function displayMsgDiv(str, who) {
  const time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  //const ampm = hours >= 12 ? 'pm' : 'am';
  //hours = hours % 12;
  //hours = hours ? hours : 12; // the hour "0" should be "12"
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  //const strTime = hours + ':' + minutes + ' ' + ampm;
  const strTime = hours + ":" + minutes;
  let msgHtml =
    "<div class='msg-card-wide mdl-card " +
    who +
    "'><div class='mdl-card__supporting-text'>";
  msgHtml += str;
  //msgHtml += "</div><div class='" + who + "-line'>" + who + '</div></div>';

  $("#messages").append(msgHtml);
  $("#messages").scrollTop($("#messages")[0].scrollHeight);

  if (who == "user") {
    $("#q").val("");
    //$('#q').attr('disabled', 'disabled');
    $("#p2").fadeTo(500, 1);
  } else {
    //$('#q').removeAttr('disabled');
    $("#p2").fadeTo(500, 0);
  }
}

$(document).ready(function() {
  //$('#q').attr('disabled', 'disabled');
  $("#p2").fadeTo(500, 1);
  $("#h").val("0");

  $.ajax({
    url: "/api/conversation",
    convText: "",
    context: "",
  })
    .done(function(res) {
      conversationContext = res.results.context;
      //play(res.results.responseText);
      if (!String(res.results.voiceResponse).includes("Welcome")) {
        sendMessageToAvatar(res.results.voiceResponse);
        console.log("%%%%%%%%%%%%%%%%%%%%%%%");
        console.log("AVATAR");
        console.log(res.results.voiceResponse);
        console.log("%%%%%%%%%%%%%%%%%%%%%%%");
        displayMsgDiv(res.results.textResponse, "bot");
      }
    })
    .fail(function(jqXHR, e) {
      console.log("Error: " + jqXHR.textResponse);
    })
    .catch(function(error) {
      console.log(error);
    });
});
$(document).ready(function() {
  $(".textfield__input").on("input", function() {
    let value = $(this).val();
    if (value == "") {
      $(".send-icon").css(
        "background-image",
        "url(../../static/img/sendiconTransparent.svg)"
      );
    } else {
      $(".send-icon").css(
        "background-image",
        "url(../../static/img/sendicon.svg)"
      );
    }
  });
});
$("#q").keypress(function(event) {
  if (event.keyCode === 13) {
    tmp_resp = $("#q").val();
    console.log("Clickeded with: " + tmp_resp);
    displayMsgDiv(tmp_resp, "user");
    if (tmp_resp.includes("video")) {
      displayMediaDiv("video", "/video");
    } else if (tmp_resp.includes("image")) {
      displayMediaDiv(
        "image",
        "https://argaamplus.s3.amazonaws.com/b663cbcc-99e8-4a30-96d3-72a0a6259a66.jpg"
      );
    } else if (tmp_resp.includes("doc")) {
      displayMediaDiv("pdf", "/pdf");
    } else {
      callConversation(tmp_resp);
    }
    event.preventDefault();
    //$('#q').val('');
  }
});
$("#sendbtn").on("click", function(event) {
  $(".send-icon").css(
    "background-image",
    "url(../../static/img/sendiconTransparent.svg)"
  );
  tmp_resp = $("#q").val();
  console.log("Clickeded with: " + tmp_resp);
  displayMsgDiv(tmp_resp, "user");
  if (tmp_resp.includes("video")) {
    displayMediaDiv("video", "/video");
  } else if (tmp_resp.includes("image")) {
    displayMediaDiv(
      "image",
      "https://argaamplus.s3.amazonaws.com/b663cbcc-99e8-4a30-96d3-72a0a6259a66.jpg"
    );
  } else if (tmp_resp.includes("doc")) {
    displayMediaDiv("pdf", "/pdf");
  } else {
    callConversation(tmp_resp);
  }
  event.preventDefault();
  //$('#q').val('');
});

function callConversationFromOption(res, user) {
  $(document).on("click", ".mdl-list", function(event) {
    $(this).addClass("active");
  });
  displayMsgDiv(res, user);
  callConversation(res);
}

function callConversation(res) {
  $("#media-messages").empty();

  console.log("callConversation with: " + res);

  // $('#q').attr('disabled', 'disabled');

  $.post("/api/conversation", {
    convText: res,
    context: JSON.stringify(conversationContext),
  })
    .done(function(res, status) {
      conversationContext = res.results.context;
      //play(res.results.responseText);
      sendMessageToAvatar(res.results.voiceResponse);
      console.log("%%%%%%%%%%%%%%%%%%%%%%%");
      console.log("AVATAR");
      console.log(res.results.voiceResponse);
      console.log("%%%%%%%%%%%%%%%%%%%%%%%");
      displayMsgDiv(res.results.textResponse, "bot");

      if (
        Object.keys(res.results.mediaResponse).length != 0 &&
        String(res.results.mediaResponse) != " "
      ) {
        console.log("********************************************");
        console.log("mediaResponse=#" + res.results.mediaResponse + "#");
        console.log("********************************************");
        displayMediaDiv("video", "/video");
      }
    })
    .fail(function(jqXHR, e) {
      console.log("Error: " + jqXHR.textResponse);
    });
}

function play(inputText) {
  let buf;

  const url = "/api/text-to-speech";
  const params = "text=" + inputText;
  const request = new XMLHttpRequest();
  request.open("POST", url, true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.responseType = "arraybuffer";

  // Decode asynchronously
  request.onload = function() {
    context.decodeAudioData(
      request.response,
      function(buffer) {
        buf = buffer;
        play();
      },
      function(error) {
        console.error("decodeAudioData error", error);
      }
    );
  };
  request.send(params);

  // Play the loaded file
  function play() {
    // Create a source node from the buffer
    const source = context.createBufferSource();
    source.buffer = buf;
    // Connect to the final output node (the speakers)
    source.connect(context.destination);
    // Play immediately
    source.start(0);
  }
}

const recordMic = document.getElementById("stt2");
recordMic.onclick = function() {
  context.resume();
  console.log(
    "------------------------------------------------------------------------------"
  );
  console.log("AudioContext Resumed");
  console.log(
    "------------------------------------------------------------------------------"
  );
  const fullPath = recordMic.src;
  const filename = fullPath.replace(/^.*[\\/]/, "");
  if (filename == "mic.svg") {
    try {
      recordMic.src = "./static/img/micactive.svg";
      startRecording();
      //console.log('recorder started');
      $("#q").val("I am listening ...");
    } catch (ex) {
      // console.log("Recognizer error .....");
    }
  } else {
    stopRecording();
    $("#q").val("");
    recordMic.src = "./static/img/mic.svg";
  }
};

function startUserMedia(stream) {
  const input = context.createMediaStreamSource(stream);
  console.log("Media stream created.");
  // Uncomment if you want the audio to feedback directly
  // input.connect(audio_context.destination);
  // console.log('Input connected to audio context destination.');

  // eslint-disable-next-line
  recorder = new Recorder(input);
  console.log("Recorder initialised.");
}

function startRecording(button) {
  recorder && recorder.record();
  console.log("Recording...");
}

function stopRecording(button) {
  recorder && recorder.stop();
  console.log("Stopped recording.");

  recorder &&
    recorder.exportWAV(function(blob) {
      console.log("%%%%%%%%%%%%%%%%%%%");
      console.log(blob);
      console.log("%%%%%%%%%%%%%%%%%%%");
      const url = "/api/speech-to-text";
      const request = new XMLHttpRequest();
      request.open("POST", url, true);
      request.setRequestHeader("Content-Length", blob.size);
      // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

      // Decode asynchronously
      request.onload = function() {
        tmp_stt_response = request.response;
        if (String(request.response).includes("video")) {
          displayMsgDiv(request.response, "user");
          displayMediaDiv("video", "/video");
        } else if (String(request.response).includes("image")) {
          displayMsgDiv(request.response, "user");
          displayMediaDiv(
            "image",
            "https://argaamplus.s3.amazonaws.com/b663cbcc-99e8-4a30-96d3-72a0a6259a66.jpg"
          );
        } else if (String(request.response).includes("doc")) {
          displayMsgDiv(request.response, "user");
          displayMediaDiv("pdf", "/pdf");
        } else {
          callConversation(request.response);
          displayMsgDiv(request.response, "user");
        }
      };
      request.send(blob);
    });

  console.log(
    "#################### SPEECH TO TEXT ###################################3"
  );
  console.log(tmp_stt_response);
  console.log(
    "#################### SPEECH TO TEXT ###################################3"
  );

  recorder.clear();
}

function waitSeconds(iMilliSeconds) {
  var counter = 0,
    start = new Date().getTime(),
    end = 0;
  while (counter < iMilliSeconds) {
    end = new Date().getTime();
    counter = end - start;
  }
}

window.onload = function init() {
  try {
    // webkit shim
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia =
      navigator.getUserMedia || navigator.webkitGetUserMedia;
    // eslint-disable-next-line
    window.URL = window.URL || window.webkitURL;

    context = new AudioContext();
    console.log("Audio context set up.");
    console.log(
      "navigator.getUserMedia " +
        (navigator.getUserMedia ? "available." : "not present!")
    );

    /*
    document.addEventListener('click', function (event) {  
    // Log the clicked element in the console
    console.log(event.target);
    }, false);
    */

    $("#avatarframe").on("load", function() {
      //console.log("FRAME LOADED");
      //console.log("BEFORE");
      waitSeconds(4000);
      SendWelcomeText();
      console.log("AFTER");
    });

    $("#streamingVideo").on("load", function() {
      console.log("VIDEO LOADED");
    });

    //await new Promise(resolve => setTimeout(resolve, 5000)); // 3 sec
  } catch (e) {
    alert("No web audio support in this browser!");
  }

  navigator.getUserMedia(
    {
      audio: true,
    },
    startUserMedia,
    function(e) {
      console.log("No live audio input: " + e);
    }
  );
};
