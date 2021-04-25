import React from "react";
import Select from "../Select";

export type CitySelectProps = {
  onChange: (value: any) => any;
  disabled?: boolean;
};

const items = [
  "Chicago",
  "Phoenix",
  "London",
  "Beijing",
  "Paris",
  "San Francisco",
];

const CitySelect = ({ onChange, disabled = false }: CitySelectProps) => {
  return (
    <Select
      label="City"
      onChange={handleChange}
      disabled={disabled}
      withAll
      menuItems={items.map((item) => ({
        value: item,
        label: item,
      }))}
    />
  );

  function handleChange(newValue: any) {
    onChange(newValue);
  }
};

export default CitySelect;
