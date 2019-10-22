# -*- coding: utf-8 -*-

###
### DO NOT CHANGE THIS FILE
### 
### The code is auto generated, your change will be overwritten by 
### code generating.
###
from __future__ import absolute_import

from .api.chatbot import Chatbot
from .api.user_register import UserRegister
from .api.user_login import UserLogin
from .api.user_logout import UserLogout


routes = [
    dict(resource=Chatbot, urls=['/chatbot'], endpoint='chatbot'),
    dict(resource=UserRegister, urls=['/user/register'], endpoint='user_register'),
    dict(resource=UserLogin, urls=['/user/login'], endpoint='user_login'),
    dict(resource=UserLogout, urls=['/user/logout'], endpoint='user_logout'),
]