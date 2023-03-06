from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('', include('news.urls', namespace='news')),
    path('admin/', admin.site.urls),
]
