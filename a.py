import requests
import json
import pandas as pd


lis = []
df = pd.read_csv('AB_NYC_2019.csv')
headers = {'Authorization': "token 133ae3a798ec9b1cecb45d481c60cbb590ff2411",
           'Accept': 'application/json', 'Content-Type': 'application/json'}
for i in range(117):
    json_data = {
        "title": "asdasd"+str(i),
        "description": "xc",
        "brief": "asd",
        "guest": 2,
        "price": 211,
        "address": "unsw",
        "bedroom": 2,
        "bathroom": 3,
        "diningroom": 2,
        "breakfast": 'false',
        "lift": 'false',
        "kitchen": 'false',
        "wifi": 'false',
        "availabilities": [{
            "start": "2019-09-09",
            "end": "2019-10-01"}]
    }

    json_data2 = {
        "accommodation": i,
        "image": "http://127.0.0.1:8000/uploads/accommodation/2/accommodation_img.png"
    }

    # requests.post('http://127.0.0.1:8000/api/accommodation/',
    #               data=json.dumps(json_data2), headers=headers)

    requests.post('http://127.0.0.1:8000/api/attachment/',
                  data=json.dumps(json_data2), headers=headers)


# json_img = {
#         "accommodation": ,
#         "image": null
#     }


# r = requests.post('http://127.0.0.1:8000/api/accommodation/',
#                   data=json.dumps(json_data), headers=headers)


# r = requests.post('http: // 127.0.0.1: 8000/api/accommodation_picture/',
#                   data=json.dumps(json_data), headers=headers)
# print(r)
