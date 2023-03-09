from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


# Create your models here.

class Category(models.Model):
    title = models.CharField(
        'Заголовок',
        max_length=200
    )

    slug = models.SlugField(
        'Содержание',
        max_length=30,
        unique=True
    )
    description = models.TextField('Описание')

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

    def __str__(self):
        return self.title


class Post(models.Model):
    title = models.CharField(
        'Заголовок поста',
        help_text='Заголовок нового поста',
        max_length=200
    )
    subtitle = models.CharField(
        'Подзаголовок поста',
        max_length=200,
        blank=True,
        null=True
    )
    text = models.TextField(
        'Текст поста',
        help_text='Текст нового поста'
    )
    pub_date = models.DateTimeField(
        'Дата публикации',
        auto_now_add=True
    )
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='posts',
        verbose_name='Автор',
        default=None
    )
    category = models.ForeignKey(
        Category,
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        related_name='posts',
        verbose_name='Категория',
        help_text='Категория поста'
    )

    class Meta:
        ordering = ('-pub_date',)
        verbose_name = 'Новостной пост'
        verbose_name_plural = 'Новостные посты'

    def __str__(self):
        return self.text[:30] + '...'
