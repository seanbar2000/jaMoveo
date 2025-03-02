from pymongo import MongoClient
import json

class DBConnection:
    def __init__(self):
        self.client = None
        self.db = None
        self.initialize_db()
    
    
    def establish_connection(self, collection_name: str)-> bool:
        try:
            self.client = MongoClient('mongodb://mongo:27017/')
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

  
    def add_song(self, song: dict):
        self.establish_connection('songs_collection')
        print("adding:")
        print(song)
        self.collection.insert_one(song)
        self.close_connection()

   
    def get_songs_by_value(self, search_json)->list|None:
        self.establish_connection('songs_collection')
        songs = list(self.collection.find(search_json))
        self.close_connection()
        return songs


    def initialize_db(self):
        """
        initializes the data in the db
        by opening a collectopn for songs and adds all the hard codded songs
        """
        try:
            with open("songs_jsons/songs.json", "r") as songs:
                songs_dict = json.load(songs)
                for song in songs_dict:
                    self.add_song(song)

        except:
            print("couldn't open file")

mongo_connection = DBConnection()