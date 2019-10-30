# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g, make_response, jsonify
from rivescript import RiveScript
from . import Resource
from .. import schemas,config
import jwt
import os
import json


from wit import Wit
access_token = "ABJWGG53QBEVM6UY6AUMBPNP42EQCXOZ"
client = Wit(access_token)


rs = RiveScript()
rs.load_directory(os.getcwd())
rs.sort_replies()
import datetime
class Chatbot(Resource):

    def get(self):
        try:
            data = jwt.decode(g.headers['Token'],config.Secret_Key)
        except Exception:
            return make_response(jsonify(message = 'invalid token'), 400)
        #print(g.args['message'])
        resp = client.message(g.args['message'])
        resp = self.wit_response(resp)
        #print("*"*100)
        #print(rs.reply(data['email'], g.args['message']))
        #print(resp)
        if resp == None:
            return make_response(jsonify(messge=rs.reply(data['email'], g.args['message'])))
        else:
            return make_response(jsonify(messge=resp))
        # if rs.reply(data['email'], g.args['message']) == "Sorry I don't understand.":
        #     return make_response(jsonify(messge = resp ))
        # return make_response(jsonify(messge = rs.reply(data['email'], g.args['message'])))

    def wit_response(self,text):
        #print(json.dumps(text, indent=4))
        #print(text["_text"])
        message = "Analysing the code " + text["_text"] + " : "
        entities = list(text["entities"].keys())
        if "intent" not in entities:
            return None
        intent = text["entities"]["intent"][0]["value"]
        if intent == "Loop_function":
            m_function ="This is a Loop Function, since the key world " +\
                      text["entities"]["loop_tag"][0]["value"]
        if intent == "Conditional_statement":
            m_function = "This is a Conditions Statement, since the key world " + \
                       text["entities"]["condition_statement_tag"][0]["value"]

        if "condition" in entities:
            condition_entities = list(text["entities"]["condition"][0]["entities"].keys())
            c = text["entities"]["condition"][0]["entities"]
            m_condition = ". The rest is condition: " +text["entities"]["condition"][0]["value"] + "; it can split into several parts: "
            for i in condition_entities:
                if i!= "intent":
                    m_condition += i + " is " + c[i][0]["value"] +"; "

        return message + m_function + m_condition