from django.db import models
from schedule.utils.calcutale import GetFirstDaysOfAllWeeks, GetLessonsIn3Months
import json
from datetime import date, datetime, timedelta
from django.core.validators import MinValueValidator, MaxValueValidator

class Speaker(models.Model):
    name = models.CharField('ФИО', max_length=70, unique=True)
    department = models.CharField('Кафедра', max_length=50, blank=True)
    email = models.EmailField('Email', blank=True)
    phone_number = models.CharField('Номер телефона преподавателя', max_length=20, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Преподаватель'
        verbose_name_plural = 'Преподаватели'

class SpeakerBlockedTimeDistance(models.Model):
    
    class_number_choices = [
        (1, '1'),
        (2, '2'),
        (3, '3'),
        (4, '4'),
        (5, '5'),
        (6, '6'),
    ]

    speaker = models.ForeignKey(Speaker, verbose_name='Преподаватель', on_delete=models.CASCADE)
    date_day = models.DateField(verbose_name='Дата занятия', blank=True, null=True)
    class_number = models.IntegerField('Номер пары', choices=class_number_choices)

    def __str__(self):
        return self.speaker.name

    class Meta:
        verbose_name = 'Заблокированное время у преподавателя (заочное расписание)'
        verbose_name_plural = 'Заблокированное время у преподавателя (заочное расписание)'

class SpeakerBlockedTimeFulltime(models.Model):
    
    class_number_choices = [
        (1, '1'),
        (2, '2'),
        (3, '3'),
        (4, '4'),
        (5, '5'),
        (6, '6'),
    ]

    parity = [
        ('even', 'Четная'),
        ('uneven', 'Нечетная')
    ]

    days = [
        ('Mon', 'пн'),
        ('Tue', 'вт'),
        ('Wed', 'ср'),
        ('Thu', 'чт'),
        ('Fri', 'пт'),
        ('Sat', 'сб'),
    ]

    speaker = models.ForeignKey(Speaker, verbose_name='Преподаватель', on_delete=models.CASCADE)
    class_number = models.IntegerField('Номер пары', choices=class_number_choices)
    week_parity = models.CharField('Неделя', max_length=10, choices=parity, blank=True, null=True)
    day = models.CharField('День', max_length=10, choices=days, blank=True, null=True)


    def __str__(self):
        return self.speaker.name

    class Meta:
        verbose_name = 'Заблокированное время у преподавателя (дневное расписание)'
        verbose_name_plural = 'Заблокированное время у преподавателя (дневное расписание)'



class Subject(models.Model):
    name = models.CharField('Предмет', max_length=100, help_text='Название предмета')
    speakers = models.ManyToManyField(Speaker, verbose_name='Преподаватели', blank=True, help_text='<span style="color: black; font-weight: 500;">Преподаватели, ведут предмет<pre>\n</pre></span>')
    classrooms = models.ManyToManyField('Classroom', verbose_name='Аудитории', blank=True, help_text='<span style="color: black; font-weight: 500;">Аудитории, в которых проводится занятие<pre>\n</pre></span>')

    subject_type_choices = [
        ('Lecture', 'Лекция'),
        ('Practice', 'Практика'),
        ('Lab', 'Лабораторная работа'),
    ]

    subject_type = models.CharField(
        'Тип занятия', 
        max_length=40, 
        choices=subject_type_choices, 
        default=None, 
        blank=True, 
        null=True,
        )

    def __str__(self):
        return self.name + ' - ' + self.get_subject_type_display()

    class Meta:
        verbose_name = 'Предмет'
        verbose_name_plural = 'Предметы'
        unique_together = ['name', 'subject_type']

class Classroom(models.Model):
    name = models.CharField('Аудитория', max_length=10, unique=True)
    size = models.IntegerField('Количество мест в аудитории', blank=True, null=True)


    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Аудитория'
        verbose_name_plural = 'Аудитории'

class StudyGroup(models.Model):
    name = models.CharField('Группа', max_length=10, unique=True)
    students_count = models.IntegerField('Количество студентов', blank=True, null=True)

    modes = [
        ('fulltime', 'Дневная'),
        ('distance', 'Заочная')
    ]

    mode_of_study = models.CharField('Форма обучения', max_length=20, choices=modes, blank=True, null=True)

    def get_distance_group(self):
        return self.objects.filter(modes__iexact='distance')
    
    def get_distance_group(self):
        return self.objects.filter(modes__iexact='fulltime')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Группа'
        verbose_name_plural = 'Группы'


class Term(models.Model):

    number_choices = [
        ('1', '1'),
        ('2', '2'),
    ]

    number = models.CharField('Номер', max_length=5, choices=number_choices, blank=True)
    weeks_count_fulltime = models.CharField('Кол-во недель (дневное)', max_length=5, blank=True)
    weeks_count_distance = models.CharField('Кол-во недель (вечернее)', max_length=5,  blank=True)
    distance_first_day = models.DateField('Первый день сессии заочников', null=True)
    distance_last_day = models.DateField('Последний день сессии заочников', null=True)
    
    def GetDistanceWeeks(self):
        days = []
        T1 = self.distance_first_day
        T2 = self.distance_last_day
        for i in range((T2-T1).days+1): 
            days.append((T1+timedelta(days=i)).__str__())
        
        return GetFirstDaysOfAllWeeks(days)

    class Meta:
        verbose_name = 'Семестр'
        verbose_name_plural = 'Семестры'

    def __str__(self):
        return self.number

class Load(models.Model):

    term = models.ForeignKey(Term, verbose_name='Семестр', on_delete=models.CASCADE, null=True)
    group = models.ForeignKey(StudyGroup, verbose_name='Группа', on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, verbose_name='Предмет', on_delete=models.CASCADE)
    hours_count = models.CharField(verbose_name='Кол-во часов', max_length=5)

    class Meta:
        verbose_name = 'Нагрузка'
        verbose_name_plural = 'Нагрузка'
        unique_together = ['term', 'group', 'subject']

    def __str__(self):
        return str(self.subject) + ' ' + str(self.group)

class LessonDistanceQuerySet(models.QuerySet):

    def delete(self, *args, **kwargs):
        super().delete(*args, **kwargs)
        Weeks.objects.all().delete()
        first_days_list = GetFirstDaysOfAllWeeks(GetLessonsIn3Months())
        for day in first_days_list:
            w = Weeks.objects.create(week=day)
            if datetime.strptime(day, '%Y-%m-%d').date().strftime('%Y-%m-%d') == GetFirstDaysOfAllWeeks([date.today().strftime('%Y-%m-%d')])[0]:
                w.current=True
            w.save()

class LessonDistance(models.Model):

    objects = LessonDistanceQuerySet.as_manager()

    class_number_choices = [
        (1, '1'),
        (2, '2'),
        (3, '3'),
        (4, '4'),
        (5, '5'),
        (6, '6'),
    ]

    date_day = models.DateField(verbose_name='Дата занятия', null=True)
    class_number = models.IntegerField('Номер пары', choices=class_number_choices)
    speaker = models.ForeignKey(Speaker, verbose_name='Преподаватель', on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, verbose_name='Предмет', on_delete=models.CASCADE)
    classroom = models.ForeignKey(Classroom, verbose_name='Аудитория', on_delete=models.CASCADE)
    study_group = models.ForeignKey(StudyGroup, verbose_name='Группа', on_delete=models.CASCADE, limit_choices_to={'mode_of_study': 'distance'})
    term = models.ForeignKey(Term, verbose_name='Семестр', blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.subject) + ' ' + str(self.speaker) + ' ' + str(self.classroom)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        Weeks.objects.all().delete()
        first_days_list = GetFirstDaysOfAllWeeks(GetLessonsIn3Months())
        for day in first_days_list:
            w = Weeks.objects.create(week=day)
            if datetime.strptime(day, '%Y-%m-%d').date().strftime('%Y-%m-%d') == GetFirstDaysOfAllWeeks([date.today().strftime('%Y-%m-%d')])[0]:
                w.current=True
            w.save()


    def delete(self, *args, **kwargs):
        super().delete(*args, **kwargs)
        Weeks.objects.all().delete()
        first_days_list = GetFirstDaysOfAllWeeks(GetLessonsIn3Months())
        for day in first_days_list:
            w = Weeks.objects.create(week=day)
            if datetime.strptime(day, '%Y-%m-%d').date().strftime('%Y-%m-%d') == GetFirstDaysOfAllWeeks([date.today().strftime('%Y-%m-%d')])[0]:
                w.current=True
            w.save()


    class Meta:
        verbose_name = 'Занятие заочное'
        verbose_name_plural = 'Занятия заочные'
        unique_together = ['class_number', 'study_group', 'date_day']
        ordering = ['date_day']  

class LessonFulltime(models.Model):

    class_number_choices = [
        (1, '1'),
        (2, '2'),
        (3, '3'),
        (4, '4'),
        (5, '5'),
        (6, '6'),
    ]

    parity = [
        ('even', 'Четная'),
        ('uneven', 'Нечетная')
    ]

    days = [
        ('Mon', 'пн'),
        ('Tue', 'вт'),
        ('Wed', 'ср'),
        ('Thu', 'чт'),
        ('Fri', 'пт'),
        ('Sat', 'сб'),
    ]

    speaker = models.ForeignKey(Speaker, verbose_name='Преподаватель', on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, verbose_name='Предмет', on_delete=models.CASCADE)
    classroom = models.ForeignKey(Classroom, verbose_name='Аудитория', on_delete=models.CASCADE)
    class_number = models.IntegerField('Номер пары', choices=class_number_choices)
    study_group = models.ForeignKey(StudyGroup, verbose_name='Группа', on_delete=models.CASCADE, limit_choices_to={'mode_of_study': 'fulltime'})
    week_parity = models.CharField('Неделя', max_length=10, choices=parity, null=True)
    day = models.CharField('День', max_length=10, choices=days, null=True)
    term = models.ForeignKey(Term, verbose_name='Семестр', blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.subject) + ' ' + str(self.speaker) + ' ' + str(self.classroom)

    class Meta:
        verbose_name = 'Занятие дневное'
        verbose_name_plural = 'Занятия дневные'
        unique_together = ['class_number', 'study_group', 'week_parity' , 'day']
        ordering = ['day']


class Weeks(models.Model):

    week = models.CharField('Неделя', max_length=10)
    current = models.BooleanField('Текущая', default=False)

    class Meta:
        verbose_name = 'Неделя'
        verbose_name_plural = 'Недели'
  
    def __str__(self):
        return str(self.week) + ' ' + str(self.current)
