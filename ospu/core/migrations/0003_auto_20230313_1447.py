# Generated by Django 2.2.19 on 2023-03-13 09:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20230309_0016'),
    ]

    operations = [
        migrations.AlterField(
            model_name='link',
            name='link_name',
            field=models.CharField(max_length=200, verbose_name='Название ссылки'),
        ),
        migrations.AlterField(
            model_name='link',
            name='link_url',
            field=models.TextField(verbose_name='URL-адрес ссылки'),
        ),
    ]
