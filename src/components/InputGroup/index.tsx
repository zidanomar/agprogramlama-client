import React from 'react';

type InputGroupProps = {
  children: React.ReactNode;
};
export default function InputGroup(props: InputGroupProps) {
  const { children } = props;
  return <div className='mb-4'>{children}</div>;
}
