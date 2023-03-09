from django.db import models


# Create your models here.

class Link(models.Model):
    link_name = models.CharField(
        'Название ссылки',
        max_length=200
    )
    link_url = models.TextField('URL-адрес ссылки')

    class Meta:
        verbose_name = 'Полезная ссылка'
        verbose_name_plural = 'Полезные ссылки'
