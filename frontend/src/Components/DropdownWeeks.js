import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class DropdownWeeks extends React.Component{
  
  constructor(props) {
    super(props);
    this.state = {
      selected_week: '',
      selected_week_fulltime: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeFulltime = this.handleChangeFulltime.bind(this);
    this.changeSelectedWeek = this.changeSelectedWeek.bind(this);
  }
  
  handleChange(event) {
    this.setState({
      selected_week: event.target.value,
    });
    this.props.getWeekFromDropdown(event.target.value);
  };

  handleChangeFulltime(event) {
    this.setState({
      selected_week_fulltime: event.target.value,
    });
    this.props.getWeekFromDropdownFulltime(event.target.value);
  };
  
  changeSelectedWeek(week) {
    this.setState({
      selected_week: week,
    });
    this.props.getWeekFromDropdown(week);
  }

  changeSelectedWeekFulltime(week) {
    this.setState({
      selected_week_fulltime: week,
    });
    this.props.getWeekFromDropdownFulltime(week);
  }
  
  render() {
    const menuItemStyle = {
      height: 36,
      fontFamily: 'Roboto',
      fontSize: '14px',
      padding: '5px'
    };
    
    const selectStyle = {
      width: 100,
      height: 36,
      fontFamily: 'Roboto',
      fontSize: '14px',
    };

    return (
      <div>
      <FormControl>
        {
          this.props.study_mode === 'distance' &&
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.selected_week}
              onChange={this.handleChange}
              displayEmpty 
              style={selectStyle}
            >
            <MenuItem value="" style={menuItemStyle}>
                <em>Неделя</em>
            </MenuItem>
            {this.props.weeks.map((week) => (
              <MenuItem 
              value={week.week} 
              key={week.week}
              style={menuItemStyle}
              >{week.week}</MenuItem>
              ))
            }
            </Select>
        }
        {
          this.props.study_mode === 'fulltime' &&
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.selected_week_fulltime}
              onChange={this.handleChangeFulltime}
              displayEmpty 
              style={selectStyle}
            >
            <MenuItem value="" style={menuItemStyle}>
                <em>Неделя</em>
            </MenuItem>
            {this.props.weeks_fulltime.map((week) => (
              <MenuItem 
              value={week.value} 
              key={week.value}
              style={menuItemStyle}
              >{week.parity}</MenuItem>
              ))
            }
            </Select>
        }
      </FormControl>
      </div>
    );
  }
}

export default DropdownWeeks;