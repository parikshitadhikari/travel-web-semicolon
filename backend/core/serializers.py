from rest_framework import serializers
from .models import Business,  EventInterested, Guide, PackageComment, PackageSubscription, Post, User, Travellers, Label, Package, Event,PostComment,PostLike


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {"password": {"write_only": True}}

class LabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Label
        fields = "__all__"
        
class TravellersSerializer(serializers.ModelSerializer):
    pass
class SimpleBusinessSerializer(serializers.ModelSerializer):
    pass
class PackageSerializer(serializers.ModelSerializer):
    pass
class BusinessSerializer(serializers.ModelSerializer):
    pass
class EventInterestedSerializer(serializers.ModelSerializer):
    pass
class EventSerializer(serializers.ModelSerializer):
    pass
class PackageSubscriptionSerializer(serializers.ModelSerializer):
    pass
class PackageCommentSerializer(serializers.ModelSerializer):
    pass
class PackageSerializer(serializers.ModelSerializer):
    pass
class PostCommentSerializer(serializers.ModelSerializer):
    pass
class PostLikeSerializer(serializers.ModelSerializer):
    pass
class PostSerializer(serializers.ModelSerializer):
    pass
class GuideSerializer(serializers.ModelSerializer):
    pass