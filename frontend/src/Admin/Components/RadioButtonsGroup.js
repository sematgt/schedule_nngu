import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioButtonsGroup(props) {
    
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">{props.label}</FormLabel>
        <RadioGroup aria-label="term" name="term" value={props.termValue} onChange={props.handleChange}>
          {props.choices.map(term => 
              <FormControlLabel value={term.number} key={term.number} control={<Radio />} label={term.number} />
          )}
        </RadioGroup>
      </FormControl>
    );
  }