import datetime
from rest_framework import viewsets, generics
from .serializers.serializers import LessonSerializer, StudyGroupSerializer, WeeksSerializer
from .models import StudyGroup, Lesson, Weeks
from .utils.calcutale import GetLessonsIn3Months, GetFirstDaysOfAllWeeks

class LessonViewSet(viewsets.ModelViewSet):
            
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer

class StudyGroupViewSet(viewsets.ModelViewSet):
    queryset = StudyGroup.objects.all()
    serializer_class = StudyGroupSerializer

class WeeksViewSet(viewsets.ModelViewSet):

    queryset = Weeks.objects.all() 
    serializer_class = WeeksSerializer
