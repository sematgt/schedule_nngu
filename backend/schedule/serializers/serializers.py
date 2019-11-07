from rest_framework import serializers
from schedule.models import *

class LessonSerializer(serializers.ModelSerializer):
    class_number = serializers.StringRelatedField()
    study_group = serializers.StringRelatedField()
    subject = serializers.StringRelatedField()
    speaker = serializers.StringRelatedField()
    classroom = serializers.StringRelatedField()
    
    class Meta:
        model = Lesson
        fields = ['__str__', 'date_day', 'class_number', 'study_group', 'subject', 'speaker', 'classroom']


class StudyGroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = StudyGroup
        fields = ['name']


class WeeksSerializer(serializers.ModelSerializer):
    
    

    class Meta:
        model = Weeks
        fields = ['week', 'current']