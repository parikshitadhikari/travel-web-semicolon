from django.db import models


from django.contrib.auth.models import AbstractUser


# Custom User model extending Django's AbstractUser
class User(AbstractUser):
    
    def __str__(self):
        return self.username
class Label(models.Model):
    pass
# Post model for handling User posts.
class Post(models.Model):
    pass
# Model for handling Post comments.
class PostComment(models.Model):
    pass
# Model for handling Post likes.
class PostLike(models.Model):
    pass

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