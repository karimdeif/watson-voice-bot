// Copyright Quantum Capture Inc.  All rights reserved.
'use strict';

/**
 * @class This is the global object for all avatar properties and functions
 */
var QCAvatar = QCAvatar || {};

/**
 * Library version
 * @constant
 * @default
 */
QCAvatar.VERSION = "0.5";

/**
 * The iframe ID that contains the avatar
 * @constant
 * @default
 */
QCAvatar.AVATAR_FRAME_ID = "avatarframe";

/**
 * Avatar hair style choices
 * @readonly
 * @enum {string}
 */
QCAvatar.AvatarHairStyles = {
    Hair1: "Hair1",
    Hair2: "Hair2",
    Hair3: "Hair3"
};

/**
 * Avatar hair color choices
 * @readonly
 * @enum {string}
 */
QCAvatar.AvatarHairColors = {
    Black1: "Black1",
    Brown1: "Brown1",
    Blond1: "Blond1",
    Red1: "Red1"
};

/**
 * Avatar eye color choices
 * @readonly
 * @enum {string}
 */
QCAvatar.AvatarEyeColors = {
    Blue1: "Blue1",
    Green1: "Green1",
    Brown1: "Brown1"
};

/**
 * Avatar clothing color choices
 * @readonly
 * @enum {string}
 */
QCAvatar.AvatarClothingColors = {
    Gray1: "Gray1",
    Black1: "Black1",
    Blue1: "Blue1"
};

/**
 * Avatar name tag state choices
 * @readonly
 * @enum {string}
 */
QCAvatar.AvatarNameTagStates = {
    Show: "Show",
    Hide: "Hide"
};

/**
 * Where the avatar looks choices
 * @readonly
 * @enum {string}
 */
QCAvatar.AvatarLookingTypes = {
    Auto: "Auto",
    At_Camera: "At_Camera",
    Around_Coordinates: "Around_Coordinates",
    Exact_Coordinates: "Exact_Coordinates"
};

/**
 * Avatar emotion choices
 * @readonly
 * @enum {string}
 */
QCAvatar.AvatarEmotions = {
    None: "None",
    Happy1: "Happy1",
    Surprise1: "Surprise1",
    Stern1: "Stern1"
};

/**
 * Avatar gesture choices
 * @readonly
 * @enum {string}
 */
QCAvatar.AvatarGestures = {
    Wave_Mid_RHand: "Wave_Mid_RHand",
    Deictic_Down_RHand: "Deictic_Down_RHand",
    Deictic_Forward_RHand: "Deictic_Forward_RHand",
    Deictic_L_Mid_LHand: "Deictic_L_Mid_LHand",
    Deictic_L_Mid_RHand: "Deictic_L_Mid_RHand",
    Deictic_L_Up_RHand: "Deictic_L_Up_RHand",
    Deictic_R_Mid_LHand: "Deictic_R_Mid_LHand",
    Deictic_R_Mid_RHand: "Deictic_R_Mid_RHand",
    Deictic_R_Up_LHand: "Deictic_R_Up_LHand",
    Deictic_Up_RHand: "Deictic_Up_RHand"
};

/**
 * Avatar voice language choices. Not all choices are value for
 * every TTS service.
 * @readonly
 * @enum {string}
 */
QCAvatar.VoiceLanguages = {
    ARB: "ARB",
    AR_AR: "AR_AR",
    CMN_CN: "CMN_CN",
    CMN_TW: "CMN_TW",
    CY_GB: "CY_GB",
    DA_DK: "DA_DK",
    DE_DE: "DE_DE",
    EN_AU: "EN_AU",
    EN_CA: "EN_CA",
    EN_GB: "EN_GB",
    EN_IN: "EN_IN",
    EN_US: "EN_US",
    ES_ES: "ES_ES",
    ES_LA: "ES_LA",
    ES_MX: "ES_MX",
    ES_US: "ES_US",
    FR_FR: "FR_FR",
    FR_CA: "FR_CA",
    HI_IN: "HI_IN",
    IS_IS: "IS_IS",
    IT_IT: "IT_IT",
    JA_JP: "JA_JP",
    KO_KR: "KO_KR",
    NB_NO: "NB_NO",
    NL_NL: "NL_NL",
    PL_PL: "PL_PL",
    PT_BR: "PT_BR",
    PT_PT: "PT_PT",
    RO_RO: "RO_RO",
    RU_RU: "RU_RU",
    SK_SK: "SK_SK",
    SV_SE: "SV_SE",
    TR_TR: "TR_TR",
    UK_UA: "UK_UA",
    ZH_CN: "ZH_CN"
};

/**
 * Avatar voice gender choices
 * @readonly
 * @enum {string}
 */
QCAvatar.VoiceGenders = {
    Male: "Male",
    Female: "Female"
};

/**
 * Avatar camera location choices
 * @readonly
 * @enum {string}
 */
QCAvatar.CameraLocations = {
    Avatar_On_Left: "Avatar_On_Left",
    Avatar_In_Center: "Avatar_In_Center",
    Avatar_On_Right: "Avatar_On_Right"
};

/**
 * Avatar background choices
 * @readonly
 * @enum {string}
 */
QCAvatar.Backgrounds = {
    Color_Blue1: "Color_Blue1",
    Color_Green1: "Color_Green1",
    Color_Red1: "Color_Red1"
};

//-----------------------------------------------------------------------------

/**
 * Use window.addEventListener() with this custom event name to receive events from the
 * avatar frame. These events' details are JSON objects with a 'name' property of the type {@link QCAvatar.AvatarEventTypes}.
 * @example
 * window.addEventListener(QCAvatar.AVATAR_EVENT_NAME, (event) => {
 *    HandleEventFromAvatar(event.detail);
 * }, false);
 * 
 * function HandleEventFromAvatar(data) {
 *     switch(data.name)
 *     {
 *         case QCAvatar.AvatarEventTypes.Data_Channel_Open:
 *             console.log("*** COMMANDS MAY BE SENT TO THE AVATAR ***");
 *             break;
 * 
 *         case QCAvatar.AvatarEventTypes.Data_Channel_Closed:
 *             console.log("*** COMMANDS CANNOT BE SENT TO THE AVATAR ***");
 *             break;
 * 
 *         case QCAvatar.AvatarEventTypes.Video_Connected:
 *             console.log("*** AVATAR VIDEO IS PLAYING ***");
 *             break;
 *     }
 * }
 * @see {@link QCAvatar.AvatarEventTypes} for the list of possible event types that may be listened for
 * @constant
 * @default
 */
QCAvatar.AVATAR_EVENT_NAME = "avatarEvent";

/**
 * Avatar event types used by the {@link QCAvatar.AVATAR_EVENT_NAME} custom events.
 * @see {@link QCAvatar.AVATAR_EVENT_NAME} from an example of usage
 * @readonly
 * @enum {string}
 */
QCAvatar.AvatarEventTypes = {
    /** Indicates that the data channel is available to send commands to the avatar server */
    Data_Channel_Open: "Data_Channel_Open",
    /** The data channel to the avatar server has been closed, and commands may not be sent */
    Data_Channel_Closed: "Data_Channel_Closed",
    /** The avatar video has been connected and is playing. Also implies that the data channel is open. */
    Video_Connected: "Video_Connected"
};

//-----------------------------------------------------------------------------

/**
 * Sets the avatar's current hair style
 * @param {QCAvatar.AvatarHairStyles} NewHairStyle 
 */
QCAvatar.SetHairStyle = function(NewHairStyle) {
    //document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.SendAvatarHairStyle(NewHairStyle);

    let message = {
        Command: "SendAvatarHairStyle",
        Style: ""
    };
    message.Style = NewHairStyle;

    document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.postMessage(message, "*");
}

/**
 * Sets the avatar's current hair color
 * @param {QCAvatar.AvatarHairColors} NewHairColor 
 */
QCAvatar.SetHairColor = function(NewHairColor) {
    //document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.SendAvatarHairColor(NewHairColor);

    let message = {
        Command: "SendAvatarHairColor",
        Color: ""
    };
    message.Color = NewHairColor;

    document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.postMessage(message, "*");
}

/**
 * Sets the avatar's current eye color
 * @param {QCAvatar.AvatarEyeColors} NewEyeColor 
 */
QCAvatar.SetEyeColor = function(NewEyeColor) {
    //document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.SendAvatarEyeColor(NewEyeColor);

    let message = {
        Command: "SendAvatarEyeColor",
        Color: ""
    };
    message.Color = NewEyeColor;

    document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.postMessage(message, "*");
}

/**
 * Sets the avatar's current clothing color
 * @param {QCAvatar.AvatarClothingColors} NewClothingColor 
 */
QCAvatar.SetClothingColor = function(NewClothingColor) {
    //document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.SendAvatarClothingColor(NewClothingColor);

    let message = {
        Command: "SendAvatarClothingColor",
        Color: ""
    };
    message.Color = NewClothingColor;

    document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.postMessage(message, "*");
}

/**
 * Sets the avatar's current name tag state
 * @param {QCAvatar.AvatarNameTagStates} NewState 
 */
QCAvatar.SetNameTagState = function(NewState) {
    //document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.SendAvatarNameTagState(NewState);

    let message = {
        Command: "SendAvatarNameTagState",
        State: ""
    };
    message.State = NewState;

    document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.postMessage(message, "*");
}

/**
 * Sets the avatar's current rotation. This is an instant rotation change.
 * @param {number} NewRotation - From -180.0 degrees to 180.0 degrees, with 0 degrees facing forwards
 */
QCAvatar.SetRotation = function(NewRotation) {
    let rotation = NewRotation.toString();
    //document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.SendAvatarRotation(rotation);

    let message = {
        Command: "SendAvatarRotation",
        Rotation: ""
    };
    message.Rotation = rotation;

    document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.postMessage(message, "*");
}

/**
 * Sets where the avatar is looking
 * @param {QCAvatar.AvatarLookingTypes} NewLookingType 
 */
QCAvatar.SetLookingType = function(NewLookingType) {
    //document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.SendAvatarLooking(NewLookingType);

    let message = {
        Command: "SendAvatarLooking",
        Looking: ""
    };
    message.Looking = NewLookingType;

    document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.postMessage(message, "*");
}

/**
 * Sets the viewport location that the avatar will look at when the avatar's looking type is set to 
 * Around_Coordinates or Exact_Coordinates. A look location of (0,0) is the center of the viewport.
 * @param {number} X - From -1.0 to 1.0 (left to right)
 * @param {number} Y - From -1.0 to 1.0 (bottom to top)
 */
QCAvatar.SetLookLocation = function(X, Y) {
    let location = X.toString() + " " + Y.toString();
    //document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.SendAvatarLookLocation(location);

    let message = {
        Command: "SendAvatarLookLocation",
        Location: ""
    };
    message.Location = location;

    document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.postMessage(message, "*");
}

/**
 * Sets avatar's current emotion
 * @param {QCAvatar.AvatarEmotions} NewEmotion 
 */
QCAvatar.SetEmotion = function(NewEmotion) {
    //document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.SendAvatarEmotion(NewEmotion);

    let message = {
        Command: "SendAvatarEmotion",
        Emotion: ""
    };
    message.Emotion = NewEmotion;

    document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.postMessage(message, "*");
}

/**
 * Trigger a gesture on the avatar
 * @param {QCAvatar.AvatarGestures} NewGesture 
 */
QCAvatar.TriggerGesture = function(NewGesture) {
    //document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.SendAvatarGesture(NewGesture);

    let message = {
        Command: "SendAvatarGesture",
        Gesture: ""
    };
    message.Gesture = NewGesture;

    document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.postMessage(message, "*");
}

//-----------------------------------------------------------------------------

/**
 * Set the language code that will be used for speech. Not all language codes are valid for every
 * TTS service.
 * @param {QCAvatar.VoiceLanguages} NewLanguage 
 */
QCAvatar.SetVoiceLanguage = function(NewLanguage) {
    //document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.SendVoiceLanguage(NewLanguage);

    let message = {
        Command: "SendVoiceLanguage",
        Language: ""
    };
    message.Language = NewLanguage;

    document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.postMessage(message, "*");
}

/**
 * Set the voice index that will be used within the chosen voice language. Valid indices depend on 
 * the chosen language and the TTS service used.
 * @param {number} NewVoiceIndex 
 */
QCAvatar.SetVoiceIndex = function(NewVoiceIndex) {
    let index = NewVoiceIndex.toString();
    //document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.SendVoiceIndex(index);

    let message = {
        Command: "SendVoiceIndex",
        Index: ""
    };
    message.Index = index;

    document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.postMessage(message, "*");
}

/**
 * Set the voice gender that will be used within the chosen voice language and voice index. Valid 
 * genders depend on the chosen voice language, the chosen voice index, and the TTS service used.
 * @param {QCAvatar.VoiceGenders} NewGender 
 */
QCAvatar.SetVoiceGender = function(NewGender) {
    //document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.SendVoiceGender(NewGender);

    let message = {
        Command: "SendVoiceGender",
        Gender: ""
    };
    message.Gender = NewGender;

    document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.postMessage(message, "*");
}

/**
 * Have the avatar speak the given text
 * @param {string} SpeechText 
 */
QCAvatar.TriggerSpeechText = function(SpeechText) {
    //document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.SendSpeechText(SpeechText);

    let message = {
        Command: "SendSpeechText",
        Text: ""
    };
    message.Text = SpeechText;

    document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.postMessage(message, "*");
}

//-----------------------------------------------------------------------------

/**
 * Set the camera location that is viewing the avatar
 * @param {QCAvatar.CameraLocations} NewCameraLocation 
 * @param {float} Speed - Time in seconds to change location. 0 is instant.
 */
QCAvatar.SetCameraLocation = function(NewCameraLocation, Speed) {
    //document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.SendCameraLocation(NewCameraLocation);

    let message = {
        Command: "SendCameraLocation",
        Location: "",
        Speed: 0.0
    };
    message.Location = NewCameraLocation;
    message.Speed = Speed;

    document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.postMessage(message, "*");
}

/**
 * Set the background behind the avatar
 * @param {QCAvatar.Backgrounds} NewBackground 
 */
QCAvatar.SetBackground = function(NewBackground) {
    //document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.SendBackground(NewBackground);

    let message = {
        Command: "SendBackground",
        Background: ""
    };
    message.Background = NewBackground;

    document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.postMessage(message, "*");
}

//-----------------------------------------------------------------------------

/**
 * Request that the avatar video stream should begin playing. This is equivalent to the player clicking on 
 * the play button within the avatar's iframe.
 */
QCAvatar.StartAvatarVideo = function() {
    let message = {
        Command: "StartAvatarVideo"
    };

    document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.postMessage(message, "*");
}

//-----------------------------------------------------------------------------

/**
 * Start a batch operation. This allows for all avatar operations to be batched up and sent to the server
 * when SendBatch() is called.
 */
QCAvatar.StartBatch = function() {
    //document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.StartAvatarOperationsBatch();

    let message = {
        Command: "StartAvatarOperationsBatch"
    };

    document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.postMessage(message, "*");
}

/**
 * Send the current batch of operations to the server
 */
QCAvatar.SendBatch = function() {
    //document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.SendAvatarOperationsBatch();

    let message = {
        Command: "SendAvatarOperationsBatch"
    };

    document.getElementById(QCAvatar.AVATAR_FRAME_ID).contentWindow.postMessage(message, "*");
}

//-----------------------------------------------------------------------------

QCAvatar.Init = function() {
    window.addEventListener("message", (event) => {
        QCAvatar.HandleAvatarMessage(event.data);
    }, false);
}

QCAvatar.HandleAvatarMessage = function (data) {
    switch(data.AvatarEvent) {
        case "FrameLoaded":
            //console.log("*** FRAME LOADED");
            break;

        case "VideoConnected":
            {
                //console.log("*** VIDEO CONNECTED");

                let avatarEvent = new CustomEvent(QCAvatar.AVATAR_EVENT_NAME, {
                    detail: {
                        name: QCAvatar.AvatarEventTypes.Video_Connected
                    }
                });
                
                window.dispatchEvent(avatarEvent);
            }
            break;

        case "WebSocketOpen":
            //console.log("*** WEB SOCKET OPEN");
            break;
    
        case "WebSocketClosed":
            //console.log("*** WEB SOCKET CLOSED");
            break;

        case "DataChannelOpen":
            {
                //console.log("*** DATA CHANNEL OPEN");

                let avatarEvent = new CustomEvent(QCAvatar.AVATAR_EVENT_NAME, {
                    detail: {
                        name: QCAvatar.AvatarEventTypes.Data_Channel_Open
                    }
                });
                
                window.dispatchEvent(avatarEvent);
            }
            break;

        case "DataChannelClosed":
            {
                //console.log("*** DATA CHANNEL CLOSED");

                let avatarEvent = new CustomEvent(QCAvatar.AVATAR_EVENT_NAME, {
                    detail: {
                        name: QCAvatar.AvatarEventTypes.Data_Channel_Closed
                    }
                });
                
                window.dispatchEvent(avatarEvent);
            }
            break;
    }
}

window.addEventListener('DOMContentLoaded', QCAvatar.Init, false);
