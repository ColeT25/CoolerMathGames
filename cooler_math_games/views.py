from django.shortcuts import render

from .models import Game
from .forms import LoginForm, SaveScoreForm


# home page for cooler math games
def home(request):
    top_5_games = Game.objects.order_by('-number_of_active_players')[:5]
    return render(request, 'cooler_math_games/home.html', {'top_games': top_5_games})


# login page for cooler math games
def login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            # todo actually login
            print('hello_there')
    else:
        form = LoginForm()
    return render(request, 'cooler_math_games/login.html', {'form': form})


# score saving page for cooler math games
def game_end(request, score, game_name):
    if request.method == 'POST':
        form = SaveScoreForm(request.POST)
        if form.is_valid():
            # todo actually save scores
            print('save scores here')
    else:
        form = SaveScoreForm()
        form.fields['user'].initial = 'Anon'  # todo will eventually be a real user
        form.fields['score'].initial = score
        form.fields['game'].initial = game_name
    return render(request, 'cooler_math_games/game_end.html', {'form': form})


# PUT GAME VIEWS BELOW HERE


def avoid_game(request, username):
    # todo the username doesn't do much right now, since this is just a test game
    return render(request, 'cooler_math_games/avoid_game.html', {'user': username})
