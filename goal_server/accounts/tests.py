from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase
from django.utils import timezone
# from datetime import datetime
import datetime

from games.models import Game, Playing_Field, Game
from games.tests import create_game
from .models import UserDetails
from django.contrib.auth.models import User

# Create your tests here.


class UserDetailsTests(APITestCase):
    def setUp(self):
        User.objects.create_user('Alex', 'alex@gmail.com', 'password')
        User.objects.create_user('Bob', 'bob@gmail.com', 'password')

        fields = [(10, 10, 'Koszykowa')]

        self.field1 = Playing_Field.objects.create(
            street=fields[0][2], owner='MOSIR', latitude=fields[0][0], longitude=fields[0][1], price_per_hour=100)

        self.user = self.client.login(username='Alex', password='password')
        self.client.force_authenticate(user=User.objects.get(pk=1))

    def test_list_user_details(self):
        """Cannot list all user details - should return an error"""
        response = self.client.get('/accounts/details/')

        self.assertEqual(response.status_code,
                         status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_get_update_user_details_if_owner(self):
        """testing that user can update game if he's an owner"""
        birth_date = '2001-10-11'
        prefered_position = 'napastnik'
        data = {
            'birth_date': birth_date,
            'prefered_position': prefered_position
        }

        request = self.client.put(
            '/accounts/details/1/', data=data, format='json')

        user = User.objects.get(pk=1)
        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(user.details.birth_date, datetime.date(2001, 10, 11))
        self.assertEqual(
            user.details.prefered_position, prefered_position)

    def test_update_user_details_if_not_an_owner(self):
        """testing for unauthorised editing - if user does not own the details model"""
        birth_date = '2001-10-11'
        prefered_position = 'napastnik'
        data = {
            'birth_date': birth_date,
            'prefered_position': prefered_position
        }
        User.objects.create_user(
            'test_name', 'test_email@gmail.com', 'password')

        request = self.client.put(
            '/accounts/details/2/', data=data, format='json')
        self.assertEqual(request.status_code, status.HTTP_403_FORBIDDEN)

    def test_created_events(self):
        """Testing the increasing of creatend game count of the player when
            creating new game """
        game = {
            'name': 'test_name',
            'date': timezone.now(),
            'players_number': 5,
            'playing_field': 1,
        }

        response = self.client.post('/games/', data=game, format='json')

        user = User.objects.get(pk=1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(user.details.created_events_number, 1)

    def test_joined_events(self):
        """Test if joining games increases counter of joined games"""
        game = create_game('test_game')

        request = self.client.put('/games/1/join_game/')

        user = User.objects.get(pk=1)
        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(user.details.joined_events_number, 1)

    def test_remove_game(self):
        '''test if all user details are updated afted removing a game'''
        game = create_game("test_game", players=[
            1, 2], owner=User.objects.get(pk=1))
        print(game.players.first())
        owner = User.objects.get(pk=1).details
        joinee = User.objects.get(pk=2).details
        prev_owner_created_count = owner.created_events_number
        prev_owner_joined_count = owner.joined_events_number
        prev_joinee_created_count = joinee.created_events_number
        prev_joinee_joined_count = joinee.joined_events_number

        Game.objects.get(pk=1).delete()

        owner = User.objects.get(pk=1).details
        joinee = User.objects.get(pk=2).details
        self.assertEqual(owner.created_events_number,
                         prev_owner_created_count - 1)
        self.assertEqual(owner.joined_events_number,
                         prev_owner_joined_count)
        self.assertEqual(joinee.created_events_number,
                         prev_joinee_created_count)
        self.assertEqual(joinee.joined_events_number,
                         prev_joinee_joined_count - 1)
