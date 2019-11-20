from __future__ import absolute_import, print_function

from flask import request, g, make_response, jsonify
from rivescript import RiveScript
from . import Resource
from .. import schemas,config
import jwt
import os
import json
from googletrans import Translator
from wit import Wit
access_token = "ABJWGG53QBEVM6UY6AUMBPNP42EQCXOZ"
client = Wit(access_token)
rs = RiveScript()
rs1 = RiveScript()
import datetime
class Chatbot(Resource):
    def wit_response(self,text):
        #print(json.dumps(text, indent=4))
        #print(text["_text"])
        message = "Analysing the code " + text["_text"] + " : "
        entities = list(text["entities"].keys())
        print(entities)
        if "intent" not in entities:
            return None
        F = text['_text'].split()
        if F[0]!="for" or "if"!=F[0] or "while"!=F[0]:
            return None
        if "in" in F:
            index = F.index("in")
            if index == len(F)-1 or F[index+1]!="range":
                return None
        #print(text['_text'])
        try:
            intent = text["entities"]["intent"][0]["value"]
            print(intent)
            if intent == "function_search":
                return None
            if intent == "Loop_function":
                m_function ="This is a Loop Function. The key word: \" " +\
                    text["entities"]["loop_tag"][0]["value"] + "\" represents the loop."
            if intent == "Conditional_statement":
                print("????:")
                print(json.dumps(text["entities"],indent=4))
                if "loop_tag" in text["entities"]:
                    m_function = "This is a Loop Statement. The key word: \"" + \
                                 text["entities"]["loop_tag"][0]["value"] + "\" represents the loop starts."
                else:
                    m_function = "This is a Condition Statement. The key word: \"" + \
                            text["entities"]["condition_statement_tag"][0]["value"] + "\" represents the condition starts."
                print(m_function)
            if "condition" in entities:
                # print("!!!")
                # print(list(text["entities"]["condition"]))
                # print(list(text["entities"]["condition"][0]))
                # print(text["entities"]["condition"][0]["value"])
                if "entities" not in list(text["entities"]["condition"][0]):
                    #print("aaaa")
                    m_condition = ". The following is condition: \"" + text["entities"]["condition"][0]["value"]+ "\" ."
                else:
                    condition_entities = list(text["entities"]["condition"][0]["entities"].keys())
                    #print(condition_entities)
                    c = text["entities"]["condition"][0]["entities"]

                    m_condition = ". The following is condition: \"" +text["entities"]["condition"][0]["value"] + "\", it can split into several parts: "
                    for i in condition_entities:
                        if i!= "intent":
                            m_condition += "\"" + i  + "\" is " + c[i][0]["value"] +"; "
                # print(m_condition)
            return message + m_function + m_condition
        except Exception:
            return None



    def get(self):
        try:
            data = jwt.decode(g.headers['Token'],config.Secret_Key)
        except Exception:
            return make_response(jsonify(message = 'invalid token'), 401)
        #print(g.args['message'])
        if(g.args['huaci'] == False):  
            rs.load_directory(os.path.abspath('./ChatService/api/brain'))
            rs.sort_replies()
            resp = client.message(g.args['message'])
            resp = self.wit_response(resp)
            if resp == None:
                return make_response(jsonify(messge=rs.reply(data['email'], g.args['message'])))
            else:
                return make_response(jsonify(messge=resp))
        else:
            rs1.load_directory(os.path.abspath('./ChatService/api/brain2'))
            rs1.sort_replies()
            resp = client.message(g.args['message'])
            resp = self.wit_response(resp)
            if resp == None:
                if rs1.reply(data['email'], g.args['message']) != "[ERR: No Reply Matched]":
                    return make_response(jsonify(messge=rs1.reply(data['email'], g.args['message'])))
                else:
                    translator = Translator()
                    x = translator.translate(g.args['message'],dest = 'zh-cn')
                    return make_response(jsonify(messge=x.text))
            else:
                return make_response(jsonify(messge=resp))