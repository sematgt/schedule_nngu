import React from 'react';

export default function ScheduleCellWithContent(props) {
    if (props.study_mode === 'distance') {
        var lesson = props.lessons.find(lesson => lesson.date_day === props.day.date && lesson.class_number === props.class_number && lesson.study_group === props.selected_group)
    } else if (props.study_mode === 'fulltime') {
        var lesson = props.lessons.find(lesson => lesson.week_parity === props.selected_week_fulltime && lesson.day === props.day.wday_en && lesson.class_number === props.class_number && lesson.study_group === props.selected_group_fulltime)
    }

    if (props.free_slots_array) var slotInfo = props.free_slots_array[0].classes.filter(cl => cl.number === props.class_number);
    
    return(
            <div className="Schedule-cell" key={props.class_number + props.day.wday}
                id={
                props.free_slots_array &&
                (((props.free_slots_array[0].classes_count === 0 || slotInfo[0].class_in_streak) && slotInfo[0].classroom_is_free && !slotInfo[0].lesson && slotInfo[0].speaker_is_free && props.free_slots_array[0].classes_count < 4) ? "active" : "passive")
            }>
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