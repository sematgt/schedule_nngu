from rest_framework import serializers
from schedule.models import *

class SubjectNameSerializer(serializers.ModelSerializer):

    s_type = serializers.CharField(source='get_subject_type_display')

    class Meta:
        model = Subject
        fields = ['id', 'name', 's_type']

class LessonFulltimeSerializer(serializers.ModelSerializer):

    class_number = serializers.StringRelatedField()
    study_group = serializers.StringRelatedField()
    subject = SubjectNameSerializer()
    speaker = serializers.StringRelatedField()
    classroom = serializers.StringRelatedField()

    class Meta:
        model = LessonFulltime
        fields = ['id', '__str__', 'week_parity' , 'day', 'class_number', 'study_group', 'subject', 'speaker', 'classroom', 'term']

class LessonDistanceSerializer(serializers.ModelSerializer):

    class_number = serializers.StringRelatedField()
    study_group = serializers.StringRelatedField()
    subject = SubjectNameSerializer()
    speaker = serializers.StringRelatedField()
    classroom = serializers.StringRelatedField()

    class Meta:
        model = LessonDistance
        fields = ['id', '__str__', 'date_day', 'class_number', 'study_group', 'subject', 'speaker', 'classroom', 'term']


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

    fullname = serializers.CharField(source='__str__')
    speaker_list = SpeakersListSerializer(many = True, required = False, source='speakers')
    classrooms_list = ClassroomsListSerializer(many = True, required = False, source='classrooms')

    class Meta:
        model = Subject
        fields = ['fullname', 'speaker_list', 'classrooms_list']

class SpeakerBlockedTimeFulltimeSerializer(serializers.ModelSerializer):

    speaker_info = SpeakersListSerializer(source='speaker')
    
    class Meta:
        model = SpeakerBlockedTimeFulltime
        fields = ['speaker_info', 'week_parity', 'class_number', 'day']

class SpeakerBlockedTimeDistanceSerializer(serializers.ModelSerializer):

    speaker_info = SpeakersListSerializer(source='speaker')

    class Meta:
        model = SpeakerBlockedTimeDistance
        fields = ['speaker_info', 'date_day', 'class_number']

class TermSerializer(serializers.ModelSerializer):

    weeks = serializers.ListField(source='GetDistanceWeeks')

    class Meta:
        model = Term
        fields = ['id', 'number', 'weeks_count_fulltime', 'weeks_count_distance', 'distance_first_day', 'distance_last_day', 'weeks']



class LoadSerializer(serializers.ModelSerializer):

    subject_name = SubjectNameSerializer(source='subject')

    class Meta:
        model = Load
        fields = ['term', 'group', 'subject_name', 'hours_count']