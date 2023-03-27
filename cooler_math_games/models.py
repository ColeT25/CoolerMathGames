from django.db import models


class Game(models.Model):
    name = models.CharField(max_length=20)
    author = models.CharField(max_length=20)
    total_plays = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.name} by {self.author} currently has {self.total_plays} total plays'


class GameScore(models.Model):
    user = models.CharField(max_length=20)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    date_obtained = models.DateField()

    def __str__(self):
        return f'{self.user} obtained a score of {self.score} in {self.game} on {self.date_obtained}'
