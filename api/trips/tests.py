from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from django.contrib.auth.models import User


class PlaceTests(APITestCase):

    def test_get_places(self):
        url = reverse('place-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_no_login_create_place(self):
        url = reverse('place-list')
        data = {'name': 'McDonalds', 'description': 'fast food',
                'longitude': '0.1', 'latitude': '0.3'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_login_create_place(self):
        url = reverse('place-list')
        data = {'name': 'McDonalds', 'description': 'fast food',
                'longitude': '0.1', 'latitude': '0.3'}
        user = User.objects.create_user('username', '', '1234')
        self.assertTrue(self.client.login(username='username', password='1234'))
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
