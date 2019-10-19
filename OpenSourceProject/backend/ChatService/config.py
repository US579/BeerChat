from pymongo import MongoClient
def connectdb():
    connection = MongoClient('ds044907.mlab.com',44907,retryWrites = False)
    db = connection['opensourceproject']
    db.authenticate('cocacolasoap', 'LIjiachen0717')
    return db


Secret_Key = '0T\x93h\x7f\x88/\xc9\xf6\x10\x97o\xfa\x07\x111\xca\xf9\xd7\xbf\xd0J\xb8\xfb'