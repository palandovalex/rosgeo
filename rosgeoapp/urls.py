from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/getgeo', views.getgeo, name= 'getgeo'),
]
