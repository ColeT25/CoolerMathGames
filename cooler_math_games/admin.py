from django.contrib import admin

from .models import User, Game, GameScore

admin.site.register(User)
admin.site.register(Game)
admin.site.register(GameScore)
