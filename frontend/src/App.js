import React from 'react';
import './Main-wrapper.css';
import './Body.css';
import './Footer.css';
import './Header.css';
import DropdownGroups from './Components/DropdownGroups';
import DropdownWeeks from './Components/DropdownWeeks';
import Switch from './Components/Switch';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            groups_distance: [],
            groups_fulltime: [],
            weeks: [],
            lessons_distance: [],
            lessons_fulltime: [],
            groupsIsLoaded: false,
            weeksIsLoaded: false,
            lessons_distanceIsLoaded: false,
            lessons_fulltimeIsLoaded: false,
            error_in_groups: null,
            error_in_weeks: null,
            error_in_lessons_distance: null,
            error_in_lessons_fulltime: null,
            selected_week: '',
            selected_week_fulltime: '',
            selected_group: '',
            study_mode: 'distance',
        };
        this.weeks_fulltime = [
                {parity: 'Чётная', value: 'even'},
                {parity: 'Нечётная', value: 'uneven'},
            ];
        this.getDataFromAPI = this.getDataFromAPI.bind(this);
        this.getWeekFromDropdown = this.getWeekFromDropdown.bind(this);
        this.getWeekFromDropdownFulltime = this.getWeekFromDropdownFulltime.bind(this);
        this.handleTodayClick = this.handleTodayClick.bind(this);
        this.getGroupFromDropdown = this.getGroupFromDropdown.bind(this);
        this.handleRightArrowClick = this.handleRightArrowClick.bind(this);
        this.handleLeftArrowClick = this.handleLeftArrowClick.bind(this);
        this.myRef = React.createRef();
        this.getStudyModeFromSwitch = this.getStudyModeFromSwitch.bind(this);
    }
    
    getStudyModeFromSwitch(study_mode) {
        if (study_mode === true) {
            this.setState({study_mode: 'distance'});
        } 
        else if (study_mode === false) {
            this.setState({study_mode: 'fulltime'});
        }
    }

    getWeekFromDropdown(selected_week) {
        this.setState({selected_week: selected_week})
    }

    getWeekFromDropdownFulltime(selected_week) {
        this.setState({selected_week_fulltime: selected_week})
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
                    groups_distance: result.filter(group => group.mode_of_study === 'distance'),
                    groups_fulltime: result.filter(group => group.mode_of_study === 'fulltime'),
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
        
    
        fetch('http://localhost:5000/lessons_distance/')
        .then(response => response.json())
        .then(
            (result) => {
                this.setState({
                    lessons_distance: result,
                    lessons_distanceIsLoaded: true,
                });
            },
            (error_in_lessons_distance) => {
                this.setState({
                    lessons_distanceIsLoaded: true,
                    error_in_lessons_distance
                });
            }
            );

        fetch('http://localhost:5000/lessons_fulltime/')
        .then(response => response.json())
        .then(
            (result) => {
                this.setState({
                    lessons_fulltime: result,
                    lessons_fulltimeIsLoaded: true,
                });
            },
            (error_in_lessons_fulltime) => {
                this.setState({
                    lessons_fulltimeIsLoaded: true,
                    error_in_lessons_fulltime
                });
            }
            );

        
        }

    handleTodayClick() {
        if (this.state.study_mode === 'distance') {
            let current_week = this.state.weeks.find((week) => week.current);
            current_week ?
            this.myRef.current.changeSelectedWeek(current_week.week)
            :
            alert('Текущая неделя не найдена. Обратитесь к администратору.')
        } else if (this.state.study_mode === 'fulltime') {
            this.myRef.current.changeSelectedWeekFulltime(!this.state.selected_week_fulltime) // TODO
        }
    }
    
    handleRightArrowClick() {
        if (this.state.study_mode === 'distance') {
            if (this.state.selected_week)  {
            let selected_week = this.state.weeks.find(week => week.week === this.state.selected_week);
            let next_week = this.state.weeks.find(week => week.id === selected_week.id + 1);
            next_week &&
            this.myRef.current.changeSelectedWeek(next_week.week);
            }
        } else if (this.state.study_mode === 'fulltime') {
            if (this.state.selected_week_fulltime === 'even') {
                this.myRef.current.changeSelectedWeekFulltime('uneven');
            } else if (this.state.selected_week_fulltime === 'uneven') {
                this.myRef.current.changeSelectedWeekFulltime('even');
            }
        } 
    }
    

    handleLeftArrowClick() {
        if (this.state.study_mode === 'distance') {
            if (this.state.selected_week)  {
            let selected_week = this.state.weeks.find(week => week.week === this.state.selected_week);
            let prev_week = this.state.weeks.find(week => week.id === selected_week.id - 1);
            prev_week &&
            this.myRef.current.changeSelectedWeek(prev_week.week);
            }
        } else if (this.state.study_mode === 'fulltime') {
            if (this.state.selected_week_fulltime === 'even') {
                this.myRef.current.changeSelectedWeekFulltime('uneven');
            } else if (this.state.selected_week_fulltime === 'uneven') {
                this.myRef.current.changeSelectedWeekFulltime('even');
            }
        } 
    }

    render() {
        console.log('study mode in render - ', this.state.study_mode)
        console.log('selected_week in render - ', this.state.selected_week)
        console.log('selected_week_fulltime in render - ', this.state.selected_week_fulltime)
        console.log('weeks_fulltime in render - ', this.weeks_fulltime)
        var days = [];
        var d;
        var wd;
        if (this.state.selected_week && this.state.study_mode === 'distance') {
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
        
        const {groups_distance, groups_fulltime, weeks, lessons_distance, lessons_fulltime, groupsIsLoaded, weeksIsLoaded, lessons_distanceIsLoaded, lessons_fulltimeIsLoaded, error_in_groups, error_in_weeks, error_in_lessons_distance, error_in_lessons_fulltime, study_mode} = this.state;
        if (error_in_groups) {
            return <div>Ошибка: {error_in_groups.message} </div>;
        }
        else if (error_in_weeks) {
            return <div>Ошибка: {error_in_weeks.message} </div>;
        }
        else if (error_in_lessons_distance) {
            return <div>Ошибка: {error_in_lessons_distance.message} </div>;
        }
        else if (error_in_lessons_fulltime) {
            return <div>Ошибка: {error_in_lessons_fulltime.message} </div>;
        }
        else if (!weeksIsLoaded) {
            return <div>Загрузка weeks...</div>;
        } 
        else if (!groupsIsLoaded) {
            return <div>Загрузка groups...</div>;
        }
        else if (!lessons_distanceIsLoaded) {
            return <div>Загрузка lessons_distance...</div>;
        }
        else if (!lessons_fulltimeIsLoaded) {
            return <div>Загрузка lessons_fulltime...</div>;
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
                            <div className="Switch">
                                <Switch getStudyModeFromSwitch={this.getStudyModeFromSwitch}/>
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
                                <div>
                                {
                                    months.map(month => 
                                        month
                                    )
                                }   
                                </div>
                            </div>
                            <div className="Dropdown">
                                {
                                    study_mode === 'distance' && 
                                        <DropdownGroups text="Группа" groups={groups_distance} getGroupFromDropdown={this.getGroupFromDropdown}/>
                                } 
                                {
                                    study_mode === 'fulltime' && 
                                        <DropdownGroups text="Группа" groups={groups_fulltime} getGroupFromDropdown={this.getGroupFromDropdown}/>
                                } 
                            </div>

                            <div className="Dropdown">
                                <DropdownWeeks text="Неделя" weeks={weeks} weeks_fulltime={this.weeks_fulltime} getWeekFromDropdown={this.getWeekFromDropdown} getWeekFromDropdownFulltime={this.getWeekFromDropdownFulltime} ref={this.myRef} study_mode={study_mode} />
                            </div>
                            <div className="Nngu">
                                
                                    <img src="logo_nngu.png" alt="logo" />
                                    <div className="text">АФ ННГУ ИМ. Н.И. ЛОБАЧЕВСКОГО</div>
                            
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
                                            lessons={lessons_distance}
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
                                            lessons={lessons_distance}
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
                                            lessons={lessons_distance}
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
                                            lessons={lessons_distance}
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
                                            lessons={lessons_distance}
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
                                        <ScheduleCellWithContent
                                            key={"6" + day.day} 
                                            class_number="6"
                                            lessons={lessons_distance}
                                            day={day}
                                            selected_group={this.state.selected_group}
                                        />
                                    )
                                }
                            </div>
                        </div>
                        <div className="Footer">
                            <a href="https://github.com/semaphore8"  target="_blank" rel="noopener noreferrer">© 2019 Semyon Bliznyuk <span role="img" aria-label="Smile">🧐</span></a>
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
                            {lesson['subject']['name']}  
                        </div>
                        <div className="Lesson-speaker">
                            {lesson['speaker']} 
                        </div>
                        <div className="Lesson-classroom">
                        {lesson['subject']['s_type']} {lesson['classroom']}
                        </div>
                    </div>
                    
                }
            </div>
    )
}

function ScheduleCellWithWeekDays(props) {
    let date = new Date();
    return( 
            <div 
            className={["Schedule-cell", props.day.date === date.toISOString().slice(0,10) ? "Schedule-cell-weekday-today" : "Schedule-cell-weekday"].join(' ')} 
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