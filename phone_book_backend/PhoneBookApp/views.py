from django.db.models import Q

# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from PhoneBookApp.serializers import PhoneBookSerializer
from PhoneBookApp.serializers import UserSerializer
from PhoneBookApp.models import PhoneBook
from PhoneBookApp.models import User
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

@csrf_exempt
def phoneBookApi(request,id=0):
    if request.method=='GET':
        items = request.GET.get('items', 2)
        search_name = request.GET.get('search', '').strip()
        print(search_name)
        if(search_name):
              phoneBook = PhoneBook.objects.filter(Q(name__icontains=search_name)).order_by('name')
              print(phoneBook)
        else:
              phoneBook = PhoneBook.objects.all().order_by('name')
              print(phoneBook)
        paginator = Paginator(phoneBook, items)      
        page = request.GET.get('page', 1)

        try:
            phoneBook_page = paginator.page(page)
        except PageNotAnInteger:
            phoneBook_page = paginator.page(1)
        except EmptyPage:
            return JsonResponse({'data': [], 'count': 0})

        phone_book_serializer = PhoneBookSerializer(phoneBook_page, many=True)
        response_data = {
            'data': phone_book_serializer.data,
            'count': paginator.count
        }
        return JsonResponse(response_data, safe=False)
    

    
    elif request.method=='POST':
        phone_book_data=JSONParser().parse(request)
        phone_book_serializer=PhoneBookSerializer(data=phone_book_data)
        if phone_book_serializer.is_valid():
            phone_book_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    
    elif request.method=='PUT':
        phone_book_data=JSONParser().parse(request)
        phoneBook=PhoneBook.objects.get(id=id)
        phone_book_serializer=PhoneBookSerializer(phoneBook,data=phone_book_data)
        if phone_book_serializer.is_valid():
            phone_book_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    
    elif request.method=='DELETE':
        phoneBook=PhoneBook.objects.get(id=id)
        phoneBook.delete()
        return JsonResponse("Deleted Successfully",safe=False)



@csrf_exempt
def userApi(request,id=0):
    if request.method=='GET':
        user = User.objects.all()
        user_serializer=UserSerializer(user,many=True)
        return JsonResponse(user_serializer.data,safe=False)
       
    elif request.method=='POST':
        user_data=JSONParser().parse(request)
        user_serializer=UserSerializer(data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    
    elif request.method=='PUT':
        user_data=JSONParser().parse(request)
        user=User.objects.get(id=id)
        user_serializer=UserSerializer(user,data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    
    elif request.method=='DELETE':
        user=User.objects.get(id=id)
        user.delete()
        return JsonResponse("Deleted Successfully",safe=False)
