from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.core.validators import MinValueValidator


class UserDetails(models.Model):
    created_events_number = models.IntegerField(
        default=0, validators=(MinValueValidator(0),), null=False)
    joined_events_number = models.IntegerField(
        default=0, validators=(MinValueValidator(0),), null=False)
    birth_date = models.DateField(null=True)
    address = models.CharField(max_length=50, null=True)
    prefered_position = models.CharField(max_length=50, null=True)
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='details')
    first_name = models.CharField(max_length=30, null=True)
    last_name = models.CharField(max_length=30, null=True)


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
        UserDetails.objects.create(user=instance)
