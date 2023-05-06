import React from 'react';

type Value = {
  value: any;
  label: any;
};

type DropdownProps = {
  id?: string;
  className?: string;
  name?: string;
  values: Value[];
  multiple?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function Dropdown(props: DropdownProps) {
  const { values, className, onChange, ...restProps } = props;
  return (
    <select
      className={`bg-gray-200 border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${className}`}
      onChange={onChange}
      {...restProps}
    >
      {values?.map(({ value, label }, idx) => (
        <option key={idx} className='py-4' value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
