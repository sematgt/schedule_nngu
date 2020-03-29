import React from 'react';
import './Body.css';
import './Footer.css';
import './Header.css';
import DropdownGroups from '../Components/Navigation/DropdownGroups';
import DropdownWeeks from '../Components/Navigation/DropdownWeeks';
import WeeksSwitch from '../Components/Navigation/WeeksSwitch';
import getWeekNumber from '../Utils/GetWeekNumber';
import getMonthsNames from '../Utils/GetMonthsNames';
import getWeeksDays from '../Utils/GetWeeksDays';
import ScheduleRowWithContent from '../Components/Body/ScheduleRowWithContent';
import ScheduleCellWithWeekDays from '../Components/Body/ScheduleCellWithWeekDays';
import { ApiURI, class_timetable } from '../Utils/AppConfig';


class App extends React.Component {

    state = {
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
        selected_group_fulltime: '',
        study_mode: 'distance',
    };

    weeks_fulltime = [
            {parity: 'Чётная', value: 'even'},
            {parity: 'Нечётная', value: 'uneven'},
        ];
        
    myRef = React.createRef();
    
    getStudyModeFromSwitch = study_mode => {
        if (study_mode === true) {
            this.setState({study_mode: 'distance'});
        } 
        else if (study_mode === false) {
            this.setState({study_mode: 'fulltime'});
        }
    }

    getWeekFromDropdown = selected_week => {
        this.setState({selected_week: selected_week})
    }

    getWeekFromDropdownFulltime = selected_week => {
        this.setState({selected_week_fulltime: selected_week})
    }
    
    getGroupFromDropdown = selected_group => {
        if (this.state.study_mode === 'distance')
        this.setState({selected_group: selected_group})
        else if (this.state.study_mode === 'fulltime')
        this.setState({selected_group_fulltime: selected_group})
    }

    componentDidMount() {
        this.getDataFromAPI();
    }
    
    getDataFromAPI = () => {
        fetch(ApiURI + '/groups/')
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
            
        fetch(ApiURI + '/weeks/')
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
        
    
        fetch(ApiURI + '/lessons_distance/')
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

        fetch(ApiURI + '/lessons_fulltime/')
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

    handleTodayClick = () => {
        if (this.state.study_mode === 'distance') {
            let current_week = this.state.weeks.find((week) => week.current);
            current_week ?
            this.myRef.current.changeSelectedWeek(current_week.week)
            :
            alert('Текущая неделя не найдена. Обратитесь к администратору.')
        } else if (this.state.study_mode === 'fulltime') {
            let current_week = getWeekNumber();
            if (current_week % 2 === 0) 
            this.myRef.current.changeSelectedWeekFulltime('even')
            else if (current_week % 2 === 1) 
            this.myRef.current.changeSelectedWeekFulltime('uneven')
        }
    }
    
    handleRightArrowClick = () => {
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
    

    handleLeftArrowClick = () => {
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
        var days = getWeeksDays(this.state.selected_week, this.state.study_mode); // get an array with day's numbers, weekdays and dates 
        var months = getMonthsNames(days); // get an array with months spelling names ['February'] or ['Feb.', '-', 'Mar.']
        const {groups_distance, groups_fulltime, weeks, lessons_distance, lessons_fulltime, groupsIsLoaded, weeksIsLoaded, lessons_distanceIsLoaded, lessons_fulltimeIsLoaded, error_in_groups, error_in_weeks, error_in_lessons_distance, error_in_lessons_fulltime, study_mode, selected_group, selected_week_fulltime, selected_group_fulltime} = this.state;
        
        // check for errors
        for (var l of [weeksIsLoaded, groupsIsLoaded, lessons_distanceIsLoaded, lessons_fulltimeIsLoaded]) {
            if (l === false) {
                return <div>Загрузка...</div>;
            }
        }
        for (var e of [error_in_groups, error_in_weeks, error_in_lessons_distance, error_in_lessons_fulltime]) {
            if (e != null) {
                return <div>Ошибка: {e.message} </div>;
            }
        }
        
        // render
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
                        <WeeksSwitch getStudyModeFromSwitch={this.getStudyModeFromSwitch}/>
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
                        <DropdownGroups text="Группа" groups_distance={groups_distance} groups_fulltime={groups_fulltime} getGroupFromDropdown={this.getGroupFromDropdown} study_mode={study_mode}/>
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
                                    study_mode={study_mode}
                                    selected_week_fulltime={selected_week_fulltime}
                                />
                            )
                            }
                    </div>
                    {
                        class_timetable.map(t => 
                            <ScheduleRowWithContent 
                                key={t.id}
                                row_number={t.id}
                                days={days}
                                lessons={study_mode === 'distance' ? lessons_distance : lessons_fulltime}
                                study_mode={study_mode}
                                selected_group={selected_group}
                                selected_group_fulltime={selected_group_fulltime}
                                selected_week_fulltime={selected_week_fulltime}
                                t={t}
                            />
                        )
                    }
                </div>
                <div className="Footer">
                    <a href="https://github.com/semaphore8"  target="_blank" rel="noopener noreferrer">© 2019 S. Bliznyuk <span role="img" aria-label="Smile">🧐</span></a>
                </div>
            </div>
    );
    }
}

export default App;