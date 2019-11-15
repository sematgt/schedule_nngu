import React from 'react';
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
        var days_array = [11, 12, 13, 14, 15, 16].map(i => i);
        this.setState({days: days_array});
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

    render() {

        var days= [];
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
            else {
                return (
                    <div>
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
                                <button>&#60;</button>
                            </div>
                            <div className="Arrow">
                                <button>&#62;</button>
                            </div>
                            <div className="Months">
                                Октябрь 2019
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
                                {this.state.selected_week} <br/> {this.state.selected_group}
                                </div>
                                {days.map((day) => <div 
                                className="Schedule-cell" 
                                key={day.day}
                                >
                                {day.wday}<br />{day.day}
                                </div>)
                                }
                            </div>
                            <div className="Schedule-row" id="1">
                                <div className="Schedule-cell" id="left"><span>
                                    <big>I</big> 8:<small>00</small> - 9:<small>35</small></span>
                                </div>
                                {/* TODO: make code below DRY */}
                                {
                                    days.map(day => 
                                        <div className="Schedule-cell" key={"1" + day.day}>
                                            {
                                                lessons.find(lesson => lesson.date_day === day.date && lesson.class_number === '1' && lesson.study_group === this.state.selected_group) && 
                                                <div>
                                                    {lessons.find(lesson => lesson.date_day === day.date && lesson.class_number === '1' && lesson.study_group === this.state.selected_group)['subject']} <br/> 
                                                    {lessons.find(lesson => lesson.date_day === day.date && lesson.class_number === '1' && lesson.study_group === this.state.selected_group)['speaker']} <br/>
                                                    {lessons.find(lesson => lesson.date_day === day.date && lesson.class_number === '1' && lesson.study_group === this.state.selected_group)['classroom']}
                                                </div>
                                                
                                            }
                                        </div>
                                    )
                                }
                            </div>
                            <div className="Schedule-row" id="2">
                                <div className="Schedule-cell" id="left"><span>
                                    <big>II</big> 9:<small>45</small> - 11:<small>20</small></span></div>
                                    {
                                    days.map(day => 
                                        <div className="Schedule-cell" key={"2" + day.day}>
                                            {
                                                lessons.find(lesson => lesson.date_day === day.date && lesson.class_number === '2' && lesson.study_group === this.state.selected_group) && 
                                                <div>
                                                    {lessons.find(lesson => lesson.date_day === day.date && lesson.class_number === '2' && lesson.study_group === this.state.selected_group)['subject']} <br/> 
                                                    {lessons.find(lesson => lesson.date_day === day.date && lesson.class_number === '2' && lesson.study_group === this.state.selected_group)['speaker']} <br/>
                                                    {lessons.find(lesson => lesson.date_day === day.date && lesson.class_number === '2' && lesson.study_group === this.state.selected_group)['classroom']}
                                                </div>
                                                
                                            }
                                        </div>
                                    )
                                }
                            </div>
                            <div className="Schedule-row" id="3">
                                <div className="Schedule-cell" id="left"><span>
                                    <big>III</big> 12:<small>00</small> - 13:<small>35</small></span></div>
                                    {
                                    days.map(day => 
                                        <div className="Schedule-cell" key={"3" + day.day}>
                                            {
                                                lessons.find(lesson => lesson.date_day === day.date && lesson.class_number === '3' && lesson.study_group === this.state.selected_group) && 
                                                <div>
                                                    {lessons.find(lesson => lesson.date_day === day.date && lesson.class_number === '3' && lesson.study_group === this.state.selected_group)['subject']} <br/> 
                                                    {lessons.find(lesson => lesson.date_day === day.date && lesson.class_number === '3' && lesson.study_group === this.state.selected_group)['speaker']} <br/>
                                                    {lessons.find(lesson => lesson.date_day === day.date && lesson.class_number === '3' && lesson.study_group === this.state.selected_group)['classroom']}
                                                </div>
                                                
                                            }
                                        </div>
                                    )
                                }
                            </div>
                            <div className="Schedule-row" id="4">
                                <div className="Schedule-cell" id="left"><span>
                                    <big>IV</big> 13:<small>45</small> - 15:<small>20</small></span></div>
                                    {
                                    days.map(day => 
                                        <div className="Schedule-cell" key={"4" + day.day}>
                                            {
                                                lessons.find(lesson => lesson.date_day === day.date && lesson.class_number === '4' && lesson.study_group === this.state.selected_group) && 
                                                <div>
                                                    {lessons.find(lesson => lesson.date_day === day.date && lesson.class_number === '4' && lesson.study_group === this.state.selected_group)['subject']} <br/> 
                                                    {lessons.find(lesson => lesson.date_day === day.date && lesson.class_number === '4' && lesson.study_group === this.state.selected_group)['speaker']} <br/>
                                                    {lessons.find(lesson => lesson.date_day === day.date && lesson.class_number === '4' && lesson.study_group === this.state.selected_group)['classroom']}
                                                </div>
                                                
                                            }
                                        </div>
                                    )
                                }
                            </div>
                            <div className="Schedule-row" id="5">
                                <div className="Schedule-cell" id="left"><span>
                                    <big>V</big> 15:<small>30</small> - 17:<small>05</small></span></div>
                                    {
                                    days.map(day => 
                                        <div className="Schedule-cell" key={"5" + day.day}>
                                            {
                                                lessons.find(lesson => lesson.date_day === day.date && lesson.class_number === '5' && lesson.study_group === this.state.selected_group) && 
                                                <div>
                                                    {lessons.find(lesson => lesson.date_day === day.date && lesson.class_number === '5' && lesson.study_group === this.state.selected_group)['subject']} <br/> 
                                                    {lessons.find(lesson => lesson.date_day === day.date && lesson.class_number === '5' && lesson.study_group === this.state.selected_group)['speaker']} <br/>
                                                    {lessons.find(lesson => lesson.date_day === day.date && lesson.class_number === '5' && lesson.study_group === this.state.selected_group)['classroom']}
                                                </div>
                                                
                                            }
                                        </div>
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
                                                <div>
                                                    {lessons.find(lesson => lesson.date_day === day.date && lesson.class_number === '6' && lesson.study_group === this.state.selected_group)['subject']} <br/> 
                                                    {lessons.find(lesson => lesson.date_day === day.date && lesson.class_number === '6' && lesson.study_group === this.state.selected_group)['speaker']} <br/>
                                                    {lessons.find(lesson => lesson.date_day === day.date && lesson.class_number === '6' && lesson.study_group === this.state.selected_group)['classroom']}
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
}
export default App;
