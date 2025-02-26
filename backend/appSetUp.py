import json
from mongo_db_connection import mongo_connection

def update_db():
    try:
        with open("songs_jsons/songs.json", "r") as songs:
            songs_dict = json.load(songs)
            for song in songs_dict:
                mongo_connection.add_song(song)

    except:
        pass