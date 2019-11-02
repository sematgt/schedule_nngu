from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from schedule import views

router = routers.DefaultRouter()
router.register(r'lessons', views.LessonViewSet)
router.register(r'groups', views.StudyGroupViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    # path('api/', include('rest_framework.urls')),
]
