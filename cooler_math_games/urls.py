from django.urls import path

from . import views

app_name = 'cooler_math_games'
urlpatterns = [
    path('home', views.home, name='home'),
    path('login', views.login, name='login'),
    path('avoid/<str:username>', views.avoid_game, name='avoid'),  # todo this is extremely insecure and will need to be changed
    path('game_end/<int:score>/<str:game_name>', views.game_end, name='game_end')  # todo only allows you to save scores to a default user right now
]
