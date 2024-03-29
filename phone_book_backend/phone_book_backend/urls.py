"""
URL configuration for phone_book_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, re_path
from PhoneBookApp import views

# fix: urls
urlpatterns = [
    re_path(r'^contact$',views.phoneBookApi),
    re_path(r'^contact/([0-9]+)$',views.phoneBookApi),
    re_path(r'^user$',views.userApi),
    re_path(r'^user/([0-9]+)$',views.userApi),
    path('admin/', admin.site.urls),
]
