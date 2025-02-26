import json
from mongo_db_connection import mongo_connection
from modules.song import Song
def get_song(songName: str)-> dict|None:
    try:
    
        with open(f"songs_jsons/{songName}", "r", encoding="utf-8") as song_json:
           song_dict =  json.load(song_json)
        return song_dict
    
    except FileNotFoundError:
        print("file not found")
        return None
    
def get_song_by_file_name(song_file_name: str)->Song:
    songs = mongo_connection.get_all_songs()
    for song in songs:
        if song["karaoke_file_name"] == song_file_name:
            return Song.model_validate(song)

def search_song(songName: str)->dict:
    search_result = {"songs": []}
    song_list = get_songs_list()

    for song in song_list: 
        if songName.lower() in song.name.lower():
            search_result["songs"].append(song)

    return search_result

def get_songs_list():
    songs = mongo_connection.get_all_songs()
    songs_list: list[Song] = [Song.model_validate(song) for song in songs]
    return songs_list

def generate_message_dict(song_data: dict, song_file_name: str, action: str)->dict:
    result_dict = dict()
    result_dict["song"] = get_song_by_file_name(song_file_name).model_dump_json()
    result_dict["songData"] = song_data
    result_dict["action"] = action
    return result_dict
