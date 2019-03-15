from rest_framework import serializers
from django.contrib.auth.models import User

from .models import UserDetails


class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetails
        fields = '__all__'
        read_only_fields = ('created_events_number',
                            'joined_events_number', 'user')
