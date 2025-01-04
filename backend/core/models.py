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
    base_user = models.ForeignKey(User,on_delete=models.CASCADE)
    interests = models.ManyToManyField(Label,blank=True)
    def __str__(self):
        return self.base_user.username
    
class Business(models.Model):
    base_user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="Business")
    def __str__(self):
        return self.base_user.username
    
class Guide(models.Model):
    base_user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="Guide")
    label = models.ManyToManyField(Label)
    image = models.ImageField(upload_to='core/giude/profile',null=True,blank=True)
    
    def __str__(self):
        return self.base_user.username
    
class Package(models.Model):
    name = models.CharField(max_length=255)
    label = models.ManyToManyField(Label)
    business = models.ForeignKey(Business,related_name="packages",on_delete=models.CASCADE)
    img = models.ImageField(upload_to='core/post/images', null=True, blank=True)
    price = models.FloatField(default=0.0)
    description= models.TextField(blank=True, default="")
    guide = models.ForeignKey(Guide, on_delete=models.CASCADE, null=True)
    def __str__(self):
        return self.name
    
class PackageSubscription(models.Model):
    package = models.ForeignKey(Package, on_delete=models.CASCADE)
    subscribed_by = models.ForeignKey(User, on_delete=models.CASCADE)
    
    class Meta:
        unique_together = [['package','subscribed_by']]

class PackageComment(models.Model):
    package = models.ForeignKey(Package, on_delete=models.CASCADE)
    commented_by = models.OneToOneField(User, on_delete=models.CASCADE)
    comment = models.TextField()

class Event(models.Model):
    name = models.CharField(max_length=255)
    label = models.ManyToManyField(Label)
    img = models.ImageField(upload_to='core/events/images', null=True, blank=True)
    created_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User,on_delete=models.CASCADE)
    # price = models.FloatField(default=0.0)
    description= models.TextField(blank=True, default="")
    # guide = models.ForeignKey(Guide, on_delete=models.CASCADE, null=True, default=None)

class EventInterested(models.Model):
    event = models.ForeignKey(Event,on_delete=models.CASCADE)
    interested_user = models.OneToOneField(User,on_delete=models.CASCADE)
