# CoolerMathGames
More information will be added to this readme as development continues
THIS IS ALL ONLY TESTED ON WINDOWS RIGHT NOW, SO IT MAY BE DIFFERENT ON MAC I AM NOT SURE I'M SORRY, I AM ALSO GOING TO ADD MORE COMMENTS TO THE CODE SO IT IS EASIER TO NAVIGATE

# Running CoolerMathGames locally

## 1. Checkout the CoolerMathGames repo to your machine
- There are multiple ways to do this, whatever way you prefer will work as long as there is a local copy of this repo on your computer
## 2. Create virtual environment for python 3.11.0
- Make sure you have python 3.11.0 installed on your system
  - The install for this can be found [here](https://www.python.org/downloads/release/python-3110/)
- Open up command line, and run the command `python -m venv "C:\path_to_your_virtual_envs_folder"`
  - If this does not work, try `C:\path_to_python_3.11\python.exe -m venv "C:\path_to_your_virtual_envs_folder"`
- Next run the command `C:\path_to_your_venv\Scripts\python.exe -m pip install --upgrade pip`
- Finally, run the command `C:\path_to_your_venv\Scripts\python.exe -m pip install -r "C:\path_to_local_coolermathgames\requirements.txt"`

## 3. Run CoolerMathGames on a local development server
- Run the command `C:\<path_to_your_venv\Scripts\python.exe C:\path_to_cooler_math_games\manage.py`
- Then, go to `http://127.0.0.1:8000/games/home/`. This should be the home page of cooler math games!
- You can check out a test game I made by going to: `http://127.0.0.1:8000/games/avoid/user/`, don't expect much out of this though lol
- When you are ready to do admin things, move on to the next step!

## 4. Modify the database in order to add a game, user, or score
- Now that you have CoolerMathGames running locally on a development server, go to `http://127.0.0.1:8000/admin`
- The login information is:
  - Username: Admin
  - Password: Password
  - Just pretend it's secure no one will know ;)
- Now if you click on Games, you can easily add a game to the database! This should be the first thing you do whenever you add a game to CoolerMathGames
- You can also do this for Game Scores, or Users to easily add things to the database
- **You may want to backup the database when you make changes, I am not sure how nice a sqlite database plays with github**

# Cheat sheet to help you add games

#
