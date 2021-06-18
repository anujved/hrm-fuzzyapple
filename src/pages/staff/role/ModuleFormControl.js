import React from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import PropTypes from "prop-types";

class ModuleFormControl extends React.PureComponent {
  // const [state, setState] = React.useState({ ...controls });

  constructor(props){
    super(props);

    this.state = {
      ...props.controls,
    }
  }

  handleChange = (event) => {
    console.log('--CheckboxEvent--', event);
    // setState({ ...state, [event.target.name]: event.target.checked });
    // this.setState({
    //   ...this.state,
    //   [event.target.name]: event.target.checked
    // })
  };

  // isAnyActivePermission = () => {
  //   const stateArr = Object.values(this.state);
  //   const isAnyActive = stateArr.some(s => s === true);
  //   return isAnyActive;
  // }

  render() {
    return (
      <React.Fragment>
        {this.props.controls.map((ct, idx) => {
          return (
            <FormControlLabel
              control={<Checkbox onChange={this.handleChange} name={ct.operation} />}
              label={ct.operation}
              key={idx}
            />
          );
        })}
      </React.Fragment>
    );
  }
  
};

ModuleFormControl.propTypes = {
  controls: PropTypes.array.isRequired,
};

export default ModuleFormControl;
