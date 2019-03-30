from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from .models import UserDetails


class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetails
        fields = '__all__'
        read_only_fields = ('created_events_number',
                            'joined_events_number', 'user')


class ExtraDetailsTokenSerializer(serializers.ModelSerializer):
    """
    serializer for token model. Created because login and registration 
    uses this serializer to return a token to user and i want to return 
    some more information
    """

    class Meta:
        model = Token
        fields = ('key', 'user')
