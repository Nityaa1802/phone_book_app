from rest_framework import serializers
from PhoneBookApp.models import PhoneBook

# fix model name
class PhoneBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhoneBook
        fields = '__all__'
