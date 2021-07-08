import React from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import PropTypes from "prop-types";

class ModuleFormControl extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      controls: props.controls,
    };
  }

  handleChange = (event, control) => {
    const { controls } = this.state;
    const _tempArr = [...controls];
    const itemIndex = _tempArr.findIndex((e) => e._id === control._id);
    if (itemIndex !== -1) {
      const _item = controls[itemIndex];
      _item.isActive = event.target.checked;
      _tempArr.splice(itemIndex, 1, _item);
      console.log("-ModuleFormControl--_tempArr---", _tempArr);
      this.setState(_tempArr, () => {
        this.props.onSelectModulePermissionsListener(controls);
      });
    }
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
              control={
                <Checkbox
                  onChange={(event) => this.handleChange(event, ct)}
                  name={ct.operation}
                />
              }
              label={ct.operation}
              key={idx}
            />
          );
        })}
      </React.Fragment>
    );
  }
}

ModuleFormControl.propTypes = {
  controls: PropTypes.array.isRequired,
};

export default ModuleFormControl;
