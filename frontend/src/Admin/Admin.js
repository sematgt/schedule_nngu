import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import RadioButtonsGroup from './Components/RadioButtonsGroup'
import ComboBox from './Components/ComboBox'
import SimpleTable from './Components/SimpleTable'
import { ApiURI } from '../AppConfig';


export default function Admin() {
    
    // State hooks
    
    const [groupValue, setGroupValue] = React.useState('');
    const [groupChoices, setGroupChoices] = React.useState([]);
    const handleChangeGroup = (event, value) => {
        value ? setGroupValue(value.name) : setGroupValue('');
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(ApiURI + '/groups/')
            .then(response => response.json());
            
            setGroupChoices(result);
        };
        fetchData();
    },[])
    
    
    const [termValue, setTermValue] = React.useState();
    const [termChoices, setTermChoices] = React.useState([]);
    const handleChangeTerm = (event) => {
        setTermValue(event.target.value);
    };
    
    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(ApiURI + '/terms/')
            .then(response => response.json());
            
            setTermChoices(result);
        };
        fetchData();
    },[])
    
    // 

    // const termChoices = [
    //     {
    //         'id': '1',
    //         'number': '1',
    //     },
    //     {
    //         'id': 2,
    //         'number': '2',
    //     },
    // ]

    

    const loadTitles = [
        'Предмет', 
        'Количество часов', 
        'Часов запланировано', 
        'Часов в неделю', 
        'Пар в неделю'
    ]

    
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
    
    // Tables styles

    const useStyles = makeStyles({
        table: {
            maxWidth: 950,
        },
        root: {
            maxWidth: 950,
        },
    });

    return (
        <div>
            <h2>
            Admin interface
            </h2>
            <ComboBox 
                label="Группа"
                options={groupChoices}
                clearText="Очистить"
                noOptionsText="Группа не найдена"
                autoHighlight={true}
                handleChange={handleChangeGroup}
                
            />
            <span>
                {groupValue}
            </span>
            <br />
            <RadioButtonsGroup 
                label="Term"
                handleChange={handleChangeTerm}
                choices={termChoices}
            />
            <span>
                {termValue}
            </span>
            <br />
            <SimpleTable
                titles={loadTitles}
                useStyles={useStyles}
                rows={rows}
             />
        </div>
    )
}




