import React from 'react';
import './Main-wrapper.css';
import './Body.css';
import './Footer.css';
import './Header.css';
import DropdownGroups from './Components/DropdownGroups';
import DropdownWeeks from './Components/DropdownWeeks';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            weeks: [],
            lessons: [],
            groupsIsLoaded: false,
            weeksIsLoaded: false,
            lessonsIsLoaded: false,
            error_in_groups: null,
            error_in_weeks: null,
            error_in_lessons: null,
            selected_week: '',
            selected_group: '',
        };
        this.getDataFromAPI = this.getDataFromAPI.bind(this);
        this.getWeekFromDropdown = this.getWeekFromDropdown.bind(this);
        this.handleTodayClick = this.handleTodayClick.bind(this);
        this.getGroupFromDropdown = this.getGroupFromDropdown.bind(this);
        this.handleRightArrowClick = this.handleRightArrowClick.bind(this);
        this.handleLeftArrowClick = this.handleLeftArrowClick.bind(this);
        this.myRef = React.createRef();
    }
    
    getWeekFromDropdown(selected_week) {
        this.setState({selected_week: selected_week})
    }
    
    getGroupFromDropdown(selected_group) {
        this.setState({selected_group: selected_group})
    }

    componentDidMount() {
        this.getDataFromAPI();
    }
    
    getDataFromAPI() {
        fetch('http://localhost:5000/groups/')
        .then(response => response.json())
        .then(
            (result) => {
                this.setState({
                    groups: result,
                    groupsIsLoaded: true,
                });
            },
            (error_in_groups) => {
                this.setState({
                    groupsIsLoaded: true,
                    error_in_groups
                });
            }
            );
            
        fetch('http://localhost:5000/weeks/')
        .then(response => response.json())
        .then(
            (result) => {
                this.setState({
                    weeks: result,
                    weeksIsLoaded: true,
                });
            },
            (error_in_weeks) => {
                this.setState({
                    weeksIsLoaded: true,
                    error_in_weeks
                });
            }
            );
        
    
        fetch('http://localhost:5000/lessons/')
        .then(response => response.json())
        .then(
            (result) => {
                this.setState({
                    lessons: result,
                    lessonsIsLoaded: true,
                });
            },
            (error_in_lessons) => {
                this.setState({
                    lessonsIsLoaded: true,
                    error_in_lessons
                });
            }
            );

        
        }

    handleTodayClick() {
        let current_week = this.state.weeks.find((week) => week.current);
        current_week ?
        this.myRef.current.changeSelectedWeek(current_week.week)
        :
        alert('Текущая неделя не найдена. Обратитесь к администратору.')
    }
    
    handleRightArrowClick() {
        if (this.state.selected_week)  {
        let selected_week = this.state.weeks.find(week => week.week === this.state.selected_week);
        let next_week = this.state.weeks.find(week => week.id === selected_week.id + 1);
        next_week &&
        this.myRef.current.changeSelectedWeek(next_week.week);
        }
    }

    handleLeftArrowClick() {
        if (this.state.selected_week)  {
        let selected_week = this.state.weeks.find(week => week.week === this.state.selected_week);
        let prev_week = this.state.weeks.find(week => week.id === selected_week.id - 1);
        prev_week &&
        this.myRef.current.changeSelectedWeek(prev_week.week);
        }
    }

    render() {

        var days = [];
        var d;
        var wd;
        if (this.state.selected_week) {
            d = new Date(Date.parse(this.state.selected_week));
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
        function getMonthsNames(days) {
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
        var months = getMonthsNames(days);
        
        const {groups, weeks, lessons, groupsIsLoaded, weeksIsLoaded, lessonsIsLoaded, error_in_groups, error_in_weeks, error_in_lessons} = this.state;
        if (error_in_groups) {
            return <div>Ошибка: {error_in_groups.message} </div>;
        }
        else if (error_in_weeks) {
                return <div>Ошибка: {error_in_weeks.message} </div>;
        }
            else if (error_in_lessons) {
                return <div>Ошибка: {error_in_lessons.message} </div>;
        }
            else if (!weeksIsLoaded) {
                return <div>Загрузка weeks...</div>;
        } 
            else if (!groupsIsLoaded) {
                return <div>Загрузка groups...</div>;
        }
            else if (!lessonsIsLoaded) {
                return <div>Загрузка lessons...</div>;
        }
            else 
                return (
                    <div className="Main-wrapper">
                        <div className="Header">
                            <div className="Hat">
                                <span role="img" aria-label="Logo">🎓</span>
                            </div>
                            <div className="Title">
                                Расписание
                    </div>
                            <div className="Today-button" onClick={this.handleTodayClick}>
                                <button>Сегодня</button>
                            </div>
                            <div className="Arrow">
                                <button onClick={this.handleLeftArrowClick}>&#60;</button>
                            </div>
                            <div className="Arrow">
                                <button onClick={this.handleRightArrowClick}>&#62;</button>
                            </div>
                            <div className="Months">
                                {
                                    months.map(month => 
                                        month
                                    )
                                }   
                            </div>
                            <div className="Dropdown">
                                <DropdownGroups text="Группа" groups={groups} getGroupFromDropdown={this.getGroupFromDropdown}/>
                            </div>

                            <div className="Dropdown">
                                <DropdownWeeks text="Неделя" weeks={weeks} getWeekFromDropdown={this.getWeekFromDropdown} ref={this.myRef} />
                            </div>
                            <div className="Nngu">
                                Аф ННГУ им. Н.И. Лобачевского
                    </div>
                        </div>
                        <div className="Schedule-wrapper">
                            <div className="Schedule-row" id="0">
                                <div className="Schedule-cell" id="left">
                                </div>
                                {days.map((day) => 
                                <ScheduleCellWithWeekDays 
                                    day={day}
                                    key={day.day}
                                />
                                )
                                }
                            </div>
                            <div className="Schedule-row" id="1">
                                <div className="Schedule-cell" id="left"><span>
                                    <big>I</big> 8:<small>00</small> - 9:<small>35</small></span>
                                </div>
                                {
                                    days.map(day => 
                                        <ScheduleCellWithContent 
                                            key={"1" + day.day}
                                            class_number="1"
                                            lessons={lessons}
                                            day={day}
                                            selected_group={this.state.selected_group}
                                        />
                                )    
                                }
                            </div>
                            <div className="Schedule-row" id="2">
                                <div className="Schedule-cell" id="left"><span>
                                    <big>II</big> 9:<small>45</small> - 11:<small>20</small></span></div>
                                    {
                                    days.map(day => 
                                        <ScheduleCellWithContent
                                            key={"2" + day.day} 
                                            class_number="2"
                                            lessons={lessons}
                                            day={day}
                                            selected_group={this.state.selected_group}
                                        />
                                    )
                                }
                            </div>
                            <div className="Schedule-row" id="3">
                                <div className="Schedule-cell" id="left"><span>
                                    <big>III</big> 12:<small>00</small> - 13:<small>35</small></span></div>
                                    {
                                    days.map(day => 
                                        <ScheduleCellWithContent
                                            key={"3" + day.day} 
                                            class_number="3"
                                            lessons={lessons}
                                            day={day}
                                            selected_group={this.state.selected_group}
                                        />
                                    )
                                }
                            </div>
                            <div className="Schedule-row" id="4">
                                <div className="Schedule-cell" id="left"><span>
                                    <big>IV</big> 13:<small>45</small> - 15:<small>20</small></span></div>
                                    {
                                    days.map(day => 
                                        <ScheduleCellWithContent
                                            key={"4" + day.day} 
                                            class_number="4"
                                            lessons={lessons}
                                            day={day}
                                            selected_group={this.state.selected_group}
                                        />
                                    )
                                }
                            </div>
                            <div className="Schedule-row" id="5">
                                <div className="Schedule-cell" id="left"><span>
                                    <big>V</big> 15:<small>30</small> - 17:<small>05</small></span></div>
                                    {
                                    days.map(day => 
                                        <ScheduleCellWithContent
                                            key={"5" + day.day} 
                                            class_number="5"
                                            lessons={lessons}
                                            day={day}
                                            selected_group={this.state.selected_group}
                                        />
                                    )
                                }
                            </div>
                            <div className="Schedule-row" id="bottom">
                                <div className="Schedule-cell" id="left"><span>
                                    <big>VI</big> 17:<small>15</small> - 18:<small>50</small></span></div>
                                    {
                                    days.map(day => 
                                        <div className="Schedule-cell" key={"6" + day.day}>
                                            {
                                                lessons.find(lesson => lesson.date_day === day.date && lesson.class_number === '6' && lesson.study_group === this.state.selected_group) && 
                                                <div className="Schedule-cell-content">
                                                    <div className="Lesson-subject">
                                                        {lessons.find(lesson => lesson.date_day === day.date && lesson.class_number === '6' && lesson.study_group === this.state.selected_group)['subject']}  
                                                    </div>
                                                    <div className="Lesson-speaker">
                                                        {lessons.find(lesson => lesson.date_day === day.date && lesson.class_number === '6' && lesson.study_group === this.state.selected_group)['speaker']} 
                                                    </div>
                                                    <div className="Lesson-classroom">
                                                        {lessons.find(lesson => lesson.date_day === day.date && lesson.class_number === '6' && lesson.study_group === this.state.selected_group)['classroom']}
                                                    </div>
                                                </div>
                                                
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="Footer">
                            <a href="https://github.com/sgbliznyuk"  target="_blank" rel="noopener noreferrer">© 2019 Simon B <span role="img" aria-label="Smile">🧐</span></a>
                        </div>
                    </div>
        );
    }
}

function ScheduleCellWithContent(props) {
    let lesson = props.lessons.find(lesson => lesson.date_day === props.day.date && lesson.class_number === props.class_number && lesson.study_group === props.selected_group)
    return(
            <div className="Schedule-cell" key={props.class_number + props.day.day}>
                {
                    lesson && 
                    <div className="Schedule-cell-content">
                        <div className="Lesson-subject">
                            {lesson['subject']}  
                        </div>
                        <div className="Lesson-speaker">
                            {lesson['speaker']} 
                        </div>
                        <div className="Lesson-classroom">
                            {lesson['classroom']}
                        </div>
                    </div>
                    
                }
            </div>
    )
}

function ScheduleCellWithWeekDays(props) {
    let date = new Date();
    let today = date.getDate();
    return(
            <div 
            className={["Schedule-cell", props.day.day === today ? "Schedule-cell-weekday-today" : "Schedule-cell-weekday"].join(' ')} 
            key={props.day.day}
            >
            <div className="wday">
                <div>
                {props.day.wday}
                </div>
            </div>
            <div className="day">
                <div>
                {props.day.day}
                </div>
            </div>
            </div>
    )
    

}

export default App;
