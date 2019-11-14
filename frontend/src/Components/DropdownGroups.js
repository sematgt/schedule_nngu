import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class DropdownGroups extends React.Component{
  
  constructor(props) {
    super(props);
    this.state = {
      selected_group: '',
    }
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
    this.setState({
      selected_group: event.target.value
    });
    this.props.getGroupFromDropdown(event.target.value);
  };
  
  render() {
    const menuItemStyle = {
      // width: 90,
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
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={this.state.selected_group}
          onChange={this.handleChange}
          displayEmpty 
          style={selectStyle}
        >
        <MenuItem value="" style={menuItemStyle}>
            <em>Группа</em>
        </MenuItem>
        {this.props.groups.map((group) => (
          <MenuItem 
          value={group.name} 
          key={group.name}
          style={menuItemStyle}
          >
          {group.name}
          </MenuItem>
          ))
        }
        )
        </Select>
      </FormControl>
      </div>
    );
  }
}

export default DropdownGroups;