from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Task
from .serializer import TaskSerializer

# Create your views here.
@api_view(['GET'])
def home(request):
    return Response('Home')

@api_view(['GET'])
def getTasks(request):
    task = Task.objects.all().order_by('start_time')
    serializer = TaskSerializer(task, many=True)
    return Response(serializer.data)
    
@api_view(['GET'])
def getTask(request, pk):
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(task, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def updateTask(request, pk):
    data = request.data
    task = Task.objects.get(id=pk)
    # take the new data and save it into the old
    serializer = TaskSerializer(instance=task, data=data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
def deleteTask(request, pk):
    task = Task.objects.get(id=pk)
    task.delete()
    return Response('Task was deleted')

@api_view(['POST'])
def addTask(request):
    data = request.data
    task = Task.objects.create(body=data['description'])
