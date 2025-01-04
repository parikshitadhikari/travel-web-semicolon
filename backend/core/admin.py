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


# Register Guide
@admin.register(Guide)
class GuideAdmin(admin.ModelAdmin):
    list_display = ("id", "base_user__username", "base_user__email")
    search_fields = ("base_user__username", "base_user__email")
    filter_horizontal = ("label",)

# Register Business
@admin.register(Business)
class BusinessAdmin(admin.ModelAdmin):
    list_display = ("id", "base_user__username", "base_user__email")
    search_fields = ("base_user__username", "base_user__email")
    
# Register Event
@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "description")
    search_fields = ("name",)
    filter_horizontal = ("label",)


# Register EventLike
@admin.register(EventInterested)
class EventLikeAdmin(admin.ModelAdmin):
    list_display = ("id", "event", "interested_user")
    search_fields = ("event__name", "interested_user__username")

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("id", "description")
    search_fields = ("description",)
    filter_horizontal = ("label",)

@admin.register(PostComment)
class PostCommentAdmin(admin.ModelAdmin):
    list_display=("id","comment","commented_by__username")
