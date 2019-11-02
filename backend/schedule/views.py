import datetime
from rest_framework import viewsets
from .serializers.serializers import LessonSerializer
from .models import StudyGroup, Lesson


class LessonViewSet(viewsets.ModelViewSet):

    # current_day = datetime.date.today()

    # for g in StudyGroup.objects.all():
    #     for i in range(g.count()):
    #         g[i].lesson_set.filter(date_day__exact=current_day)
            
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer

