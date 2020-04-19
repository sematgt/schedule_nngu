import datetime
from rest_framework import viewsets, generics
from .serializers.serializers import LessonDistanceSerializer, StudyGroupSerializer, WeeksSerializer, LessonFulltimeSerializer, SubjectSerializer, SpeakerBlockedTimeFulltimeSerializer, SpeakerBlockedTimeDistanceSerializer, TermSerializer, LoadSerializer, PostLessonsDistanceSerializer, PostLessonsFulltimeSerializer
from .models import StudyGroup, LessonDistance, Weeks, LessonFulltime, Subject, SpeakerBlockedTimeFulltime, SpeakerBlockedTimeDistance, Load, Term
from .utils.calcutale import GetLessonsIn3Months, GetFirstDaysOfAllWeeks, ActualizeCurrentWeek
from datetime import timedelta, date, datetime
from dateutil.relativedelta import relativedelta

class LessonDistanceViewSet(viewsets.ModelViewSet):

    ActualizeCurrentWeek()
    # queryset = LessonDistance.objects.filter(date_day__lt=str(date.today() + relativedelta(months=+3)), date_day__gt=str(date.today() + relativedelta(months=-3)))
    queryset = LessonDistance.objects.all()
    serializer_class = LessonDistanceSerializer

class LessonFulltimeViewSet(viewsets.ModelViewSet):

    queryset = LessonFulltime.objects.all()
    serializer_class = LessonFulltimeSerializer

class StudyGroupViewSet(viewsets.ModelViewSet):
    queryset = StudyGroup.objects.all()
    serializer_class = StudyGroupSerializer

class WeeksViewSet(viewsets.ModelViewSet):

    queryset = Weeks.objects.all() 
    serializer_class = WeeksSerializer

class SubjectViewSet(viewsets.ModelViewSet):

    queryset = Subject.objects.all() 
    serializer_class = SubjectSerializer

class SpeakerBlockedTimeFulltimeViewSet(viewsets.ModelViewSet):

    queryset = SpeakerBlockedTimeFulltime.objects.all()
    serializer_class = SpeakerBlockedTimeFulltimeSerializer

class SpeakerBlockedTimeDistanceViewSet(viewsets.ModelViewSet):

    queryset = SpeakerBlockedTimeDistance.objects.all()
    serializer_class = SpeakerBlockedTimeDistanceSerializer

class LoadViewSet(viewsets.ModelViewSet):

    queryset = Load.objects.all()
    serializer_class = LoadSerializer

class TermViewSet(viewsets.ModelViewSet):

    queryset = Term.objects.all()
    serializer_class = TermSerializer

class PostLessonsDistance(viewsets.ModelViewSet):

    queryset = LessonDistance.objects.all()
    serializer_class = PostLessonsDistanceSerializer

class PostLessonsFulltime(viewsets.ModelViewSet):

    queryset = LessonFulltime.objects.all()
    serializer_class = PostLessonsFulltimeSerializer