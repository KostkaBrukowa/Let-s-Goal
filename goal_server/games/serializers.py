from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Playing_Field, Game


class PlayingFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playing_Field
        fields = ('__all__')


class GameSerializer(serializers.ModelSerializer):
    playing_field = serializers.PrimaryKeyRelatedField(
        many=False, queryset=Playing_Field.objects.all())
    players = serializers.PrimaryKeyRelatedField(
        many=True, queryset=User.objects.all(), required=False)
    owner = serializers.PrimaryKeyRelatedField(
        many=False, queryset=User.objects.all(), required=False)

    class Meta:
        model = Game
        fields = ('__all__')


class LatLngSerializer(serializers.Serializer):
    longitude = serializers.DecimalField(max_digits=9, decimal_places=6)
    latitude = serializers.DecimalField(max_digits=9, decimal_places=6)


class UniqueNameSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=50)


class UsernameSerializer(serializers.Serializer):
    username = serializers.CharField()

    def validate(self, data):
        if not User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError('Username does not exists')

        return data
