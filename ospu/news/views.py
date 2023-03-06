from django.shortcuts import render

from .models import Post


def index(request):
    news = Post.objects.order_by('-pub_date')[:10]
    context = {
        'news': news,
    }
    return render(request, 'news/index.html', context)


def news_detail(request, pk):
    return render(request, 'news/news_detail.html')


def cat_news(request, slug):
    return render(request, 'news/cat_news.html')
