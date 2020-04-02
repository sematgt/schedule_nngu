import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import RadioButtonsGroup from './Components/RadioButtonsGroup'
import ComboBox from './Components/ComboBox'
import SimpleTable from './Components/SimpleTable'
import { ApiURI } from '../AppConfig';


export default function Admin() {
    
    // Constants

    const loadTitles = [
        'Предмет', 
        'Количество часов', 
        'Часов в расписании', 
        'Часов в неделю', 
        'Пар в неделю'
    ]

    // Tables styles

    const useStyles = makeStyles({
        table: {
            maxWidth: 950,
        },
        root: {
            maxWidth: 950,
        },
    });

    // State hooks
    
    const [choosenGroup, setChoosenGroup] = React.useState('');
    const [groupChoices, setGroupChoices] = React.useState([]);
    
    const [choosenTerm, setChoosenTerm] = React.useState('');
    const [termChoices, setTermChoices] = React.useState([]);
    
    const [loads, setLoads] = React.useState([]);

    const [lessons, setLessons] = React.useState([]);

    // handle components changes

    const handleChangeTerm = (event) => {
        setChoosenTerm(termChoices.filter(term => term.number === event.target.value)[0]);
    };

    const handleChangeGroup = (event, value) => {
        value ? setChoosenGroup(value) : setChoosenGroup('');
    }

    // data fetching

    const [groupsLoading, setGroupsLoading] = React.useState(false);
    const [termsLoading, setTermsLoading] = React.useState(false);
    const [groupsError, setGroupsError] = React.useState(false);
    const [termsError, setTermsError] = React.useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setGroupsLoading(true);            
            const result_groups = await fetch(ApiURI + '/groups/')
            .then(response => response.json());
            setGroupChoices(result_groups);
            setGroupsLoading(false);
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
        };
        fetchData();
    },[])
  
    useEffect(() => {
        if (choosenTerm && choosenGroup) {
            const fetchData = async () => {
                const result = await fetch(ApiURI + '/loads/')
                .then(response => response.json())
                .then(result => {
                    setLoads(
                        result.filter(load => load.group === choosenGroup.id && load.term === choosenTerm.id)
                    )
                });
            };
            fetchData();
        };

        if (choosenGroup.mode_of_study === 'distance') {
            const fetchData = async () => {
                const result = await fetch(ApiURI + '/lessons_distance/')
                .then(response => response.json())
                .then(result => {
                    setLessons(
                        result.filter(lesson => lesson.term === choosenTerm.number)
                    )
                });
                };
                fetchData();
            };
            
        if (choosenGroup.mode_of_study === 'fulltime') {
            const fetchData = async () => {
                const result = await fetch(ApiURI + '/lessons_fulltime/')
                .then(response => response.json());

                setLessons(result);
                };
                fetchData();
            };

    },[choosenGroup, choosenTerm])
    
    
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }
    
    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];
    


    return (
        <div>{console.log(lessons, choosenTerm.id)}
            <h2>
            Admin interface
            </h2>
            {
                groupsLoading ? (<div><i>Groups is loading...</i></div>) : (
                    <ComboBox 
                        label="Группа"
                        options={groupChoices}
                        clearText="Очистить"
                        noOptionsText="Группа не найдена"
                        autoHighlight={true}
                        handleChange={handleChangeGroup}
                    />
                )
            }
            <br />
            {
                termsLoading ? (<div><i>Terms is loading...</i></div>) : (
                    <RadioButtonsGroup 
                        label="Term"
                        handleChange={handleChangeTerm}
                        choices={termChoices}
                    />
                )
            }
            <br />
            <SimpleTable
                titles={loadTitles}
                useStyles={useStyles}
                lessons={lessons}
                loads={loads}
                choosenTerm={choosenTerm}
             />
        </div>
    )
}




