from django.conf import settings
from django.db import models

rating_choices = [(1, "1"), (2, "2"), (3, "3"), (4, "4"), (5, "5")]


class Review(models.Model):
    review_id = models.CharField(max_length=30, unique=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="reviews", null=True, on_delete=models.SET_NULL)
    place = models.ForeignKey('places.Place', related_name='reviews', on_delete=models.CASCADE)
    rating = models.IntegerField(choices=rating_choices)
    text = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['modified']
        db_table = 'review'

    def __str__(self):
        if self.owner:
            return self.owner.username + "'s review of '" + self.place.name
        return "anonymous review"
