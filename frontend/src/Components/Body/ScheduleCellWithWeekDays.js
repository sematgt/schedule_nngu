import React from 'react';
import getWeekNumber from '../../Utils/GetWeekNumber'

export default function ScheduleCellWithWeekDays(props) {
    let date = new Date();
    let current_week = getWeekNumber();
    let current_week_parity = current_week % 2 === 0 ? 'even' : 'uneven';

    return( 
            <div 
                className={["Schedule-cell", ((props.day.date === date.toISOString().slice(0,10) && props.study_mode === 'distance') || (props.day.date === date.toISOString().slice(0,10) && current_week_parity === props.selected_week_fulltime)) ? "Schedule-cell-weekday-today" : "Schedule-cell-weekday"].join(' ')} 
                key={props.day.day}
            >
            <div className={props.study_mode === 'distance' ? "wday" : "wday_big"}>
                <div className={props.study_mode === 'distance' ? "" : "wday_big_text"}>
                    {props.day.wday}
                </div>
            </div>
            {
                props.study_mode === 'distance' &&
                    <div className="day">
                        <div className="day_text">
                            {props.day.day}
                        </div>
                    </div>
            }
            </div>
    )
    

}