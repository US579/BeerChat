# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g, make_response, jsonify

from . import Resource
from .. import schemas, config
import hashlib
import jwt
import datetime

class UserLogin(Resource):
    def get(self):
        email_md5 = hashlib.md5(g.args['email'].encode('utf-8'))
        email_md5.update(g.args['email'].encode('utf-8'))
        password_md5 = hashlib.md5(g.args['password'].encode('utf-8'))
        password_md5.update(g.args['password'].encode('utf-8'))
        db = config.connectdb()
        collection = db['user']
        data = collection.find_one({'email':email_md5.hexdigest(),'password':password_md5.hexdigest()})
        if data is None:
            return make_response(jsonify(message="Invalid username/password supplied"),400)
        token = jwt.encode({'email':g.args['email'],'exp':datetime.datetime.utcnow()+datetime.timedelta(days=1)},config.Secret_Key)
        return make_response(jsonify(token = token.decode('UTF-8'), role = data['role']),200)