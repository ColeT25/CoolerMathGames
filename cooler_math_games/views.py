from django.shortcuts import render

from .models import Game


# Create your views here.

# home page for cooler math games
def home(request):
    top_5_games = Game.objects.order_by('-number_of_active_players')[:5]
    return render(request, 'cooler_math_games/home.html', {'top_games': top_5_games})
