from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Post(models.Model):
    title = models.CharField(max_length=200)
    text = models.TextField()
    pub_date = models.DateTimeField(auto_now_add=True)
    on_main = models.BooleanField(default=True)
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='news'
    )
