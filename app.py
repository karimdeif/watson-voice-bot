# -*- coding: utf-8 -*-
# Copyright 2018 IBM Corp. All Rights Reserved.

# Licensed under the Apache License, Version 2.0 (the “License”)
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#  https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an “AS IS” BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import json
import os
from dotenv import load_dotenv
from flask import Flask, Response
from flask import jsonify
from flask import request, redirect
from flask_socketio import SocketIO
from flask_cors import CORS
from ibm_watson import AssistantV1
from ibm_watson import SpeechToTextV1
from ibm_watson import TextToSpeechV1
from ibm_cloud_sdk_core import get_authenticator_from_environment

import assistant_setup

app = Flask(__name__)
socketio = SocketIO(app)
CORS(app)


# Redirect http to https on CloudFoundry
@app.before_request
def before_request():
    fwd = request.headers.get('x-forwarded-proto')

    # Not on Cloud Foundry
    if fwd is None:
        return None
    # On Cloud Foundry and is https
    elif fwd == "https":
        return None
    # On Cloud Foundry and is http, then redirect
    elif fwd == "http":
        url = request.url.replace('http://', 'https://', 1)
        code = 301
        return redirect(url, code=code)


@app.route('/')
def Welcome():
    return app.send_static_file('index.html')


@app.route('/api/conversation', methods=['POST', 'GET'])
def getConvResponse():

    convText = request.form.get('convText')
    convContext = request.form.get('context', "{}")
    jsonContext = json.loads(convContext)

    response = assistant.message(workspace_id=workspace_id,
                                 input={'text': convText},
                                 context=jsonContext)

    response = response.get_result()
    print("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    print(response);
    print("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    #reponseText = response["output"]["text"]
    
    print("----------------------------------------------------")    
    reponseText = response["output"]["generic"][0]["text"]
    print("reponseText")    
    print(reponseText)
    print("----------------------------------------------------")


    responseDetails = ''

    # no options
    if (len(response["output"]["generic"]) == 1 ):       
        responseDetails = {'responseText': reponseText ,
                        'context': response["context"]}
    else:
        print("----------------------------------------------------")
        text_title = response["output"]["generic"][1]["title"]
        print("text_title")
        print(text_title)
        print("----------------------------------------------------")

        print("----------------------------------------------------")
        list_options = response["output"]["generic"][1]["options"]
        print("list_options")
        print(list_options)
        print("----------------------------------------------------")
        
        #print("++++++++++++++++++++++++++++++++++++++++++++++++++")
        #print (list_options[0]['label'])
        #print (list_options[1]['label'])
        #print (list_options[2]['label'])
        #print (len(list_options))
        #print("++++++++++++++++++++++++++++++++++++++++++++++++++")
        
        #print("----------------------------------------------------")


        print("----------------------------------------------------")
        #labels = '<ul>'
        labels = ''
        for i in range(len(list_options)):
            #labels += '<li><div onclick="callConversationFromOption(\'' + list_options[i]["value"]["input"]["text"] + '\')"> ' + list_options[i]["label"] + '</div></li>'
            labels += '<div class="mdl-list" onclick="callConversationFromOption(\'' + list_options[i]["value"]["input"]["text"] + '\' , \'user\')"> <u>' + list_options[i]["label"] + '</u></div>'

        #labels += '</ul>'
        print('labels')
        print(labels)
        print("----------------------------------------------------")

        responseDetails = {'responseText': reponseText + '<div>' + text_title + labels + '</div>',
                        'context': response["context"]}

    return jsonify(results=responseDetails)


#@app.route('/api/text-to-speech', methods=['POST'])
def getSpeechFromText():
    inputText = request.form.get('text')
    ttsService = TextToSpeechV1()

    def generate():
        if inputText:
            audioOut = ttsService.synthesize(
                inputText,
                accept='audio/wav',
                voice='en-US_AllisonVoice').get_result()

            data = audioOut.content
        else:
            print("Empty response")
            data = "I have no response to that."

        yield data

    return Response(response=generate(), mimetype="audio/x-wav")


@app.route('/api/speech-to-text', methods=['POST'])
def getTextFromSpeech():

    sttService = SpeechToTextV1()
    #print("############################################")
    #print(request.get_data(cache=False))
    #print("############################################")
    response = sttService.recognize(
            audio=request.get_data(cache=False),
            content_type='audio/wav',
            timestamps=True,
            word_confidence=True,
            smart_formatting=True, keywords=['aramco'] , keywords_threshold=0.1,  language_customization_id="36842222-c007-497d-ad2d-0b24267f201d").get_result()

    # Ask user to repeat if STT can't transcribe the speech
    if len(response['results']) < 1:
        return Response(mimetype='plain/text',
                        response="Sorry, didn't get that. please try again!")

    text_output = response['results'][0]['alternatives'][0]['transcript']
    text_output = text_output.strip()
    return Response(response=text_output, mimetype='plain/text')


port = os.environ.get("PORT") or os.environ.get("VCAP_APP_PORT") or 5000
if __name__ == "__main__":
    load_dotenv()

    # SDK is currently confused. Only sees 'conversation' for CloudFoundry.
    authenticator = (get_authenticator_from_environment('assistant') or
                     get_authenticator_from_environment('conversation'))
    assistant = AssistantV1(version="2019-11-06", authenticator=authenticator)
    workspace_id = assistant_setup.init_skill(assistant)
    socketio.run(app, host='0.0.0.0', port=int(port))
