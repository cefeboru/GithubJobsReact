import React from "react";
import Select from "../Select";

export type DescriptionSelectProps = {
  onChange: (value: string) => any;
  disabled?: boolean;
};

const items = ["Javascript", "Java", "Python", "React", "Ruby", "Go"];

const ProgrammingLanguage = ({
  onChange,
  disabled = false,
}: DescriptionSelectProps) => {
  return (
    <Select
      label="Programming Language"
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

export default ProgrammingLanguage;
