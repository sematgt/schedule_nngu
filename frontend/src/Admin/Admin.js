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

export default function Admin() {
    
    // Constants

    const loadTitles = [
        'Предмет', 
        'Количество часов', 
        'Часов в расписании', 
        'Часов в неделю', 
        'Пар в неделю'
    ]

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
          margin: theme.spacing(1),
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


    // handle components changes

    const handleChangeTerm = (event) => {
        setSelectedTerm(termChoices.filter(term => term.number === event.target.value)[0]);
        setSelectedWeek('');
        setSelectedSpeaker('');
        setSelectedClassroom('');
        setSelectedSubject('');
    };

    const handleChangeGroup = (event, value) => {
        value ? setSelectedGroup(value) : setSelectedGroup('');
        setSelectedWeek('');
        setSelectedSpeaker('');
        setSelectedClassroom('');
        setSelectedSubject('');
    }

    const handleChangeWeek = (event) => {
        setSelectedWeek(event.target.value);
    };

    const handleChangeSpeaker = (event) => {
        setSelectedSpeaker(event.target.value);
    };
    
    const handleChangeSubject = (event, value) => {
        setSelectedSubject(value.id);
        setSelectedSpeaker('');
        setSelectedClassroom('');
    };

    const handleChangeClassroom = (event) => {
        setSelectedClassroom(event.target.value);
    };

    // data fetching

    const [groupsLoading, setGroupsLoading] = React.useState(false);
    const [termsLoading, setTermsLoading] = React.useState(false);
    const [subjectInfoLoading, setSubjectInfoLoading] = React.useState(false);
    const [speakerClassesLoading, setSpeakerClassesLoading] = React.useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setGroupsLoading(true);            
            const result_groups = await fetch(ApiURI + '/groups/')
            .then(response => response.json());
            setGroupChoices(result_groups);
            setGroupsLoading(false);
            console.log('groups fetched');
        };
        fetchData();
    },[])

    useEffect(() => {
        const fetchData = async () => {
            setTermsLoading(true); 
            const result_terms = await fetch(ApiURI + '/terms/')
            .then(response => response.json());
            setTermChoices(result_terms);
            setTermsLoading(false); 
            console.log('terms fetched');
        };
        fetchData();
    },[])
  
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
                console.log('loads fetched');
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
                console.log('lessons fetched');
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
                console.log('lessons fetched');
                };
                fetchData();
            };

    },[selectedGroup, selectedTerm])

    useEffect(() => {
        if (selectedSubject) {
            const fetchData = async () => {
                setSubjectInfoLoading(true);
                const result = await fetch(ApiURI + '/subjects/' + selectedSubject)
                .then(response => response.json());
                setSpeakerChoices(result.speaker_list);
                setClassroomChoices(result.classrooms_list);
                setSubjectInfoLoading(false);
                console.log('subjects fetched');
            };
            fetchData();
        };
    },[selectedSubject])

    useEffect(() => {
        if (selectedSpeaker) {
            const fetchDistanceClasses = async () => {
                setSpeakerClassesLoading(true);
                await fetch(ApiURI + '/lessons_distance/')
                .then(response => response.json())
                .then(result => 
                        setSpeakerClassesDistance(result.filter(c => c.speaker === selectedSpeaker && c.term === selectedTerm.id))
                    );
                setSpeakerClassesLoading(false);
                console.log('speaker d classes fetched');
            };
            fetchDistanceClasses();
    
            const fetchFulltimeClasses = async () => {
                setSpeakerClassesLoading(true);
                await fetch(ApiURI + '/lessons_fulltime/')
                .then(response => response.json())
                .then(result => 
                        setSpeakerClassesFulltime(result.filter(c => c.speaker === selectedSpeaker && c.term === selectedTerm.id))
                    );
                setSpeakerClassesLoading(false);
                console.log('speaker f classes fetched');
            };
            fetchFulltimeClasses();
        };
    }, [selectedSpeaker, selectedTerm.id])


    // effect hooks

    useEffect(() => {
        if (selectedWeek) {
            setDays(getWeeksDays(selectedWeek, selectedGroup.mode_of_study));
            let date = new Date(selectedWeek);
            let selectedWeekNumber = getWeekNumber(date);
            if (selectedWeekNumber % 2 === 0) 
            setSelectedWeekParity('even')
            else if (selectedWeekNumber % 2 === 1) 
            setSelectedWeekParity('uneven')
        }
    },[selectedWeek, selectedGroup.mode_of_study])

    
    return (
        <div className="Admin"> {console.log(selectedWeekParity)}
            <Link to="./">Вернуться к расписанию <span role="img" aria-label="hat">🎓</span></Link>  
            <h2>
            Административный интерфейс
            </h2>
            {
                groupsLoading ? (<div><i>Groups are loading...</i></div>) : (
                    <ComboBox 
                        label="Группа"
                        options={groupChoices}
                        clearText="Очистить"
                        noOptionsText="Группа не найдена"
                        autoHighlight={true}
                        handleChange={handleChangeGroup}
                        getOptionLabel={option => option.name}
                        style={{ width: 170 }}
                    />
                )
            }
            <br />
            {
                termsLoading ? (<div><i>Terms are loading...</i></div>) : (
                    <RadioButtonsGroup 
                        label="Семестр"
                        handleChange={handleChangeTerm}
                        choices={termChoices}
                    />
                )
            }
            <br />
            <LoadsTable
                titles={loadTitles}
                useStyles={loadTableStyles}
                lessons={lessons}
                loads={loads}
                selectedTerm={selectedTerm}
                study_mode={selectedGroup.mode_of_study}
             />
            <br />
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
            <div className="admin-schedule">
                {
                    selectedWeek &&
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
                                />
                            )
                        }
                    </div>
                }
            </div>
            {
                selectedWeek &&
                <ComboBox 
                        label="Предмет"
                        options={loads.map(load => load.subject_name)}
                        clearText="Очистить"
                        noOptionsText="Предмет не найден"
                        autoHighlight={true}
                        handleChange={handleChangeSubject}
                        getOptionLabel={option => option.name + ' - ' + option.s_type}
                        style={{ width: 400 }}
                />
            }
            {
                (selectedSubject && selectedWeek && subjectInfoLoading) && 
                    <div><i>Subject info is loading...</i></div> 
            }
            {
                (selectedSubject && selectedWeek && !subjectInfoLoading) &&
                        <div>
                            <Select
                                useStyles={selectStyles}
                                handleChange={handleChangeSpeaker}
                                value={selectedSpeaker}
                                label="Преподаватель"
                                values={speakerChoices.map(speaker => speaker.name)}
                            />
                            <Select
                                useStyles={selectStyles}
                                handleChange={handleChangeClassroom}
                                value={selectedClassroom}
                                label="Аудитория"
                                values={classroomChoices.map(classroom => classroom.name)}
                            />
                        </div>
            }
        </div>
    )
}




