import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import MaterialSelect from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core";

export type SelectProps = {
  onChange?: (value: any) => any;
  disabled?: boolean;
  withNone?: boolean;
  withAll?: boolean;
  menuItems: Array<{
    value: string;
    label: string;
  }>;
  label?: string;
};

const noneMenuItem = {
    value: "None",
    label: "None",
}

const allMenuItem = {
    value: "All",
    label: "All",
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: '120px',
        width: '100%',
    }
}))

const Select = ({ withNone, withAll, onChange, disabled, menuItems, label }: SelectProps) => {
  const classes = useStyles();
  let newItems = withNone ? [noneMenuItem, ...menuItems] : menuItems;
  newItems = withAll ? [allMenuItem, ...newItems] : newItems
  const [value, setValue] = useState(newItems[0]);
  return (
    <FormControl className={classes.formControl}>
      {label && <InputLabel id="job-city-select-label">{label}</InputLabel>}
      <MaterialSelect
        labelId="job-city-select-label"
        id="job-city-select"
        value={value}
        disabled={disabled}
        onChange={handleChange}
      >
        {newItems.map((item) => (
          <MenuItem
            key={`select-item-${item.value.toLowerCase().replaceAll(" ", "")}`}
            value={item.value}
          >
            {item.label}
          </MenuItem>
        ))}
      </MaterialSelect>
    </FormControl>
  );

  function handleChange(event: any) {
    const newValue = event.target.value;
    const selectedValueIsNoneOrAll = newValue === "None" || newValue === 'All';
    if (onChange) {
        onChange(selectedValueIsNoneOrAll ? undefined : newValue);
    }
    setValue(newValue);
  }
};

export default Select;
