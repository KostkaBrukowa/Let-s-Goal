from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Playing_Field(models.Model):
    street = models.CharField(max_length=100)
    owner = models.CharField(max_length=100)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    price_per_hour = models.IntegerField(
        verbose_name='Price per hour', name='price_per_hour')


class Game(models.Model):
    name = models.CharField(max_length=50)
    date = models.DateTimeField('When a game starts', 'date')
    players_number = models.IntegerField(
        verbose_name='Number of players', name='players_number')
    players = models.ManyToManyField(User, blank=True)
    playing_field = models.ForeignKey(Playing_Field, on_delete=models.CASCADE)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='owned_games', )
