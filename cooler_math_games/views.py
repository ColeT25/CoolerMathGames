from django.shortcuts import render, HttpResponseRedirect
from django.utils.timezone import now
from django.urls import reverse_lazy
from django.contrib.auth.forms import UserCreationForm
from django.views.generic.edit import CreateView

from .models import Game, GameScore, User
from .forms import SaveScoreForm


class SignUp(CreateView):
    form_class = UserCreationForm
    success_url = reverse_lazy('cooler_math_games:login')
    template_name = 'registration/signup.html'

# home page for cooler math games
def home(request):
    top_5_games = Game.objects.order_by('-total_plays')[:5]
    game_urls = []
    # todo if we ever run this on a real server we will need to change the url a bit
    for game in top_5_games:
        game_urls.append(f'http://127.0.0.1:8000/games/{game.name}/')
    return render(request, 'cooler_math_games/home.html', {'top_games': top_5_games, 'game_urls': game_urls})


# score saving page for cooler math games
def game_end(request, score, game_name):
    if request.method == 'POST':
        form = SaveScoreForm(request.POST)
        if form.is_valid():
            # todo need to add code to ensure queries return real results
            game = Game.objects.get(name=form.cleaned_data['game'])
            user = User.objects.get(username=form.cleaned_data['user'])
            GameScore.objects.create(user=user, game=game, score=form.cleaned_data['score'], date_obtained=now())
            return HttpResponseRedirect('/games/home/')  # todo probably want a play again type of page here instead of just going home
    else:
        form = SaveScoreForm()
        form.fields['user'].initial = 'Anon'  # todo will eventually be a real user
        form.fields['score'].initial = score
        form.fields['game'].initial = game_name
    return render(request, 'cooler_math_games/game_end.html', {'form': form})





# PUT GAME VIEWS BELOW HERE


def avoid_game(request):
    # todo right now the user is always anon, will be changed in the future
    avoid_game_db = Game.objects.get(name='avoid')
    avoid_game_db.total_plays += 1
    avoid_game_db.save()
    return render(request, 'cooler_math_games/avoid_game.html', {'user': 'anon'})


def flappy(request):
    # todo right now the user is always anon, will be changed in the future
    flappy_game_db = Game.objects.get(name='flappy')
    flappy_game_db.total_plays += 1
    flappy_game_db.save()
    return render(request, 'cooler_math_games/flappy.html', {'user': 'anon'})

def mines(request):
    # todo right now the user is always anon, will be changed in the future
    mines_game_db = Game.objects.get(name='mines')
    mines_game_db.total_plays += 1
    mines_game_db.save()
    return render(request, 'cooler_math_games/mines.html', {'user': 'anon'})

def catcher(request):
    # todo right now the user is always anon, will be changed in the future
    catcher_game_db = Game.objects.get(name='catcher')
    catcher_game_db.total_plays += 1
    catcher_game_db.save()
    return render(request, 'cooler_math_games/catcher.html', {'user': 'anon'})
