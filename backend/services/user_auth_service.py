from modules.user import User
from mongo_db_connection import mongo_connection

def authenticate_login(user_name: str, password: str)-> User|None:
    """
    Checks if a user exists with this user name,
    if the password received is the same as the users returns the user.
    If not returns none 
    """
    user_from_db_dict = mongo_connection.get_user(user_name)
    
    if user_from_db_dict is None:
        return user_from_db_dict
    
    del user_from_db_dict['_id']
    user_from_db = User.model_validate(user_from_db_dict)
    
    if user_from_db.password == password:
        return user_from_db

def sign_up(user_name: str, password: str, instrument: str, admin: bool)-> User:
    generated_user = User(username= user_name, password=password, instrument=instrument, admin=admin)
    mongo_connection.add_user(generated_user.model_dump())
    return generated_user

def user_exists(user_name)->bool:
    user_from_db_dict = mongo_connection.get_user(user_name)

    if user_from_db_dict is None:
        return False
    return True