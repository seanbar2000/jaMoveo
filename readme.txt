open terminal from jaMoveo folder.

Firstly run the command:
docker-compose up -d

activate server:
run-
cd backend
#activate venv
.\.venv\Scripts\Activate.ps1

#install libs
pip install --no-cache-dir -r requirements.txt

#run server
python server.py

then go back to the jaMoveo terminal with:
cd ..

and then to run the website:
run in the terminal

cd frontend/app

and then run npm start

how to create a regular user:
after running the app you will go to the login page.
There you will have the option to click the sign up button
which will lead you to the registration page.
you need to enter a unique username, password and instrument.
if you want your user to be an admin just check the admin box.