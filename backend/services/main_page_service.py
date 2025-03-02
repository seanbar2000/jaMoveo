import json
from mongo_db_connection import mongo_connection
from modules.song import Song


def get_song_file_contents(song_name: str)-> dict|None:
    try:
        with open(f"songs_jsons/{song_name}", "r", encoding="utf-8") as song_json:
           song_dict =  json.load(song_json)
        return song_dict
    
    except FileNotFoundError:
        print("file not found")
        return None
    
def get_song_by_file_name(song_file_name: str)->Song|None:
    """
    checks if song with song_file_name exists.
    returns a song model/None
    """
    try:
        songs = mongo_connection.get_songs_by_value({"karaoke_file_name": song_file_name})
        return Song.model_validate(songs[0])
    except:
        return None

def search_song(song_name: str)->dict:
    """
    searches the songs in the db
    """
    search_result = {"songs": []}
    song_list = get_songs_list()

    for song in song_list: 
        if song_name.lower() in song.name.lower():
            search_result["songs"].append(song)

    return search_result

def get_songs_list():
    songs = mongo_connection.get_songs_by_value({})
    songs_list: list[Song] = [Song.model_validate(song) for song in songs]
    return songs_list

def generate_message_dict(song_data: dict, song_file_name: str, action: str)->dict:
    result_dict = dict()
    song_name = get_song_by_file_name(song_file_name)
    print(song_name)
    result_dict["song"] = song_name.model_dump_json()
    result_dict["songData"] = song_data
    result_dict["action"] = action
    return result_dict
