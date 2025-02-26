from pydantic import BaseModel

class Song(BaseModel):
    name: str
    artist: str
    karaoke_file_name: str
    image_url: str
    language: str
