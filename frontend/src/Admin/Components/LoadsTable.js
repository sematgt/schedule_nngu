import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function SimpleTable(props) {
    const classes = props.useStyles();

    return (
        <TableContainer className={classes.root} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>{props.titles[0]}</TableCell>
                {
                    props.titles.slice(1,).map(title =>
                        <TableCell align="right" key={title}>{title}</TableCell>
                    )
                }
            </TableRow>
            </TableHead>
            {
                props.loads &&
                <TableBody>
                    {props.loads.map((load, index) => (
                        <TableRow key={index}>
                        <TableCell component="th" scope="row">
                            {load.subject_name.name + ' - ' + load.subject_name.s_type}
                        </TableCell>
                        <TableCell align="right">{load.hours_count}</TableCell>
                        <TableCell align="right">{props.lessons.filter(lesson => lesson.subject.name === load.subject_name.name && lesson.subject.s_type === load.subject_name.s_type).length*2}</TableCell>
                        <TableCell align="right">{props.study_mode === 'distance' ? load.hours_count/props.selectedTerm.weeks_count_distance : load.hours_count/props.selectedTerm.weeks_count_fulltime}</TableCell>
                        <TableCell align="right">{props.study_mode === 'distance' ? load.hours_count/(props.selectedTerm.weeks_count_distance*2) : load.hours_count/(props.selectedTerm.weeks_count_fulltime*2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            }
        </Table>
        </TableContainer>
    );
}