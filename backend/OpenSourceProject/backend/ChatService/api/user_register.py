# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g,make_response,jsonify

from . import Resource
from .. import schemas,config
import hashlib

class UserRegister(Resource):
    def post(self):
        db = config.connectdb()    
        collection = db['user']
        data = g.json
        email_md5 = hashlib.md5(data['email'].encode('utf-8'))
        email_md5.update(data['email'].encode('utf-8'))
        if collection.find_one({'email': email_md5.hexdigest()}):
            return make_response(jsonify(message="This email has been used"),200)
        password_md5 = hashlib.md5(data['password'].encode('utf-8'))
        password_md5.update(data['password'].encode('utf-8'))
        data['email'] = email_md5.hexdigest()
        data['password'] = password_md5.hexdigest()
        collection.insert_one(data)
        return make_response(jsonify(message="Register successful"),201)