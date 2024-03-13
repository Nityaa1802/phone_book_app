from rest_framework import serializers
from PhoneBookApp.models import PhoneBook
from PhoneBookApp.models import User


# fix model name
class PhoneBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhoneBook
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'