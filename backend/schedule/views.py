import datetime
from rest_framework import viewsets
from .serializers.serializers import LessonSerializer, StudyGroupSerializer
from .models import StudyGroup, Lesson


class LessonViewSet(viewsets.ModelViewSet):
            
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer

class StudyGroupViewSet(viewsets.ModelViewSet):
    queryset = StudyGroup.objects.all()
    serializer_class = StudyGroupSerializer

