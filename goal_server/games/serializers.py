from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Playing_Field, Game


class PlayingFieldSerializer(serializers.ModelSerializer):

    class Meta:
        model = Playing_Field
        fields = ('__all__')


class GameSerializer(serializers.ModelSerializer):
    playing_field = serializers.PrimaryKeyRelatedField(many=False, queryset=Playing_Field.objects.all())
    players = serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all())

    class Meta:
        model = Game
        fields = ('__all__')

class NearGamesSerializer(serializers.Serializer):
    longitude = serializers.DecimalField(max_digits=9, decimal_places=6)
    latitude = serializers.DecimalField(max_digits=9, decimal_places=6)
    radius_km = serializers.FloatField(min_value=0, max_value=20000)
    