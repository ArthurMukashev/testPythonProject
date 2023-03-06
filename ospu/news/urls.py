from django.urls import path
from . import views

app_name = 'news'

urlpatterns = [
    path('', views.index),
    path('news/<int:pk>', views.news_detail, name='news_detail'),
    path('cat_news/<slug:slug>/', views.cat_news, name='cat_news'),
]
