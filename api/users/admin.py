from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import MyUserCreationForm, MyUserChangeForm
from .models import User


class CustomUserAdmin(UserAdmin):
    model = User
    add_form = MyUserCreationForm
    form = MyUserChangeForm


admin.site.register(User, CustomUserAdmin)
