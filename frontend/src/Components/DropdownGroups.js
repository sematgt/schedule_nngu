import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 80,
     
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function DropdownGroups(props) {
  const classes = useStyles();
  const [selected_group, setSelected_group] = React.useState('');

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    setSelected_group(event.target.value);
};

  return (
    <div>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          {props.text}
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={selected_group}
          onChange={handleChange}
          labelWidth={labelWidth}
        >
        { (props.groups) &&
          props.groups.map((group) => (
          <MenuItem value={group.name} key={group.name}>{group.name}</MenuItem>))
        }
        </Select>
      </FormControl>
    </div>
  );
}