import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import RadioButtonsGroup from './Components/RadioButtonsGroup'
import ComboBox from './Components/ComboBox'
import LoadsTable from './Components/LoadsTable'
import Select from './Components/Select'
import { ApiURI, class_timetable } from '../AppConfig';
import getWeeksDays from '../Utils/GetWeeksDays';
import ScheduleRowWithContent from '../Components/Body/ScheduleRowWithContent';
import ScheduleCellWithWeekDays from '../Components/Body/ScheduleCellWithWeekDays';
import './Admin.css';
import getWeekNumber from '../Utils/GetWeekNumber';
import getFreeScheduleSlotsArray from '../Utils/GetFreeScheduleSlotsArray';
import addClassroomAvailabilityToScheduleFreeSlotsArray from '../Utils/AddClassroomAvailabilityToScheduleFreeSlotsArray';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


export default function Admin() {
    
    // Constants & vars

    const loadTitles = [
        'Предмет', 
        'Количество часов', 
        'Часов в расписании', 
        'Часов в неделю', 
        'Пар в неделю'
    ]

    // var scheduleUpdated

    // Components styles

    const loadTableStyles = makeStyles({
        table: {
            maxWidth: 950,
        },
        root: {
            maxWidth: 950,
        },
    });

    const selectStyles = makeStyles((theme) => ({
        formControl: {
          marginRight: theme.spacing(1),
          minWidth: 150,
        },
        selectEmpty: {
          marginTop: theme.spacing(2),
        },
      }));

    // State hooks
    
    const [selectedGroup, setSelectedGroup] = React.useState('');
    const [groupChoices, setGroupChoices] = React.useState([]);
    
    const [selectedTerm, setSelectedTerm] = React.useState('');
    const [termChoices, setTermChoices] = React.useState([]);
    
    const [loads, setLoads] = React.useState([]);

    const [lessons, setLessons] = React.useState([]);
    
    const [selectedWeek, setSelectedWeek] = React.useState('');
    const [selectedWeekParity, setSelectedWeekParity] = React.useState('');
    
    const [days, setDays] = React.useState([]);

    const [selectedSubject, setSelectedSubject] = React.useState('');
    const [selectedSpeaker, setSelectedSpeaker] = React.useState('');
    const [selectedClassroom, setSelectedClassroom] = React.useState('');
    const [speakerChoices, setSpeakerChoices] = React.useState([]);
    const [classroomChoices, setClassroomChoices] = React.useState([]);

    const [speakerClassesDistance, setSpeakerClassesDistance] = React.useState([]);
    const [speakerClassesFulltime, setSpeakerClassesFulltime] = React.useState([]);
    const [speakerBlockedSlotsDistance, setSpeakerBlockedSlotsDistance] = React.useState([]);
    const [speakerBlockedSlotsFulltime, setSpeakerBlockedSlotsFulltime] = React.useState([]);

    const [scheduleFreeSlotsArray, setScheduleFreeSlotsArray] = React.useState();
    
    const [selectedDate, setSelectedDate] = React.useState();
    const [selectedDay, setSelectedDay] = React.useState();
    const [selectedClassnumber, setSelectedClassnumber] = React.useState();
    const [scheduleUpdated, setScheduleUpdated] = React.useState();


    

    // handle components changes

    const handleChangeTerm = (event) => {
        setSelectedTerm(termChoices.filter(term => term.number === event.target.value)[0]);
        setSelectedWeek('');
        setSelectedSpeaker('');
        setSelectedClassroom('');
        setSelectedSubject('');
        setScheduleFreeSlotsArray();
        clearSelectedSlot();
    };
    
    const handleChangeGroup = (event, value) => {
        value ? setSelectedGroup(value) : setSelectedGroup('');
        setSelectedWeek('');
        setSelectedSpeaker('');
        setSelectedClassroom('');
        setSelectedSubject('');
        setScheduleFreeSlotsArray();
        clearSelectedSlot();
    }
    
    const handleChangeWeek = (event) => {
        setSelectedWeek(event.target.value);
        clearSelectedSlot();
    };

    const handleChangeSpeaker = (event) => {
        setSelectedSpeaker(event.target.value);
        clearSelectedSlot();
    };
    
    const handleChangeSubject = (event, value) => {
        setSelectedSubject(value.id);
        setSelectedSpeaker('');
        setSelectedClassroom('');
        clearSelectedSlot();
    };

    const handleChangeClassroom = (event) => {
        setSelectedClassroom(event.target.value);
        clearSelectedSlot();
    };

    const handleChangeDate = (target) => {
        if (selectedClassroom) {
            setSelectedDate(target.attributes.date.value);
        }
    };

    const handleChangeDay = (target) => {
        if (selectedClassroom) {
            setSelectedDay(target.attributes.day.value);
        }
    };

    const handleChangeClassnumber = (target) => {
        if (selectedClassroom) {
            setSelectedClassnumber(target.attributes.classnumber.value);
        }
    };

    const handleDateDelete = () => {
        setSelectedDate();
    };

    const handleDayDelete = () => {
        setSelectedDay();
    };

    const handleClassnumberDelete = () => {
        setSelectedClassnumber();
    };

    const clearSelectedSlot = () => {
        handleDateDelete();
        handleDayDelete();
        handleClassnumberDelete();
    }

    // data fetching

    const [subjectInfoLoading, setSubjectInfoLoading] = React.useState(false);
    const [speakerDataLoaded, setSpeakerDataLoaded] = React.useState(false);
    const [speakerDataLoading, setSpeakerDataLoading] = React.useState(false);
    const [groupsAndTermsLoading, setGroupsAndTermsLoading] = React.useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setGroupsAndTermsLoading(true);            
            await fetch(ApiURI + '/groups/')
            .then(response => response.json())
            .then(result => setGroupChoices(result));
            await fetch(ApiURI + '/terms/')
            .then(response => response.json())
            .then(result => setTermChoices(result))
            setGroupsAndTermsLoading(false);
        };
        fetchData();
    }, [])
  
    useEffect(() => {
        if (selectedTerm && selectedGroup) {
            const fetchData = async () => {
                await fetch(ApiURI + '/loads/')
                .then(response => response.json())
                .then(result => {
                    setLoads(
                        result.filter(load => load.group === selectedGroup.id && load.term === selectedTerm.id)
                    )
                });
            };
            fetchData();
        };

        if (selectedTerm && selectedGroup.mode_of_study === 'distance') {
            const fetchData = async () => {
                await fetch(ApiURI + '/lessons_distance/')
                .then(response => response.json())
                .then(result => {
                    setLessons(
                        result.filter(lesson => lesson.term === selectedTerm.id)
                    )
                });
                };
                fetchData();
            };
            
        if (selectedTerm && selectedGroup.mode_of_study === 'fulltime') {
            const fetchData = async () => {
                await fetch(ApiURI + '/lessons_fulltime/')
                .then(response => response.json())
                .then(result => {
                    setLessons(
                        result.filter(lesson => lesson.term === selectedTerm.id)
                    )
                });
                };
                fetchData();
            };

    }, [selectedGroup, selectedTerm, scheduleUpdated])

    useEffect(() => {
        if (selectedSubject) {
            const fetchData = async () => {
                setSubjectInfoLoading(true);
                const result = await fetch(ApiURI + '/subjects/' + selectedSubject)
                .then(response => response.json());
                setSpeakerChoices(result.speaker_list);
                setClassroomChoices(result.classrooms_list);
                setSubjectInfoLoading(false);
            };
            fetchData();
        };
    }, [selectedSubject])

    useEffect(() => {
        if (selectedSpeaker) {
            const fetchData = async () => {
                setSpeakerDataLoading(true);
                await fetch(ApiURI + '/lessons_distance/')
                .then(response => response.json())
                .then(result => 
                        setSpeakerClassesDistance(result.filter(c => c.speaker === selectedSpeaker && c.term === selectedTerm.id))
                    );
                await fetch(ApiURI + '/lessons_fulltime/')
                .then(response => response.json())
                .then(result => 
                        setSpeakerClassesFulltime(result.filter(c => c.speaker === selectedSpeaker && c.term === selectedTerm.id))
                    );
                await fetch(ApiURI + '/speakerblockedtimefulltime/')
                .then(response => response.json())
                .then(result => 
                        setSpeakerBlockedSlotsFulltime(result.filter(slot => slot.speaker_info.name === selectedSpeaker))
                    );
                await fetch(ApiURI + '/speakerblockedtimedistance/')
                .then(response => response.json())
                .then(result => 
                        setSpeakerBlockedSlotsDistance(result.filter(slot => slot.speaker_info.name === selectedSpeaker))
                    );
                setSpeakerDataLoading(false);
                setSpeakerDataLoaded(true);
            };
            fetchData();
        };
    }, [selectedSpeaker, selectedTerm])


    // effect hooks

    useEffect(() => {
        if (speakerDataLoaded) {
            var group_lessons = lessons.filter(l => l.study_group === selectedGroup.name);
            setScheduleFreeSlotsArray(getFreeScheduleSlotsArray(selectedGroup.mode_of_study, days, group_lessons, selectedWeekParity, speakerClassesDistance, speakerClassesFulltime, speakerBlockedSlotsDistance, speakerBlockedSlotsFulltime));

            setSpeakerDataLoaded(false);
        }
    }, [speakerDataLoaded, days, lessons, selectedWeekParity, speakerClassesDistance, speakerClassesFulltime, speakerBlockedSlotsDistance, speakerBlockedSlotsFulltime, selectedGroup.name])

    useEffect(() => {
        if (selectedWeek) {
            selectedWeek === "Чётная" && setSelectedWeekParity('even');
            selectedWeek === "Нечётная" && setSelectedWeekParity('uneven');
            setDays(getWeeksDays(selectedWeek, selectedGroup.mode_of_study));
            let date = new Date(selectedWeek);
            let selectedWeekNumber = getWeekNumber(date);
            if (selectedWeekNumber % 2 === 0) 
            setSelectedWeekParity('even')
            else if (selectedWeekNumber % 2 === 1) 
            setSelectedWeekParity('uneven')
        }

        if (selectedWeek && selectedSubject && selectedSpeaker) {
            var group_lessons = lessons.filter(l => l.study_group === selectedGroup.name);
            var updated_days = getWeeksDays(selectedWeek, selectedGroup.mode_of_study);
            setScheduleFreeSlotsArray(getFreeScheduleSlotsArray(selectedGroup.mode_of_study, updated_days, group_lessons, selectedWeekParity, speakerClassesDistance, speakerClassesFulltime, speakerBlockedSlotsDistance, speakerBlockedSlotsFulltime));
        }
    }, [selectedWeek, selectedGroup.mode_of_study, selectedWeekParity, speakerClassesDistance, speakerClassesFulltime, speakerBlockedSlotsDistance, speakerBlockedSlotsFulltime, lessons, selectedGroup.name, selectedSpeaker, selectedSubject])

    useEffect(() => {
        if (selectedSpeaker) {
            setScheduleFreeSlotsArray(addClassroomAvailabilityToScheduleFreeSlotsArray(selectedGroup.mode_of_study, selectedClassroom, scheduleFreeSlotsArray, lessons, selectedWeekParity))
        }
    }, [selectedClassroom])
    
    // publishing classes

    function publishClass() {

        let data
        let request

        if (selectedGroup.mode_of_study === 'distance') {
            data = JSON.stringify({
                "date_day": selectedDate,
                "class_number": parseInt(selectedClassnumber),
                "speaker": speakerChoices.filter(s => s.name === selectedSpeaker)[0].id,
                "subject": selectedSubject,
                "classroom": classroomChoices.filter(c => c.name === selectedClassroom)[0].id,
                "study_group": selectedGroup.id,
                "term": selectedTerm.id
            })
            request = new Request(ApiURI + '/post_distance_lesson/', {method: 'POST', body: data, headers: {'Content-Type': 'application/json'}});
        }

        if (selectedGroup.mode_of_study === 'fulltime') {
            data = JSON.stringify({
                "day": selectedDay,
                "week_parity": selectedWeekParity,
                "class_number": parseInt(selectedClassnumber),
                "speaker": speakerChoices.filter(s => s.name === selectedSpeaker)[0].id,
                "subject": selectedSubject,
                "classroom": classroomChoices.filter(c => c.name === selectedClassroom)[0].id,
                "study_group": selectedGroup.id,
                "term": selectedTerm.id
            })
            request = new Request(ApiURI + '/post_fulltime_lesson/', {method: 'POST', body: data, headers: {'Content-Type': 'application/json'}});
        }

        fetch(request)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

        setScheduleUpdated(Math.random());

    }

    return (
        <div className="Admin"> 
            <div className="header">
                <Link to="./">Вернуться к расписанию <span role="img" aria-label="hat">🎓</span></Link>  
                <h2>
                Административный интерфейс
                </h2>
            </div>
            <div className="selects">
                {
                    groupsAndTermsLoading ? (<div className="helptext"><i>Загрузка учебных групп... </i></div>) : (
                        <ComboBox 
                            label="Группа"
                            options={groupChoices}
                            clearText="Очистить"
                            noOptionsText="Группа не найдена"
                            autoHighlight={true}
                            handleChange={handleChangeGroup}
                            getOptionLabel={option => option.name}
                            style={{ width: 170, marginRight: 16 }}
                        />
                    )
                }
                {
                    groupsAndTermsLoading ? (<div className="helptext"><i>Загрузка семестров...</i></div>) : (
                        <RadioButtonsGroup 
                            label="Семестр"
                            handleChange={handleChangeTerm}
                            choices={termChoices}
                        />
                    )
                }
            </div>
            {
                (selectedTerm && selectedGroup) && 
                    <LoadsTable
                        titles={loadTitles}
                        useStyles={loadTableStyles}
                        lessons={lessons}
                        loads={loads}
                        selectedTerm={selectedTerm}
                        study_mode={selectedGroup.mode_of_study}
                    />
            }
            <br />
            <div className="selects">
                {
                    (selectedGroup && selectedTerm) &&
                    <div>
                        <Select
                        useStyles={selectStyles}
                        handleChange={handleChangeWeek}
                        value={selectedWeek}
                        label="Неделя"
                        values={selectedGroup.mode_of_study === 'distance' ? selectedTerm.weeks : ['Чётная', 'Нечётная']}
                        />
                    </div>
                }
                {
                    selectedWeek &&
                    <ComboBox 
                            label="Предмет"
                            options={loads.map(load => load.subject_name)}
                            clearText="Очистить"
                            noOptionsText="Предмет не найден. Внесите хотя бы один предмет в учебный график."
                            autoHighlight={true}
                            handleChange={handleChangeSubject}
                            getOptionLabel={option => option.name + ' - ' + option.s_type}
                            style={{ width: 400, marginRight: 8 }}
                    />
                }
                {
                    (selectedSubject && selectedWeek && subjectInfoLoading) && 
                        <div className="helptext"><i>Загрузка информации о предмете...</i></div> 
                }
                {
                    (selectedSubject && selectedWeek && !subjectInfoLoading) &&
                            <div className="selects">
                                <Select
                                    useStyles={selectStyles}
                                    handleChange={handleChangeSpeaker}
                                    value={selectedSpeaker}
                                    label="Преподаватель"
                                    values={speakerChoices.map(speaker => speaker.name)}
                                />
                            </div>
                }
                {
                    selectedSpeaker &&
                    <div className="selects">
                        <Select
                            useStyles={selectStyles}
                            handleChange={handleChangeClassroom}
                            value={selectedClassroom}
                            label="Аудитория"
                            values={classroomChoices.map(classroom => classroom.name)}
                        />
                    </div>
                }
                {
                    (selectedSpeaker && selectedClassroom) &&
                    <Paper elevation={0}>
                    <div className="selects" style={{ height: 56 }}>
                        {
                            (selectedSpeaker && selectedClassroom && selectedDate && selectedGroup.mode_of_study === 'distance') && 
                                <Tooltip title="Выбранная дата" arrow>
                                    <Chip variant="outlined" label={selectedDate} onDelete={handleDateDelete} style={{ margin: 8, alignSelf: "center" }}/>
                                </Tooltip>
                        }
                        {
                            (selectedSpeaker && selectedClassroom && selectedGroup.mode_of_study === 'fulltime') && 
                                <Tooltip title="Выбранная неделя" arrow>
                                    <Chip variant="outlined" label={selectedWeekParity === 'even' ? 'Чётная' : 'Нечётная'} style={{ margin: 8 }}/>
                                </Tooltip>
                        }
                        {
                            (selectedSpeaker && selectedClassroom && selectedDay && selectedGroup.mode_of_study === 'fulltime') && 
                                <Tooltip title="Выбранный день" arrow>
                                    <Chip variant="outlined" label={selectedDay} onDelete={handleDayDelete} style={{ marginRight: 8, alignSelf: "center" }}/>
                                </Tooltip>
                        }
                        {
                            (selectedSpeaker && selectedClassroom && selectedClassnumber) && 
                                <Tooltip title="Выбранный номер пары" arrow>
                                    <Chip variant="outlined" label={selectedClassnumber} onDelete={handleClassnumberDelete} style={{ marginRight: 8, alignSelf: "center" }}/>
                                </Tooltip>
                        }
                        {
                            ((selectedSpeaker && selectedClassroom && selectedDate && selectedClassnumber) || ( selectedSpeaker && selectedClassroom && selectedDay && selectedWeekParity && selectedClassnumber )) ?
                            <>
                                <Tooltip title="Опубликовать занятие в расписание" arrow>
                                    <Button variant="contained" color="primary" style={{ margin: 8 }} onClick={publishClass}>Опубликовать занятие</Button>
                                </Tooltip>
                                {/* <Tooltip title="Добавить занятие как черновик" arrow>
                                    <Button variant="contained" style={{ margin: 8 }}>Добавить черновик</Button>
                                </Tooltip>
                                <Tooltip title="Удалить занятие" arrow>
                                    <Button color="secondary" style={{ margin: 8 }}>Удалить занятие</Button>
                                </Tooltip> */}
                            </>
                            :
                            (selectedSpeaker && selectedClassroom) &&
                            <Typography variant="body1" display="inline" style={{ marginRight: 8 }}><i>Выберите свободную ячейку в расписании</i></Typography>
                        }
                    </div>
                    </Paper>
                }
            </div>
            <div className="admin-schedule">
                {
                    selectedWeek &&
                    <Paper variant="outlined" style={{ marginTop: 8 }}>
                        <div className="Schedule-wrapper">
                            <div className="Schedule-row" id="0">
                                <div className="Schedule-cell" id="left">
                                </div>
                                    {days.map((day) => 
                                        <ScheduleCellWithWeekDays 
                                            day={day}
                                            key={day.day}
                                            study_mode={selectedGroup.mode_of_study}
                                            selected_week_fulltime={selectedWeek}
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
                                        lessons= {lessons}
                                        study_mode={selectedGroup.mode_of_study}
                                        selected_group={selectedGroup.name}
                                        selected_group_fulltime={selectedGroup.name}
                                        selected_week_fulltime={selectedWeek === 'Чётная' ? 'even' : 'uneven'}
                                        t={t}
                                        free_slots_array={scheduleFreeSlotsArray}
                                        handleChangeDate={handleChangeDate}
                                        handleChangeDay={handleChangeDay}
                                        handleChangeClassnumber={handleChangeClassnumber}
                                    />
                                )
                            }
                        </div>
                    </Paper>
                }
            </div>
        </div>
    )
            }