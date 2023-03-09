from django.contrib import admin

from .models import Link


@admin.register(Link)
class LinkAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'link_name',
        'link_url'
    )
    list_editable = ('link_name',)
    search_fields = ('link_name',)
    empty_value_display = '-пусто-'
