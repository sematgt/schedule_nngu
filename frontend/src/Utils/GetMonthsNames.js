// returns an array with months spelling names ['February'] or ['Feb.', '-', 'Mar.']

export default function getMonthsNames(days) {
    let months = [];
    let d1 = new Date(Date.parse(days[0]['date']));
    let d2 = new Date(Date.parse(days[days.length - 1]['date']));
    let m1 = d1.getMonth();
    let m2 = d2.getMonth();
    if (m1 === m2) 
    months.push(d1.toLocaleDateString('RU-ru', {month: 'long'}))
    else {
    months.push(d1.toLocaleDateString('RU-ru', {month: 'short'}));
    months.push(' - ');
    months.push(d2.toLocaleDateString('RU-ru', {month: 'short'}));
    }

    return months;
}