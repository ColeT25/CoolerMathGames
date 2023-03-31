from django.shortcuts import render, HttpResponseRedirect
from django.utils.timezone import now
from django.urls import reverse_lazy
from django.contrib.auth.forms import UserCreationForm
from django.views.generic.edit import CreateView

from .models import Game, GameScore
from .forms import SaveScoreForm


class SignUp(CreateView):
    """
    View class to allow users to sign up for an account to track their scores
    """
    form_class = UserCreationForm
    success_url = reverse_lazy('cooler_math_games:login')
    template_name = 'registration/signup.html'


def home(request):
    """
    The home page for cooler math games
    """
    all_games = Game.objects.order_by('-total_plays')  # get all games in descending order of plays
    game_urls = []
    for game in all_games:
        game_urls.append(
            f'http://127.0.0.1:8000/games/{game.name}/')  # if we ever run this on a real server we will need to change the url a bit
    return render(request, 'cooler_math_games/home.html', {'top_games': all_games, 'game_urls': game_urls})


def game_end(request, score, game_name):
    """
    score saving page for cooler math games
    :param request: http request
    :param score: The score of the game played
    :param game_name: The name of the game played
    """
    if request.method == 'POST':  # if the form is submitted save the score to the db and go home
        form = SaveScoreForm(request.POST)
        print(form.data)
        game = Game.objects.get(name=game_name)
        if request.user.is_authenticated:
            user = request.user.username
        else:
            user = 'guest'
        GameScore.objects.create(user=user, game=game, score=score, date_obtained=now())
        return HttpResponseRedirect('/games/home/')  # todo may add a play again type of page
    else:  # fill out form with game score data
        form = SaveScoreForm()
        if request.user.is_authenticated:
            form.fields['user'].initial = request.user.username
        else:
            form.fields['user'].initial = 'guest'
        form.fields['score'].initial = score
        form.fields['game'].initial = game_name
    return render(request, 'cooler_math_games/game_end.html', {'form': form, 'game': game_name, 'score': score})


def leaderboards(request, games):
    """
    Leaderboard view for coolermath games
    :param request: http request
    :param games: names of games seperated by spaces, if you want all games just make this "all"
    """
    if games == 'all': # todo add specific logic for specific games so you can customize leaderboards viewed
        games = Game.objects.all()
    # else games is specific games to display leaderboard for

    # get data on the top 10 scores for each applicable game
    leader_boards = {}
    for game in games:
        top_10_scores_for_game = GameScore.objects.filter(game=game).order_by('-score')[:10]
        formatted_game_scores = []
        for game_score in top_10_scores_for_game:
            formatted_game_scores.append({'score': game_score.score, 'user': game_score.user, 'time': game_score.date_obtained})
        leader_boards[game.name] = formatted_game_scores
    return render(request, 'cooler_math_games/leaderboards.html', {'leader_boards': leader_boards})


# PUT GAME VIEWS BELOW HERE
def get_view_context(request):
    """
    Function to get the authenticated username of the current user, or assign them as a guest

    :param request: the http request
    :return: the context to render a game view with the username
    """
    context = {'user': ''}
    if request.user.is_authenticated:
        context['user'] = request.user.username
    else:
        context['user'] = 'guest'
    return context


def avoid_game(request):
    """
    The test avoid game view
    """
    avoid_game_db = Game.objects.get(name='avoid')
    avoid_game_db.total_plays += 1
    avoid_game_db.save()

    return render(request, 'cooler_math_games/avoid_game.html', get_view_context(request))


def flappy(request):
    """
    The flappy game view
    """
    flappy_game_db = Game.objects.get(name='flappy')
    flappy_game_db.total_plays += 1
    flappy_game_db.save()
    return render(request, 'cooler_math_games/flappy.html', get_view_context(request))


def mines(request):
    """
    The minesweeper game view
    """
    mines_game_db = Game.objects.get(name='mines')
    mines_game_db.total_plays += 1
    mines_game_db.save()
    return render(request, 'cooler_math_games/mines.html', get_view_context(request))


def catcher(request):
    """
    The Catcher game view
    """
    # todo right now the user is always anon, will be changed in the future
    catcher_game_db = Game.objects.get(name='catcher')
    catcher_game_db.total_plays += 1
    catcher_game_db.save()
    return render(request, 'cooler_math_games/catcher.html', get_view_context(request))


def game_2048(request):
    """
    The 2048 game view
    """
    game_2048_db = Game.objects.get(name='2048')
    game_2048_db.total_plays += 1
    game_2048_db.save()
    return render(request, 'cooler_math_games/2048.html', get_view_context(request))


def phaser_test(request):
    """
    The test phaser game view
    """
    phaser_game_db = Game.objects.get(name='phasertest')
    phaser_game_db.total_plays += 1
    phaser_game_db.save()
    return render(request, 'cooler_math_games/phaser_test.html', get_view_context(request))


def hangman(request):
    """
    The hangman game view
    """
    hangman_db = Game.objects.get(name='hangman')
    hangman_db.total_plays += 1
    hangman_db.save()
    return render(request, 'cooler_math_games/hangman.html', get_view_context(request))
