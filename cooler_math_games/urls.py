from django.urls import path, include

from . import views

app_name = 'cooler_math_games'
urlpatterns = [
    path('home/', views.home, name='home'),
    path('accounts/', include('django.contrib.auth.urls')),
    path('signup/', views.SignUp.as_view(), name='signup'),
    path('Mines/', views.mines, name='Mines'),
    path('Catcher/', views.catcher, name='Catcher'),
    path('Tomato/', views.tomato, name='Tomato'),
    path('2048/', views.game_2048, name='2048'),
    path('2048Fibonacci/', views.game_2048_Fibonacci, name='2048Fibonacci'),
    path('Sudoku/', views.sudoku, name='Sudoku'),
    path('Hangman/', views.hangman, name='Hangman'),
    path('PhaserTest/', views.phaser_test, name='PhaserTest'),
    path('Climber/', views.climber, name='Climber'),
    path('credits/', views.credits, name='Credits'),
    path('game_end/<int:score>/<str:game_name>/', views.game_end, name='game_end'),
    path('leaderboards/<str:games_or_user>/', views.leaderboards, name='leaderboards')
]
