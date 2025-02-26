from pymongo import MongoClient

class DBConnection:
    def __init__(self):
        self.client = None
        self.db = None

    def establish_connection(self, collection_name: str)-> bool:
        try:
            self.client = MongoClient('mongodb://localhost:27017/')
            self.db = self.client['webSiteDBTest']
            self.collection = self.db[collection_name]
            return True
        except ConnectionError:
            print(ConnectionError)
            return False

    def close_connection(self):
        self.client.close()
        self.db = None
        self.collection = None

    def add_user(self, generated_user: dict)->bool:
        if self.establish_connection('users_collection'):
            self.collection.insert_one(generated_user)
            self.close_connection()
            return True
        return False

    def get_user(self, user_name: str)->dict|None:
        self.establish_connection('users_collection')
        user = self.collection.find_one({"username": user_name})
        self.close_connection()
        return user

    def add_song(self, song):
        self.establish_connection('songs_collection')
        self.collection.insert_one(song)
        self.close_connection()

    def get_all_songs(self)->dict:
        self.establish_connection('songs_collection')
        songs = list((self.collection.find({})))
        self.close_connection()
        return songs

mongo_connection = DBConnection()