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
    list_display = ('id', 'week', 'current')


for r in (Subject, Classroom, StudyGroup):
    admin.site.register(r)

admin.site.register(Lesson, LessonAdmin)
admin.site.register(Speaker, SpeakerAdmin)
admin.site.register(Weeks, WeeksAdmin)