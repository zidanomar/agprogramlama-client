import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <input
      className={`bg-transparent shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-primary focus:shadow-outline-primary w-full text-white  ${className}`}
      ref={ref}
      {...rest}
    />
  );
});

export default Input;
