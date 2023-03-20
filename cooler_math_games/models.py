from django.db import models
from django.utils.timezone import now


# todo add encryption
class User(models.Model):
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=20)

    def __str__(self):
        return f'{self.username}: '.join(['*' for i in range(len(str(self.password)))])


class Game(models.Model):
    name = models.CharField(max_length=20)
    author = models.CharField(max_length=20)
    number_of_active_players = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.name} by {self.author} currently has {self.number_of_active_players} active players'


class GameScore(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    date_obtained = models.DateField(default=now())

    def __str__(self):
        return f'{self.user} obtained a score of {self.score} in {self.game} on {self.date_obtained}'
