from django.shortcuts import render, HttpResponseRedirect
from django.utils.timezone import now
from django.urls import reverse_lazy
from django.contrib.auth.forms import UserCreationForm
from django.views.generic.edit import CreateView

from .models import Game, GameScore
from .forms import SaveScoreForm


class SignUp(CreateView):
    form_class = UserCreationForm
    success_url = reverse_lazy('cooler_math_games:login')
    template_name = 'registration/signup.html'


# home page for cooler math games
def home(request):
    all_games = Game.objects.order_by('-total_plays')
    game_urls = []
    # todo if we ever run this on a real server we will need to change the url a bit
    for game in all_games:
        game_urls.append(f'http://127.0.0.1:8000/games/{game.name}/')
    return render(request, 'cooler_math_games/home.html', {'top_games': all_games, 'game_urls': game_urls})


# score saving page for cooler math games
def game_end(request, score, game_name):
    if request.method == 'POST':
        form = SaveScoreForm(request.POST)
        if form.is_valid():
            # todo need to add code to ensure queries return real results
            game = Game.objects.get(name=form.cleaned_data['game'])
            if request.user.is_authenticated:
                user = request.user.username
            else:
                user = 'guest'
            GameScore.objects.create(user=user, game=game, score=form.cleaned_data['score'], date_obtained=now())
            return HttpResponseRedirect('/games/home/')  # todo probably want a play again type of page here instead of just going home
    else:
        form = SaveScoreForm()
        if request.user.is_authenticated:
            form.fields['user'].initial = request.user.username
        else:
            form.fields['user'].initial = 'guest'
        form.fields['score'].initial = score
        form.fields['game'].initial = game_name
    return render(request, 'cooler_math_games/game_end.html', {'form': form})


# PUT GAME VIEWS BELOW HERE

def avoid_game(request):
    avoid_game_db = Game.objects.get(name='avoid')
    avoid_game_db.total_plays += 1
    avoid_game_db.save()
    context = {'user': ''}
    if request.user.is_authenticated:
        context['user'] = request.user.username
    else:
        context['user'] = 'guest'
    return render(request, 'cooler_math_games/avoid_game.html', context)


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

def game_2048(request):
    # todo right now the user is always anon, will be changed in the future
    game_2048_db = Game.objects.get(name='2048')
    game_2048_db.total_plays += 1
    game_2048_db.save()
    return render(request, 'cooler_math_games/2048.html', {'user': 'anon'})
