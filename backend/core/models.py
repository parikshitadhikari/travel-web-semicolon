from django.db import models


from django.contrib.auth.models import AbstractUser


# Custom User model extending Django's AbstractUser
class User(AbstractUser):
    
    def __str__(self):
        return self.username
    
class Label(models.Model):
    name = models.CharField(max_length=255)
    def __str__(self):
        return self.name
# Post model for handling User posts.
class Post(models.Model):
    description = models.TextField()
    created_at = models.DateTimeField(auto_now=True)
    base_user = models.ForeignKey(User, on_delete=models.CASCADE)
    img = models.ImageField(upload_to='core/post/images', null=True, blank=True)
    label = models.ManyToManyField(Label,blank=True)
    def __str__(self):
        return self.description
# Model for handling Post comments.
class PostComment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE,related_name="comments")
    comment = models.CharField(max_length=255)
    commented_by = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.comment
# Model for handling Post likes.
class PostLike(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE,related_name="likes")
    liked_by = models.OneToOneField(User, on_delete=models.CASCADE)

class Travellers(models.Model):
    pass
class Business(models.Model):
    pass
class Guide(models.Model):
    pass
class Package(models.Model):
    pass
    
class PackageSubscription(models.Model):
    pass
class PackageComment(models.Model):
    pass
class Event(models.Model):
    pass
class EventInterested(models.Model):
    pass