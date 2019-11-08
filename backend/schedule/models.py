from django.db import models
from schedule.utils.calcutale import GetFirstDaysOfAllWeeks, GetLessonsIn3Months
import json
from datetime import date, datetime

class Speaker(models.Model):
    name = models.CharField('ФИО', max_length=70, unique=True)
    department = models.CharField('Кафедра', max_length=50, blank=True)
    email = models.EmailField('Email', blank=True)
    phone_number = models.CharField('Номер телефона преподавателя', max_length=20, blank=True, )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Преподаватель'
        verbose_name_plural = 'Преподаватели'

class Subject(models.Model):
    name = models.CharField('Предмет', max_length=100, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Предмет'
        verbose_name_plural = 'Предметы'

class Classroom(models.Model):
    name = models.CharField('Аудитория', max_length=10, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Аудитория'
        verbose_name_plural = 'Аудитории'

class StudyGroup(models.Model):
    name = models.CharField('Группа', max_length=10, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Группа'
        verbose_name_plural = 'Группы'

class LessonQuerySet(models.QuerySet):

    def delete(self, *args, **kwargs):
        super().delete(*args, **kwargs)
        Weeks.objects.all().delete()
        first_days_list = GetFirstDaysOfAllWeeks(GetLessonsIn3Months())
        for day in first_days_list:
            w = Weeks.objects.create(week=day)
            if datetime.strptime(day, '%Y-%m-%d').date() == date.today():
                w.update(current=True)
            w.save()

class Lesson(models.Model):

    objects = LessonQuerySet.as_manager()

    class_number_choices = [
        (1, '1'),
        (2, '2'),
        (3, '3'),
        (4, '4'),
        (5, '5'),
        (6, '6'),
    ]

    speaker = models.ForeignKey(Speaker, verbose_name='Преподаватель', on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, verbose_name='Предмет', on_delete=models.CASCADE)
    classroom = models.ForeignKey(Classroom, verbose_name='Аудитория', on_delete=models.CASCADE)
    class_number = models.IntegerField('Номер пары', choices=class_number_choices)
    study_group = models.ForeignKey(StudyGroup, verbose_name='Группа', on_delete=models.CASCADE)
    date_day = models.DateField(verbose_name='Дата занятия')


    def __str__(self):
        return str(self.subject) + ' ' + str(self.speaker) + ' ' + str(self.classroom) + ' ' + str(self.date_day)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        Weeks.objects.all().delete()
        first_days_list = GetFirstDaysOfAllWeeks(GetLessonsIn3Months())
        for day in first_days_list:
            w = Weeks.objects.create(week=day)
            if datetime.strptime(day, '%Y-%m-%d').date() == date.today():
                w.update(current=True)
            w.save()


    def delete(self, *args, **kwargs):
        super().delete(*args, **kwargs)
        Weeks.objects.all().delete()
        first_days_list = GetFirstDaysOfAllWeeks(GetLessonsIn3Months())
        for day in first_days_list:
            w = Weeks.objects.create(week=day)
            if datetime.strptime(day, '%Y-%m-%d').date() == date.today():
                w.update(current=True)
            w.save()

    class Meta:
        verbose_name = 'Занятие'
        verbose_name_plural = 'Занятия'
        unique_together = ['class_number', 'study_group', 'date_day']


class Weeks(models.Model):

    week = models.CharField(max_length=10)
    current = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = 'Weeks'
  
    def __str__(self):
        return str(self.week) + ' ' + str(self.current)
