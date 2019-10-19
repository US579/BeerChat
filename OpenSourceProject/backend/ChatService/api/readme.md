# Api:
## User Register Api:
http://127.0.0.1:5000/ChatService/user/register
Method: Post
Data Filed: Json
Example: {"email":"xxx", "password":"xxxx", "role" : "mentor" or "learner"}
response: 201, 200(email has been used) or 422(data format is not correct)
---
## User Login Api:
http://127.0.0.1:5000/ChatService/user/login
Method: Get
Data field: email and password
response: 200, 400
---
## ChatBot Api:
http://127.0.0.1:5000/ChatService/chatbot
Method: Get
Header: Token
Data: message
response: 200
---
# Running the Server:
First running pip install -r requirements.txt or pip3 install -r requirements.txt
under OpenSourceProject Document.
Then go to backend Document and run python3 __init__.py or python __init__.py
Then go to http://127.0.0.1:5000/static/swagger-ui/index.html
