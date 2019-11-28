from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient, APITestCase


class ReviewTests(APITestCase):
    def setUp(self) -> None:
        self.user = self.setup_user()
        self.client = APIClient()
        self.client.force_authenticate(self.user)
        url = reverse('place-list')
        place_data = {'name': 'McDonalds', 'description': 'fast food',
                      'longitude': '0.1', 'latitude': '0.3'}
        self.response = self.client.post(url, place_data, format='json')

    def setup_user(self):
        User = get_user_model()
        return User.objects.create_user(
            'test',
            email='testuser@gmail.com',
            password='test'
        )

    def test_get_reviews(self):
        url = reverse('review-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_create_review(self):
        url = reverse('review-list')
        data = {'place': 1, 'rating': 4, 'text': 'lovely place'}
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        new_response = self.client.post(url, data, format='json')
        self.assertEqual(new_response.status_code, status.HTTP_201_CREATED)
