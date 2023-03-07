from django.contrib import admin

from .models import User, Game, GameScores

admin.site.register(User)
admin.site.register(Game)
admin.site.register(GameScores)



# Register your models here.
