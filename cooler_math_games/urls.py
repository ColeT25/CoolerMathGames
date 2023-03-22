from django.urls import path

from . import views

app_name = 'cooler_math_games'
urlpatterns = [
    path('home/', views.home, name='home'),
    path('login/', views.login, name='login'),
    path('Avoid/', views.avoid_game, name='Avoid'),
    path('Flappy/', views.flappy, name='Flappy'),
    path('game_end/<int:score>/<str:game_name>/', views.game_end, name='game_end'),  # todo only allows you to save scores to a default user right now
]
