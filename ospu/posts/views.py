from django.apps import apps
from django.shortcuts import get_object_or_404, redirect, render

from .models import Category, Post


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


def category_posts(request, slug):
    category = get_object_or_404(Category, slug=slug)
    posts = category.posts.select_related('author')
    context = {
        'category': category,
        'posts': posts
    }
    return render(request, 'posts/category_posts.html', context)
