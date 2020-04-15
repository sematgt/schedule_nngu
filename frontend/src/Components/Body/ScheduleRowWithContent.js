import React from 'react';
import ScheduleCellWithContent from './ScheduleCellWithContent'

export default function ScheduleRowWithContent(props) {
    return (
        <div className="Schedule-row" id={props.row_number}>
        <div className="Schedule-cell" id="left"><span>
            <big>{props.t.roman}</big> {props.t.begin} - {props.t.end}</span>
        </div>
        {
            props.days.map(day => 
                <ScheduleCellWithContent 
                    key={props.row_number + day.day}
                    class_number={props.row_number}
                    lessons={props.lessons}
                    study_mode={props.study_mode}
                    day={day}
                    selected_group={props.selected_group}
                    selected_group_fulltime={props.selected_group_fulltime}
                    selected_week_fulltime={props.selected_week_fulltime}
                    free_slots_array={props.free_slots_array && props.free_slots_array.filter(slot => slot.date === day.date)}
                    handleChangeDate={props.handleChangeDate}
                    handleChangeDay={props.handleChangeDay}
                    handleChangeClassnumber={props.handleChangeClassnumber}
                />
        )    
        }
        </div>
    )
}