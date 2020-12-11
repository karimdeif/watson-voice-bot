// Copyright Quantum Capture Inc.  All rights reserved.
'use strict';

// Some testing functions

// Called when the body is loaded
function InitPage() {
    // Display the dialog if we haven't been told not to
    const urlParams = new URLSearchParams(window.location.search);
    if(!urlParams.has('DoNotDisplayDialog')) {
        $('#sampleStartModal').modal({
            keyboard: false,
            backdrop: 'static'
          });
    }
}

// Some testing functions
function sendMessageToAvatar(message) {
  let cleanText = "";

  console.log("sendMessageToAvatar");
  console.log(message);

  cleanText = message.replace(/<\/?[^>]+(>|$)/g, "");

  console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
  console.log(cleanText);
  console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");

  QCAvatar.StartBatch();
  console.log("setting avatar position to left");
  console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
  QCAvatar.SetCameraLocation(QCAvatar.CameraLocations.Avatar_On_Left, 1.0);

  //QCAvatar.StartBatch();
  if (cleanText.includes("Bye")) {
    console.log("Bye");
    QCAvatar.TriggerGesture(QCAvatar.AvatarGestures.Wave_Mid_RHand);
  } else {
    QCAvatar.TriggerGesture(QCAvatar.AvatarGestures.Deictic_L_Mid_LHand);
  }

  //QCAvatar.SetLookLocation(0.6,-0.7);
  QCAvatar.SetLookingType(QCAvatar.AvatarLookingTypes.At_Camera);
  QCAvatar.TriggerSpeechText(cleanText);

  //QCAvatar.SendBatch();
  QCAvatar.SendBatch();
}

function SendWelcomeText() {
  let textMessage = "";
  let str =
    "Good Morning! I'm Z-ara, your IT Digital Assistant. How can I help you today?";

  textMessage += str;

  textMessage += "Available services:";

  //textMessage += "<ul>";

  textMessage +=
    '<div class="mdl-list" onclick="callConversationFromOption(\'' +
    "Answer Questions about IT Services" +
    "' , 'user')\">" +
    "Answer Questions about IT Services" +
    "</div>";

  textMessage +=
    '<div class="mdl-list" onclick="callConversationFromOption(\'' +
    "Present Latest IT Services and Solutions" +
    "' , 'user')\">" +
    "Present Latest IT Services and Solutions" +
    "</div>";

  //textMessage += "</ul>";

  displayMsgDiv(textMessage, "bot");
  //displayMediaDiv('https://argaamplus.s3.amazonaws.com/b663cbcc-99e8-4a30-96d3-72a0a6259a66.jpg');
  //displayMediaDiv('https://www.youtube.com/embed/M7Go7aFCv9c?controls=0');
  //displayMediaDiv('/pdf');
  //displayMediaDiv('/video');
  QCAvatar.StartBatch();
  //QCAvatar.SetLookLocation(0.0,0.0);
  //QCAvatar.SetLookingType(QCAvatar.AvatarLookingTypes.Exact_Coordinates);
  QCAvatar.SetLookingType(QCAvatar.AvatarLookingTypes.At_Camera);
  QCAvatar.SetEmotion(QCAvatar.AvatarEmotions.Happy1);
  QCAvatar.TriggerGesture(QCAvatar.AvatarGestures.Wave_Mid_RHand);
  //QCAvatar.SetLookLocation(0.6,-0.7);
  //QCAvatar.SetLookingType(QCAvatar.AvatarLookingTypes.Around_Coordinates);

  //str = "Good Morning";
  QCAvatar.TriggerSpeechText(str);

  QCAvatar.SetLookLocation(0.0, 0.0);
  QCAvatar.SetLookingType(QCAvatar.AvatarLookingTypes.Exact_Coordinates);
  QCAvatar.SetLookingType(QCAvatar.AvatarLookingTypes.At_Camera);
  //str = "I'm Zara your IT Digital Assistant. How can I help you today?";
  //QCAvatar.TriggerGesture(QCAvatar.AvatarGestures.Deictic_L_Up_RHand);
  //QCAvatar.SetEmotion(QCAvatar.AvatarEmotions.None);
  //QCAvatar.TriggerSpeechText(str);
  QCAvatar.SendBatch();
}

function SendAboutAramcoText() {
  QCAvatar.TriggerSpeechText(
    "Saudi Aramco, officially the Saudi Arabian Oil Company, is a Saudi Arabian multinational petroleum and natural gas company based in Dhahran, Saudi Arabia."
  );
}

function SendAboutQCText() {
  QCAvatar.TriggerSpeechText(
    "Quantum Capture creates AI-powered virtual humans that enhance customer service, employee training, marketing, and entertainment applications."
  );
}

function SetAllisonVoice() {
  QCAvatar.StartBatch();
  QCAvatar.SetVoiceGender(QCAvatar.VoiceGenders.Female);
  QCAvatar.SetVoiceLanguage(QCAvatar.VoiceLanguages.EN_US);
  QCAvatar.SetVoiceIndex(2);
  QCAvatar.SendBatch();
}

function SetLisaVoice() {
  QCAvatar.StartBatch();
  QCAvatar.SetVoiceGender(QCAvatar.VoiceGenders.Female);
  QCAvatar.SetVoiceLanguage(QCAvatar.VoiceLanguages.EN_US);
  QCAvatar.SetVoiceIndex(3);
  QCAvatar.SendBatch();
}

function SetEmilyVoice() {
  QCAvatar.StartBatch();
  QCAvatar.SetVoiceGender(QCAvatar.VoiceGenders.Female);
  QCAvatar.SetVoiceLanguage(QCAvatar.VoiceLanguages.EN_US);
  QCAvatar.SetVoiceIndex(4);
  QCAvatar.SendBatch();
}

function SetOliviaVoice() {
  QCAvatar.StartBatch();
  QCAvatar.SetVoiceGender(QCAvatar.VoiceGenders.Female);
  QCAvatar.SetVoiceLanguage(QCAvatar.VoiceLanguages.EN_US);
  QCAvatar.SetVoiceIndex(5);
  QCAvatar.SendBatch();
}

function AvatarStartVideo() {
  QCAvatar.StartBatch();
  QCAvatar.SetCameraLocation(QCAvatar.CameraLocations.Avatar_In_Center, 1.0);
  QCAvatar.SendBatch();
}

//-----------------------------------------------------------------------------
// Support for avatar events

window.addEventListener(QCAvatar.AVATAR_EVENT_NAME, (event) => {
  HandleEventFromAvatar(event.detail);
}, false);

function HandleEventFromAvatar(data) {
  switch(data.name)
  {
      case QCAvatar.AvatarEventTypes.Data_Channel_Open:
          {
              console.log("*** COMMANDS MAY BE SENT TO THE AVATAR ***");

              let status = document.getElementById('StatusText');
              if(status != null) {
                  status.innerHTML = "Status: Avatar Ready For Commands";
              }
          }
          break;

      case QCAvatar.AvatarEventTypes.Data_Channel_Closed:
          {
              console.log("*** COMMANDS CANNOT BE SENT TO THE AVATAR ***");

              let status = document.getElementById('StatusText');
              if(status != null) {
                  status.innerHTML = "Status: Avatar Data Channel Disconnected";
              }
          }
          break;

          case QCAvatar.AvatarEventTypes.Video_Connected:
              {
                  console.log("*** AVATAR VIDEO IS PLAYING ***");
  
                  let status = document.getElementById('StatusText');
                  if(status != null) {
                      status.innerHTML = "Status: Avatar Video Is Playing";
                  }
              }
              break;
  }
}

