from django.apps import apps

from datetime import datetime


def get_site_name(request):
    return {
        'site_title': 'Университетский портал - ',
        'site_name': 'Университетский портал',
        'year': datetime.now().year,
        'links': apps.get_model('core', 'Link').objects.all()
    }
