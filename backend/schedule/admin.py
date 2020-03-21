from django.contrib import admin

from .models import *


class LessonAdmin(admin.ModelAdmin):
    list_display = ('date_day', 'class_number', 'study_group', 'subject', 'speaker', 'classroom')
    list_filter = ['date_day', 'study_group']
    ordering = ['date_day']
    
class SpeakerAdmin(admin.ModelAdmin):
    list_display = ('name', 'department', 'email', 'phone_number')
    list_filter = ['department']
    search_fields = ['name__icontains']

class WeeksAdmin(admin.ModelAdmin):
    list_display = ('week', 'current')
    readonly_fields = ('week', 'current')
    list_display_links = ('week',)

class SubjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'subject_type')
    list_display_links = ('name',)
    list_editable = ('subject_type',)
    list_filter = ['subject_type']
    search_fields = ['name__icontains']

for r in (Classroom, StudyGroup):
    admin.site.register(r)

admin.site.register(Lesson, LessonAdmin)
admin.site.register(Speaker, SpeakerAdmin)
admin.site.register(Weeks, WeeksAdmin)
admin.site.register(Subject, SubjectAdmin)