// returns an array with day's numbers, weekdays and dates
// 0: {wday: "пн", day: 16, date: "2020-03-16"}
// 1: {wday: "вт", day: 17, date: "2020-03-17"}
// 2: {wday: "ср", day: 18, date: "2020-03-18"}
// 3: {wday: "чт", day: 19, date: "2020-03-19"}
// 4: {wday: "пт", day: 20, date: "2020-03-20"}
// 5: {wday: "сб", day: 21, date: "2020-03-21"}



export default function getWeeksDays(selected_week, study_mode) {
    var days = [];
    var d;
    var wd; // week day
    if (selected_week !== '' && study_mode === 'distance') {
        d = new Date(Date.parse(selected_week));
        wd = d.toLocaleDateString('RU-ru', { weekday: 'short' });
        days.push({
            wday: wd,
            day: d.getDate(),
            date: d.toISOString().slice(0,10),
        });
        for (let i=0; i<5; i++) {
            d.setDate(d.getDate()+1)
            wd = d.toLocaleDateString('RU-ru', { weekday: 'short' });
            days.push({
                wday: wd,
                day: d.getDate(),
                date: d.toISOString().slice(0,10),
            });
        };
    }
    else {
        d = new Date();
        if (d.getDay() !== 0) 
        d.setDate(d.getDate()-(d.getDay()-1))
        else
        d.setDate(d.getDate()-6);
        wd = d.toLocaleDateString('RU-ru', { weekday: 'short' });
        days.push({
            wday: wd,
            day: d.getDate(),
            date: d.toISOString().slice(0,10),
        });
        for (let i=0; i<5; i++) {
            d.setDate(d.getDate()+1);
            wd = d.toLocaleDateString('RU-ru', { weekday: 'short' });
            days.push({
                wday: wd,
                day: d.getDate(),
                date: d.toISOString().slice(0,10),
            });
        };
    }
    return days
}