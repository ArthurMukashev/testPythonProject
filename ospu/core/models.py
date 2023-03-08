from django.db import models


# Create your models here.

class Link(models.Model):
    link_name = models.CharField(max_length=200)
    link_url = models.TextField()
    class Meta:
        verbose_name = 'Полезная ссылка'
        verbose_name_plural = 'Полезные ссылки'
