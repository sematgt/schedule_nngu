from rest_framework import serializers
from schedule.models import *

class SubjectNameSerializer(serializers.ModelSerializer):

    s_type = serializers.CharField(source='get_subject_type_display')

    class Meta:
        model = Subject
        fields = ['name', 's_type']

class LessonFulltimeSerializer(serializers.ModelSerializer):

    class_number = serializers.StringRelatedField()
    study_group = serializers.StringRelatedField()
    subject = SubjectNameSerializer()
    speaker = serializers.StringRelatedField()
    classroom = serializers.StringRelatedField()

    class Meta:
        model = LessonFulltime
        fields = ['id', '__str__', 'week_parity' , 'day', 'class_number', 'study_group', 'subject', 'speaker', 'classroom']

class LessonDistanceSerializer(serializers.ModelSerializer):

    class_number = serializers.StringRelatedField()
    study_group = serializers.StringRelatedField()
    subject = SubjectNameSerializer()
    speaker = serializers.StringRelatedField()
    classroom = serializers.StringRelatedField()

    class Meta:
        model = LessonDistance
        fields = ['id', '__str__', 'date_day', 'class_number', 'study_group', 'subject', 'speaker', 'classroom']


class StudyGroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = StudyGroup
        fields = ['id', 'name', 'mode_of_study', 'students_count']


class WeeksSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = Weeks
        fields = ['id', 'week', 'current']

class SpeakersListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Speaker
        fields = ['id', 'name']

class ClassroomsListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Classroom
        fields = ['id', 'name', 'size']

class SubjectSerializer(serializers.ModelSerializer):

    speaker_list = SpeakersListSerializer(many = True, required = False, source='speakers')
    classrooms_list = ClassroomsListSerializer(many = True, required = False, source='classrooms')

    class Meta:
        model = Subject
        fields = ['speaker_list', 'classrooms_list']

class SpeakerBlockedTimeFulltimeSerializer(serializers.ModelSerializer):

    class Meta:
        model = SpeakerBlockedTimeFulltime
        fields = ['speaker', 'week_parity', 'class_number', 'day']

class SpeakerBlockedTimeDistanceSerializer(serializers.ModelSerializer):

    class Meta:
        model = SpeakerBlockedTimeDistance
        fields = ['speaker', 'date_day', 'class_number']

class TermSerializer(serializers.ModelSerializer):

    class Meta:
        model = Term
        fields = ['id', 'number', 'weeks_count_fulltime', 'weeks_count_distance']

class LoadSerializer(serializers.ModelSerializer):

    class Meta:
        model = Load
        fields = ['term', 'group', 'subject', 'hours_count']