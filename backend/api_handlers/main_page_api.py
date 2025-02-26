from fastapi import APIRouter, HTTPException
from fastapi import Body, WebSocket, WebSocketDisconnect
from services import main_page_service
import json


router = APIRouter()
connected_clients: list[WebSocket] = []
message_dict = dict()
# Set to store active WebSocket connections

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    global connected_clients
    # Accept the connection from the client
    await websocket.accept()
    
    # Add the client to the list of connected clients
    connected_clients.append(websocket)
    
    try:
        while True:
            # Wait for a message from the client (you can handle it here)
            data = await websocket.receive_text()
            print(f"Received message from client: {data}")
            
            # Optionally, you can send a response to the client that sent the message
            await websocket.send_text(f"Message received: {data}")
    
    except WebSocketDisconnect:
        # Remove client from the list when disconnected
        connected_clients.remove(websocket)
        print("Client disconnected.")

# Function to broadcast a message to all connected clients
async def broadcast_message(message: str):
    global connected_clients

    for client in connected_clients:
        try:
            await client.send_text(message)
        except WebSocketDisconnect:
            # Remove client if they disconnect while we're trying to send a message
            connected_clients.remove(client)


@router.post("/search")
def search_song(songName: str|None = Body(embed=True, default=None)):
    song_dict = main_page_service.search_song(songName)
    
    if song_dict["songs"] == []:
        raise HTTPException(status_code=404, detail="not found!")    
    return song_dict

@router.get("/search/{song_file_name}")
async def get_song(song_file_name: str):
    global message_dict

    song_dict = main_page_service.get_song(song_file_name)

    if song_dict is None:
        raise HTTPException(status_code=404, detail="not found!")
    
    message_dict = main_page_service.generate_message_dict(song_dict, song_file_name, "song picked")
    await broadcast_message(json.dumps(message_dict))
    return song_dict

@router.get("/quit")
async def quit_live_session():
    await broadcast_message("quit")
