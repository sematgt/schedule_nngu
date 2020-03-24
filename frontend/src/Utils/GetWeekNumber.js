// returns current week number

const getWeekNumber = () => {
    let now = new Date();
    let onejan = new Date(now.getFullYear(), 0, 1);
    let week = Math.ceil( (((now - onejan) / 86400000) + onejan.getDay() + 1) / 7 );
    return week
};

export default getWeekNumber