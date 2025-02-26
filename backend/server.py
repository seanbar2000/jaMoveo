from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from api_handlers.main_page_api import router as web_socket_router
from api_handlers.user_auth_api import router as user_auth_router
import appSetUp

app = FastAPI()
app.include_router(web_socket_router, prefix="/main", tags=["web_socket"])
app.include_router(user_auth_router, prefix="/user", tags=["user_authentication"])
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (Change this in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)


def start_server():
    # print('Starting Server...')       

    uvicorn.run(
        app,
        host="localhost",
        port=8080,
        log_level="debug",
    )
    # webbrowser.open("http://localhost:8080")

if __name__ == "__main__":
    appSetUp.update_db()
    start_server()