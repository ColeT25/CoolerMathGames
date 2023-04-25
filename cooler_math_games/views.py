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


def home_redirect_view(request):
    """
    Redirect the default page to the home cooler math games view
    """
    return HttpResponseRedirect('/games/home/')


def home(request):
    """
    The home page for cooler math games
    """
    all_games = Game.objects.order_by('-total_plays')  # get all games in descending order of plays
    game_urls = []
    for game in all_games:
        game_urls.append(
            f'http://127.0.0.1:8000/games/{game.name}/')  # todo if we ever run this on a real server we will need to change the url a bit
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
        return HttpResponseRedirect(f'/games/leaderboards/{game}')
    else:  # fill out form with game score data
        form = SaveScoreForm()
        if request.user.is_authenticated:
            form.fields['user'].initial = request.user.username
        else:
            form.fields['user'].initial = 'guest'
        form.fields['score'].initial = score
        form.fields['game'].initial = game_name
    return render(request, 'cooler_math_games/game_end.html', {'form': form, 'game': game_name, 'score': score})


def leaderboards(request, games_or_user):
    """
    Leaderboard view for coolermath games
    :param request: http request
    :param games_or_user: name of game, if you want all games just make this "all", if you want all games for the current user input current_user
    """
    if games_or_user in ('all', 'current_user'):
        games = Game.objects.all()
    else:
        # only get data on games requested
        games_requested = games_or_user.split(' ')
        games = Game.objects.filter(name__in=games_requested)

    # get data on the top 10 scores for each applicable game, or get all scores for a specific user
    leader_boards = {}
    for game in games:
        if games_or_user == 'current_user':
            if request.user.is_authenticated:
                scores_for_game = GameScore.objects.filter(game=game).filter(user=request.user.username).order_by('-score')
            else:
                scores_for_game = GameScore.objects.filter(game=game).filter(user='guest').order_by('-score')
        elif games_or_user == 'all':
            scores_for_game = GameScore.objects.filter(game=game).order_by('-score')[:10] # only get top 10 scores for each game
        else:
            scores_for_game = GameScore.objects.filter(game=game).order_by('-score')

        formatted_game_scores = []
        for game_score in scores_for_game:
            formatted_game_scores.append({'score': game_score.score, 'user': game_score.user, 'time': game_score.date_obtained})
        leader_boards[game.name] = formatted_game_scores
    return render(request, 'cooler_math_games/leaderboards.html', {'leader_boards': leader_boards})


# PUT GAME VIEWS BELOW HERE
def mines(request):
    """
    The minesweeper game view
    """
    mines_game_db = Game.objects.get(name='mines')
    mines_game_db.total_plays += 1
    mines_game_db.save()
    return render(request, 'cooler_math_games/mines.html')


def catcher(request):
    """
    The Catcher game view
    """
    catcher_game_db = Game.objects.get(name='catcher')
    catcher_game_db.total_plays += 1
    catcher_game_db.save()
    return render(request, 'cooler_math_games/catcher.html')


def game_2048(request):
    """
    The 2048 game view
    """
    game_2048_db = Game.objects.get(name='2048')
    game_2048_db.total_plays += 1
    game_2048_db.save()
    return render(request, 'cooler_math_games/2048.html')

def game_2048_Fibonacci(request):
    """
    The 2048 Fib game view
    """
    game_2048_fibonacci_db = Game.objects.get(name='2048Fibonacci')
    game_2048_fibonacci_db.total_plays += 1
    game_2048_fibonacci_db.save()
    return render(request, 'cooler_math_games/2048Fibonacci.html')

def climber(request):
    """
    The climber game view
    """
    climber_db = Game.objects.get(name='climber')
    climber_db.total_plays += 1
    climber_db.save()
    return render(request, 'cooler_math_games/climber.html')

def phaser_test(request):
    """
    The test phaser game view
    """
    phaser_game_db = Game.objects.get(name='phasertest')
    phaser_game_db.total_plays += 1
    phaser_game_db.save()
    return render(request, 'cooler_math_games/phaser_test.html')


def tomato(request):
    """
    The Tomato Dash game view
    """
    # todo right now the user is always anon, will be changed in the future
    tomato_game_db = Game.objects.get(name='tomato')
    tomato_game_db.total_plays += 1
    tomato_game_db.save()
    return render(request, 'cooler_math_games/tomato.html')


def hangman(request):
    """
    The hangman game view
    """
    hangman_db = Game.objects.get(name='hangman')
    hangman_db.total_plays += 1
    hangman_db.save()
    return render(request, 'cooler_math_games/hangman.html')

def sudoku(request):
    """
    The sudoku game view
    """
    sudoku_db = Game.objects.get(name='sudoku')
    sudoku_db.total_plays += 1
    sudoku_db.save()
    return render(request, 'cooler_math_games/sudoku.html')

def credits(request):
    """
    The credits view
    """
    return render(request, 'cooler_math_games/credits.html')
