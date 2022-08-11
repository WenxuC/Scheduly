from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('tasks/new/', views.addTask, name='add-task'),
    path('tasks/<str:pk>/', views.getTask, name='task'),
    path('tasks/<str:pk>/update/', views.updateTask, name='update-task'),
    path('tasks/<str:pk>/delete/', views.deleteTask, name='delete-task'),
    path('tasks/', views.getTasks, name='tasks'),
]
