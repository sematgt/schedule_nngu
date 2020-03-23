from datetime import timedelta, date, datetime
from dateutil.relativedelta import relativedelta
# from schedule.models import Lesson
from django.apps import apps


def GetLessonsIn3Months() -> list:
    LessonFulltime = apps.get_model('schedule', 'LessonFulltime')
    q = LessonFulltime.objects.filter(date_day__lt=str(date.today() + relativedelta(months=+3)), date_day__gt=str(date.today() + relativedelta(months=-3)))

    date_list = [str(l.date_day) for l in q]
    
    date_list.sort()

    return date_list

def GetFirstDaysOfAllWeeks(date_list: list):
    first_days = []
    for date in date_list:
        date_object = datetime.strptime(date, '%Y-%m-%d').date()
        first_day = date_object - timedelta(days=(date_object.isoweekday()-1))
        first_days.append(first_day.strftime('%Y-%m-%d'))
        first_days = list(set(first_days))
        first_days.sort()
    return first_days

def ActualizeCurrentWeek():
    Weeks = apps.get_model('schedule', 'Weeks')
    all_weeks = Weeks.objects.all()
    for w in all_weeks:
            if w.week == GetFirstDaysOfAllWeeks([date.today().strftime('%Y-%m-%d')])[0]:
                w.current=True
            else:
                w.current=False
            w.save()
    
