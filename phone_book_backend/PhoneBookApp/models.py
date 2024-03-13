from django.db import models

class PhoneBook(models.Model):
    name = models.CharField(max_length = 100)
    phoneNo = models.CharField(max_length = 10)
    email = models.CharField(max_length = 150)
    tags = models.CharField(max_length = 50)

class User(models.Model):
    firstName = models.CharField(max_length = 100)
    lastName = models.CharField(max_length = 100)
    phoneNo1 = models.CharField(max_length = 10)
    phoneNo2 = models.CharField(max_length = 10)
    email = models.CharField(max_length = 150)
    address = models.CharField(max_length = 150)