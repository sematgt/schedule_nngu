import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';


export default function ScheduleCellWithContent(props) {
    if (props.study_mode === 'distance') {
        var lesson = props.lessons.find(lesson => lesson.date_day === props.day.date && lesson.class_number === props.class_number && lesson.study_group === props.selected_group)
    } else if (props.study_mode === 'fulltime') {
        var lesson = props.lessons.find(lesson => lesson.week_parity === props.selected_week_fulltime && lesson.day === props.day.wday_en && lesson.class_number === props.class_number && lesson.study_group === props.selected_group_fulltime)
    }

    if (props.free_slots_array) var slotInfo = props.free_slots_array[0].classes.filter(cl => cl.number === props.class_number);
    
    function handleClick(event) {
        props.study_mode === 'distance' && 
        props.handleChangeDate(event.target)
        props.handleChangeClassnumber(event.target)
        props.study_mode === 'fulltime' && 
        props.handleChangeClassnumber(event.target)
        props.handleChangeDay(event.target)
    }

    function calcTip(props, slotInfo) {
        var result_tip = "";
        if (!slotInfo[0].lesson) {
            if (slotInfo[0].classroom_is_free === false) result_tip += "Аудитория занята\n";
            if (slotInfo[0].speaker_is_free === false) result_tip += "Преподаватель занят\n";
            if (slotInfo[0].class_in_streak === false) result_tip += "Занятия должны идти подряд\n";
            if (props.free_slots_array[0].classes_count === 4) result_tip += "Максимум 4 пары в день\n";
            if ((props.free_slots_array[0].classes_count === 0 || slotInfo[0].class_in_streak) && slotInfo[0].classroom_is_free && slotInfo[0].speaker_is_free && props.free_slots_array[0].classes_count < 4) result_tip += "Ячейка свободна\n";
        }
        return result_tip;
    }

    var tip = props.free_slots_array ? calcTip(props, slotInfo) : ""

    return(
            <Tooltip title={tip} arrow>
                <div 
                    className="Schedule-cell" 
                    key={props.class_number + props.day.wday} 
                    date={props.study_mode === 'distance' ? props.day.date : ''} 
                    classnumber={props.class_number} 
                    day={props.study_mode === 'fulltime' ? props.day.wday_en : ''} 
                    weekparity={props.study_mode === 'fulltime' ? props.selected_week_fulltime : ''}
                    id={
                    props.free_slots_array &&
                    (((props.free_slots_array[0].classes_count === 0 || slotInfo[0].class_in_streak) && slotInfo[0].classroom_is_free && !slotInfo[0].lesson && slotInfo[0].speaker_is_free && props.free_slots_array[0].classes_count < 4) ? "active" : "passive")
                    }
                    onClick={
                        props.free_slots_array && 
                        (((props.free_slots_array[0].classes_count === 0 || slotInfo[0].class_in_streak) && slotInfo[0].classroom_is_free && !slotInfo[0].lesson && slotInfo[0].speaker_is_free && props.free_slots_array[0].classes_count < 4) ? handleClick : null)
                    }
                >
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
            </Tooltip>
    )
}