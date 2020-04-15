import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



export default function SimpleSelect(props) {
  const classes = props.useStyles();

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl} disabled={props.disabled === true ? true : false}>
        <InputLabel id="demo-simple-select-outlined-label">{props.label}</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={props.value}
          onChange={props.handleChange}
          label={props.label}
        >
        {   props.values && 
            props.values.map((value, index) =>
                <MenuItem value={value} key={index}>{value}</MenuItem>
            )
        }
        </Select>
      </FormControl>
    </div>
  );
}