import React from 'react';

type Value = {
  value: any;
  label: any;
};

type DropdownProps = {
  id?: string;
  className?: string;
  name?: string;
  values?: Value[];
  placeholder?: string;
  clickHandler?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function Dropdown(props: DropdownProps) {
  const { values, className, placeholder, clickHandler, ...restProps } = props;
  return (
    <select
      className={`bg-gray-200 border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${className}`}
      onChange={clickHandler}
      {...restProps}
    >
      <option value='' disabled selected hidden>
        {placeholder ? placeholder : 'Select'}
      </option>
      {values?.map((value) => (
        <option className='py-4' value={value.value}>
          {value.label}
        </option>
      ))}
    </select>
  );
}
