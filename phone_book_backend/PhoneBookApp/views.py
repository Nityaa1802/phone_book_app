from django.db.models import Q

# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from PhoneBookApp.serializers import PhoneBookSerializer
from PhoneBookApp.models import PhoneBook
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

@csrf_exempt
def studentApi(request,id=0):
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

        student_serializer = PhoneBookSerializer(phoneBook_page, many=True)
        response_data = {
            'data': student_serializer.data,
            'count': paginator.count
        }
        return JsonResponse(response_data, safe=False)
    

    
    elif request.method=='POST':
        student_data=JSONParser().parse(request)
        student_serializer=PhoneBookSerializer(data=student_data)
        if student_serializer.is_valid():
            student_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    
    elif request.method=='PUT':
        student_data=JSONParser().parse(request)
        phoneBook=PhoneBook.objects.get(id=id)
        student_serializer=PhoneBookSerializer(phoneBook,data=student_data)
        if student_serializer.is_valid():
            student_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    
    elif request.method=='DELETE':
        phoneBook=PhoneBook.objects.get(id=id)
        phoneBook.delete()
        return JsonResponse("Deleted Successfully",safe=False)
