from django.urls import path, include

from . import views

app_name = 'cooler_math_games'
urlpatterns = [
    path('home/', views.home, name='home'),
    path('accounts/', include('django.contrib.auth.urls')),
    path('signup/', views.SignUp.as_view(), name='signup'),
    path('Flappy/', views.flappy, name='Flappy'),
    path('Mines/', views.mines, name='Mines'),
    path('Catcher/', views.catcher, name='Catcher'),
    path('2048/', views.game_2048, name='2048'),
    path('Hangman/', views.hangman, name='Hangman'),
    path('PhaserTest/', views.phaser_test, name='PhaserTest'),
    path('game_end/<int:score>/<str:game_name>/', views.game_end, name='game_end'),
    path('leaderboards/<str:games_or_user>/', views.leaderboards, name='leaderboards')
]
