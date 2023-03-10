# Generated by Django 4.1.7 on 2023-03-07 15:29

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
                ('author', models.CharField(max_length=20)),
                ('number_of_active_players', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=20)),
                ('password', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='GameScores',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score', models.IntegerField(default=0)),
                ('date_obtained', models.DateField(default=datetime.datetime(2023, 3, 7, 10, 29, 3, 94555))),
                ('game', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cooler_math_games.game')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cooler_math_games.user')),
            ],
        ),
    ]
