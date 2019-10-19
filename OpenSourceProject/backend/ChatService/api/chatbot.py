# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g, make_response, jsonify
from rivescript import RiveScript
from . import Resource
from .. import schemas,config
import jwt
import os
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
        return make_response(jsonify(messge = rs.reply(data['email'], g.args['message'])))