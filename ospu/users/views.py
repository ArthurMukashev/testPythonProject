from django.shortcuts import HttpResponse, render


def LogOut(request):
    pass
    # return render(request, 'users/logged_out.')
    # return HttpResponse('123')


def Login(request):
    return render(request, 'users/login.html')
    # return HttpResponse('12312321321')
