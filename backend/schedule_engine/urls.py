from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from schedule import views

router = routers.DefaultRouter()
router.register('lessons_distance', views.LessonDistanceViewSet)
router.register('lessons_fulltime', views.LessonFulltimeViewSet)
router.register('groups', views.StudyGroupViewSet)
router.register('weeks', views.WeeksViewSet)
router.register('subjects', views.SubjectViewSet)
router.register('loads', views.LoadViewSet)
router.register('terms', views.TermViewSet)
router.register('speakerblockedtimefulltime', views.SpeakerBlockedTimeFulltimeViewSet)
router.register('speakerblockedtimedistance', views.SpeakerBlockedTimeDistanceViewSet)
router.register('post_distance_lesson', views.PostLessonsDistance)
router.register('post_fulltime_lesson', views.PostLessonsFulltime)


urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
]
