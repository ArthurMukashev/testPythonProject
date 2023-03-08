from django.apps import apps
from django.shortcuts import get_object_or_404, redirect, render

from .models import Post


def paginator():
    pass


def index(request):
    posts = Post.objects.all()
    context = {
        'posts': posts
    }
    return render(request, 'posts/index.html', context)


def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    context = {
        'post': post
    }
    return render(request, 'posts/post_detail.html', context)
