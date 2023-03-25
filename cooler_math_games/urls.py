from django.urls import path, include

from . import views

app_name = 'cooler_math_games'
urlpatterns = [
    path('home/', views.home, name='home'),
    path('accounts/', include('django.contrib.auth.urls')),
    path('signup/', views.SignUp.as_view(), name='signup'),
    path('Avoid/', views.avoid_game, name='Avoid'),
    path('Flappy/', views.flappy, name='Flappy'),
    path('Mines/', views.mines, name='Mines'),
    path('2048/', views.game_2048, name='2048'),
    path('game_end/<int:score>/<str:game_name>/', views.game_end, name='game_end'),  # todo only allows you to save scores to a default user right now
]
