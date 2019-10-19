import requests
import time
from flask import Flask
from pymongo import MongoClient
from flask_restplus import Resource, Api, reqparse
from bson.objectid import ObjectId

app = Flask(__name__)
api = Api(app)



@api.route('/message')
class chatbot(Resource):
    def post(self,msg):
        if msg == "hello":
            return "hi"
            