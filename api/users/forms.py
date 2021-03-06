from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import User


class MyUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('username', 'email')


class MyUserChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = UserChangeForm.Meta.fields
