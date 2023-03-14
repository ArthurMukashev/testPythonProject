from datetime import datetime

from ..models import Link


def get_site_params(request):
    return {
        'year': datetime.now().year,
        'links': Link.objects.all(),
        'group': request.user.groups.all()[0].name
    }
