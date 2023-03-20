import { ReactNode } from 'react';

type LabelProps = {
  htmlFor: string;
  label: string;
};

export default function Label({ htmlFor, label }: LabelProps) {
  return (
    <label
      className='block text-white text-sm font-bold mb-2'
      htmlFor={htmlFor}
    >
      {label}
    </label>
  );
}
