import React from 'react';
import './Body.css';
import './Footer.css';
import './Header.css';
import DropdownGroups from './Components/DropdownGroups';
import DropdownWeeks from './Components/DropdownWeeks';

// import axios from 'axios';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            weeks: [],
            groupsIsLoaded: false,
            weeksIsLoaded: false,
            error_in_groups: null,
            error_in_weeks: null,
            days: [],
            today: Date(),
            selected_week: 'default',
        };
        this.getDataFromAPI = this.getDataFromAPI.bind(this);
        this.getWeekFromDropdown = this.getWeekFromDropdown.bind(this);
    }

    getWeekFromDropdown(selected_week) {
        console.log(selected_week);
        this.setState({selected_week: selected_week})
    }

    componentDidMount() {
        this.getDataFromAPI();
        // var days_array = [for (i of [11, 12, 13, 14, 15, 16]) i];
        var days_array = [11, 12, 13, 14, 15, 16].map(i => i);
        this.setState({days: days_array});
        console.log(this.state.today)
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
    }

    render() {
        const {groups, weeks, groupsIsLoaded, weeksIsLoaded, error_in_groups, error_in_weeks} = this.state;
        if (error_in_groups) {
            return <div>Ошибка: {error_in_groups.message} </div>;
        }
            else if (error_in_weeks) {
                return <div>Ошибка: {error_in_weeks.message} </div>;
        }
            else if (!weeksIsLoaded) {
                return <div>Загрузка weeks...</div>;
        } 
            else if (!groupsIsLoaded) {
                return <div>Загрузка groups...</div>;
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
                            <div className="Today-button">
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
                                <DropdownGroups text="Группа" groups={groups} />
                            </div>

                            <div className="Dropdown">
                                <DropdownWeeks text="Неделя" weeks={weeks} getWeekFromDropdown={this.getWeekFromDropdown} />
                            </div>
                            <div className="Nngu">
                                Аф ННГУ им. Н.И. Лобачевского
                    </div>
                        </div>
                        <div className="Schedule-wrapper">
                            <div className="Schedule-row">
                                <div className="Schedule-cell" id="left">

                                </div>
                                <div className="Schedule-cell">{this.state.days[0]} {this.state.selected_week}</div>
                                <div className="Schedule-cell">{this.state.days[1]}</div>
                                <div className="Schedule-cell">{this.state.days[2]}</div>
                                <div className="Schedule-cell">{this.state.days[3]}</div>
                                <div className="Schedule-cell">{this.state.days[4]}</div>
                                <div className="Schedule-cell">{this.state.days[5]}</div>
                            </div>
                            <div className="Schedule-row">
                                <div className="Schedule-cell" id="left"><span>
                                    <big>I</big> 8:<small>00</small> - 9:<small>35</small></span>
                                </div>
                                <div className="Schedule-cell">
                                    Речевые практики (ПЗ)<br />
                                    доц. С.В. Зотова<br />
                                    (ауд.437)
                    </div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                            </div>
                            <div className="Schedule-row">
                                <div className="Schedule-cell" id="left"><span>
                                    <big>II</big> 9:<small>45</small> - 11:<small>20</small></span></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                            </div>
                            <div className="Schedule-row">
                                <div className="Schedule-cell" id="left"><span>
                                    <big>III</big> 12:<small>00</small> - 13:<small>35</small></span></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                            </div>
                            <div className="Schedule-row">
                                <div className="Schedule-cell" id="left"><span>
                                    <big>IV</big> 13:<small>45</small> - 15:<small>20</small></span></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                            </div>
                            <div className="Schedule-row">
                                <div className="Schedule-cell" id="left"><span>
                                    <big>V</big> 15:<small>30</small> - 17:<small>05</small></span></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                            </div>
                            <div className="Schedule-row" id="bottom">
                                <div className="Schedule-cell" id="left"><span>
                                    <big>VI</big> 17:<small>15</small> - 18:<small>50</small></span></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
                                <div className="Schedule-cell"></div>
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
