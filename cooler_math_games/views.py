from django.shortcuts import render, HttpResponseRedirect
from django.utils.timezone import now

from .models import Game, GameScore, User
from .forms import LoginForm, SaveScoreForm


def home(request):
    """
    This view is the home page

    :param request: The http request
    :return: The rendered template for the home page
    """
    top_5_games = Game.objects.order_by('-total_plays')[:5]  # get the top 5 games from the database
    game_urls = []
    # todo if we ever run this on a real server we will need to change the url a bit
    for game in top_5_games:
        game_urls.append(f'http://127.0.0.1:8000/games/{game.name}/') # get urls for the top 5 games
    return render(request, 'cooler_math_games/home.html', {'top_games': top_5_games, 'game_urls': game_urls})


def login(request):
    """
    This view is for the login page

    :param request: The http request
    :return: The rendered template for the login page
    """
    if request.method == 'POST':
        # if the http request is a POST request, fill form with previous inputs and process if valid
        form = LoginForm(request.POST)
        if form.is_valid():
            # todo actually login
            print('hello_there')
    else:
        # generate form
        form = LoginForm()
    return render(request, 'cooler_math_games/login.html', {'form': form})


def game_end(request, score, game_name):
    """
    This view is for when a game ends

    :param request: The http request
    :param score: The score from the previous game
    :param game_name: The name of the game previously played
    :return: The rendered game end template with the input data
    """
    if request.method == 'POST':
        # if the http request is a POST request, fill form with previous inputs and process if valid
        form = SaveScoreForm(request.POST)
        if form.is_valid():
            # todo need to add code to ensure queries return real results
            game = Game.objects.get(name=form.cleaned_data['game'])
            user = User.objects.get(username=form.cleaned_data['user'])

            # add score to database and redirect to home
            GameScore.objects.create(user=user, game=game, score=form.cleaned_data['score'], date_obtained=now())
            return HttpResponseRedirect('/games/home/')  # todo probably want a play again type of page here instead of just going home
    else:
        # fill form with input data
        form = SaveScoreForm()
        form.fields['user'].initial = 'Anon'  # todo will eventually be a real user
        form.fields['score'].initial = score
        form.fields['game'].initial = game_name
    return render(request, 'cooler_math_games/game_end.html', {'form': form})


# PUT GAME VIEWS BELOW HERE


def avoid_game(request):
    """
    view for the avoid game (JUST A TEST GAME)

    :param request: http request
    :return: the rendered avoid game template
    """
    # todo right now the user is always anon, will be changed in the future

    # update the total times the avoid game is played
    avoid_game_db = Game.objects.get(name='avoid')
    avoid_game_db.total_plays += 1
    avoid_game_db.save()
    return render(request, 'cooler_math_games/avoid_game.html', {'user': 'anon'})
