from rest_framework import serializers
from schedule.models import *

class SubjectSerializer(serializers.ModelSerializer):

    s_type = serializers.CharField(source='get_subject_type_display')

    class Meta:
        model = Subject
        fields = ['name', 's_type']

class LessonFulltimeSerializer(serializers.ModelSerializer):

    class_number = serializers.StringRelatedField()
    study_group = serializers.StringRelatedField()
    subject = SubjectSerializer()
    speaker = serializers.StringRelatedField()
    classroom = serializers.StringRelatedField()

    class Meta:
        model = LessonFulltime
        fields = ['id', '__str__', 'week_parity' , 'day', 'class_number', 'study_group', 'subject', 'speaker', 'classroom']

class LessonDistanceSerializer(serializers.ModelSerializer):

    class_number = serializers.StringRelatedField()
    study_group = serializers.StringRelatedField()
    subject = SubjectSerializer()
    speaker = serializers.StringRelatedField()
    classroom = serializers.StringRelatedField()

    class Meta:
        model = LessonDistance
        fields = ['id', '__str__', 'date_day', 'class_number', 'study_group', 'subject', 'speaker', 'classroom']


class StudyGroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = StudyGroup
        fields = ['name', 'mode_of_study']


class WeeksSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = Weeks
        fields = ['id', 'week', 'current']