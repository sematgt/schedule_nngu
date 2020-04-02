from django.contrib import admin

from .models import *

class LessonDistanceAdmin(admin.ModelAdmin):

    # def get_subject_type(self, obj):
    #     return obj.subject.get_subject_type_display()
    # get_subject_type.short_description = 'Тип занятия'

    fields = ['subject', 'speaker', 'study_group', 'date_day', 'class_number', 'classroom', 'term']
    autocomplete_fields = ['subject']
    list_display = ('subject', 'study_group', 'date_day', 'class_number', 'speaker', 'classroom', 'term')
    list_editable = ('term',)
    list_display_links = ('subject',)
    list_filter = ['date_day', 'study_group', 'term']
    ordering = ['-date_day', 'study_group', 'class_number']

    
class LessonFulltimeAdmin(admin.ModelAdmin):

    # def get_subject_type(self, obj):
    #     return obj.subject.get_subject_type_display()
    # get_subject_type.short_description = 'Тип занятия'

    autocomplete_fields = ['subject', 'speaker']
    list_display = ('subject', 'study_group', 'class_number', 'speaker', 'classroom', 'week_parity', 'day', 'term')
    list_display_links = ('subject',)
    list_filter = ['study_group', 'week_parity', 'day', 'term']
    ordering = ['day', 'week_parity', 'study_group', 'class_number']
    list_editable = ('term',)
    
class SpeakerAdmin(admin.ModelAdmin):
    list_display = ('name', 'department', 'email', 'phone_number')
    list_filter = ['department']
    search_fields = ['name__icontains']

class WeeksAdmin(admin.ModelAdmin):
    list_display = ('week', 'current')
    readonly_fields = ('week', 'current')
    list_display_links = ('week',)

class SubjectAdmin(admin.ModelAdmin):
    fields = ['name', 'subject_type', 'speakers', 'classrooms']
    list_display = ('id', 'name', 'subject_type')
    list_display_links = ('name',)
    list_filter = ('subject_type',)
    search_fields = ['name__icontains']
    filter_horizontal = ('speakers', 'classrooms')

class StudyGroupAdmin(admin.ModelAdmin):
    list_display = ('name', 'students_count', 'mode_of_study')
    list_editable = ('students_count', 'mode_of_study')
    search_fields = ['name__icontains']

class ClassroomAdmin(admin.ModelAdmin):
    # form = ClassroomForm
    list_display = ('name', 'size')
    list_editable = ('size',)
    search_fields = ['name__icontains']

class SpeakerBlockedTimeDistanceAdmin(admin.ModelAdmin):

    list_display = ('speaker', 'date_day', 'class_number')
    search_fields = ['speaker__icontains']

class SpeakerBlockedTimeFulltimeAdmin(admin.ModelAdmin):

    list_display = ('speaker', 'week_parity', 'class_number', 'day')
    search_fields = ['speaker__icontains']

class LoadAdmin(admin.ModelAdmin):

    list_display = ('term', 'group', 'subject', 'hours_count')
    search_fields = ['subject__icontains']
    list_filter = ('term', 'group', 'subject')

class TermAdmin(admin.ModelAdmin):

    list_display = ('number', 'weeks_count_fulltime', 'weeks_count_distance')


admin.site.register(Classroom, ClassroomAdmin)
admin.site.register(StudyGroup, StudyGroupAdmin)
admin.site.register(LessonFulltime, LessonFulltimeAdmin)
admin.site.register(LessonDistance, LessonDistanceAdmin)
admin.site.register(Speaker, SpeakerAdmin)
admin.site.register(Weeks, WeeksAdmin)
admin.site.register(Subject, SubjectAdmin)
admin.site.register(SpeakerBlockedTimeDistance, SpeakerBlockedTimeDistanceAdmin)
admin.site.register(SpeakerBlockedTimeFulltime, SpeakerBlockedTimeFulltimeAdmin)
admin.site.register(Term, TermAdmin)
admin.site.register(Load, LoadAdmin)