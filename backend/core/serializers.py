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
    commented_by = serializers.CharField(source='commented_by.username')

    class Meta:
        model = PostComment
        fields = ['id', 'comment', 'commented_by']
        
class PostLikeSerializer(serializers.ModelSerializer):
    liked_by = serializers.CharField(source='liked_by.username')

    class Meta:
        model = PostLike
        fields = ['id', 'liked_by']

class PostSerializer(serializers.ModelSerializer):
    label = LabelSerializer(many=True, required=False)
    postcomment_set = PostCommentSerializer(source='comments', many=True, read_only=True)
    postlike_set = PostLikeSerializer(source='likes', many=True, read_only=True)
    # base_user = UserSerializer(read_only=True)
    user = serializers.JSONField(source='base_user', read_only=True)
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # Rename 'base_user' to 'user' in the serialized output
        representation['user'] = representation.pop('base_user', None)
        return representation
    def create(self, validated_data):
        # Extract the nested data for instructor feedback
        print(validated_data)
        labels = validated_data.pop("label", None)
        # user_data = validated_data.pop('base_user', None)
        # # Create the student instance

        # user_key=User(username = user_data['username'],password=user_data['password'])
        # user_key.save()

        # validated_data.push('base_user',user)
        post = Post.objects.create(**validated_data)

        if labels is not None:
            for label in labels:
                label_instance, created = Label.objects.get_or_create(**label)
                post.label.add(label_instance.pk)
        post.save()
        return post

    class Meta:
        model = Post
        fields = "__all__"

class GuideSerializer(serializers.ModelSerializer):
    pass