import React, { useState } from 'react';
import { Menu, Checkbox } from 'antd';
import '../Filter/Filter.css';
import { CiFilter as FilterIcon } from "react-icons/ci";


function FilterBox({
  options = [],
  value = [],
  onChange,
  title = 'Filter',
  theme = 'dark'
}) {
  const [checkedValues, setCheckedValues] = useState(value);

  const handleChange = (val, checked) => {
    const newValues = checked
      ? [...checkedValues, val]
      : checkedValues.filter(v => v !== val);

    setCheckedValues(newValues);
    onChange?.(newValues); // parent ko values bhejna
  };

  const items = [
    {
      key: 'filter',
      icon: <FilterIcon className={"filter_icon"} />,
      label: title,
      children: options.map(opt => ({
        key: opt.value,
        label: (
          <Checkbox
            checked={checkedValues.includes(opt.value)}
            onChange={(e) => handleChange(opt.value, e.target.checked)}
            onClick={(e) => e.stopPropagation()}
          >
            {opt.label}
          </Checkbox>
        ),
      })),
    },
  ];

  return (
    <Menu
      theme={theme}
      mode="inline"
      className={"filter_Box"}
      items={items}
    />
  );
}

export default FilterBox;
