from django.contrib import admin

# Register your models here.
from .models import (
    PackageComment,
    User,
    Label,
    Travellers,
    Business,
    Guide,
    Package,
    PackageSubscription,
    Event,
    EventInterested,
    Post,
    PostComment
)

from django.utils import timezone
# Custom User admin (if needed for additional display configuration)
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("username", "email", "first_name", "last_name", "is_staff")
    search_fields = ("username", "email")

    