from fastapi import APIRouter, HTTPException, Body
from services import user_auth_service
router = APIRouter()


@router.post("/login")
def login_to_site(username: str|None = Body(embed=True, default=None), password: str|None = Body(embed=True, default=None)):
    returned_user = user_auth_service.authenticate_login(username, password)
    if returned_user is None:
        raise HTTPException(status_code=404, detail="Item not found") 
    print(returned_user)
    return returned_user

@router.post("/sign-up")
def sign_up_to_site(username: str|None = Body(embed=True, default=None), password: str|None = Body(embed=True, default=None), instrument: str|None = Body(embed=True, default=None), admin: bool = Body(embed=True, default=None)):
    
    if username == "" or password == "" or instrument == "":
        raise HTTPException(status_code=400, detail="bad request")
    
    if user_auth_service.user_exists(username) == True:
        raise HTTPException(status_code=409, detail="user name in use")
    
    added_user = user_auth_service.sign_up(username, password, instrument, admin)
    return added_user
