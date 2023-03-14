from django.forms import ModelForm
from django.forms.models import inlineformset_factory

from .models import Post, PostFile


class PostForm(ModelForm):
    class Meta:
        model = Post


PostFormSet = inlineformset_factory(Post, PostFile)
