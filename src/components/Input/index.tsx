import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, ...rest } = props;
  console.log(className);
  return (
    <input
      className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-primary focus:shadow-outline-primary w-full  ${className}`}
      ref={ref}
      {...rest}
    />
  );
});

export default Input;
