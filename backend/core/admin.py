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

# Register Label
@admin.register(Label)
class LabelAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)


# Register Travellers
@admin.register(Travellers)
class TravellersAdmin(admin.ModelAdmin):
    list_display = ("id", "base_user")
    search_fields = ("base_user__username",)
    filter_horizontal = ("interests",)

# Register Business

# Register Guide
@admin.register(Guide)
class GuideAdmin(admin.ModelAdmin):
    list_display = ("id", "base_user__username", "base_user__email")
    search_fields = ("base_user__username", "base_user__email")
    filter_horizontal = ("label",)
