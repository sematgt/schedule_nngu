# 📅 Schedule nngu

Django + React university schedule single page application for students with dedicated admin interface.

![frontend](./previews/frontend_preview.png)

This app is provided to manage Full-time and Distance study mode classes and groups. You can change the mode by toggling the switch in front of the page.

Then in dropdowns you can choose the study group and the week.

Finally you can switch weeks by toggling arrow buttons and also jump to current date by clicking a "Today" button (the only one button in UI with some cyrillic text 🙂).

## Run

```bash
cd ./backend
python manage.py runserver 5000
```

```bash
cd ./frontend
npm start
```

Frontend is up on http://localhost:3000/

Backend API endpoint http://localhost:5000/

Backend admin interface http://localhost:5000/admin *admin:admin*

## Contrib

If you liked this app and want it to be translated to english, feel free to [open an issue](https://github.com/semaphore8/schedule_nngu/issues/new/choose) and I'll figure it out.
