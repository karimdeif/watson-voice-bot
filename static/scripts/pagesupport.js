// Copyright Quantum Capture Inc.  All rights reserved.
'use strict';

// Some testing functions         
function sendMessageToAvatar(message) {

    let cleanText = '';
    
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    console.log(message);    
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");

    cleanText = message.replace(/<\/?[^>]+(>|$)/g, "");

    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    console.log(cleanText);    
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");

    QCAvatar.TriggerSpeechText(cleanText);
}

function SendWelcomeText() {
    QCAvatar.StartBatch();
    QCAvatar.TriggerGesture(QCAvatar.AvatarGestures.Wave_Mid_RHand);
    QCAvatar.TriggerSpeechText("Hello and welcome to the sample web page.");
    QCAvatar.SendBatch();
}

function SendAboutAramcoText() {
    QCAvatar.TriggerSpeechText("Saudi Aramco, officially the Saudi Arabian Oil Company, is a Saudi Arabian multinational petroleum and natural gas company based in Dhahran, Saudi Arabia.");
}

function SendAboutQCText() {
    QCAvatar.TriggerSpeechText("Quantum Capture creates AI-powered virtual humans that enhance customer service, employee training, marketing, and entertainment applications.");
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
