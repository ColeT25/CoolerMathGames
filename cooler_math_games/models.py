from django.db import models


# todo add encryption, this is pretty horribly insecure right now
class User(models.Model):
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=20)

    def __str__(self):
        password_str = '*' * len(str(self.password))
        return f'{self.username}: {password_str}'


class Game(models.Model):
    name = models.CharField(max_length=20)
    author = models.CharField(max_length=20)
    total_plays = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.name} by {self.author} currently has {self.total_plays} total plays'


class GameScore(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    date_obtained = models.DateField()

    def __str__(self):
        return f'{self.user} obtained a score of {self.score} in {self.game} on {self.date_obtained}'
