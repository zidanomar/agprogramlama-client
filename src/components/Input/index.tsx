type InputProps = {
  id: string;
  type?: string;
  placeholder?: string;
};

export default function Input({
  id,
  type = 'text',
  placeholder = 'user input',
}: InputProps) {
  return (
    <input
      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-primary focus:shadow-outline-primary'
      id={id}
      type={type}
      placeholder={placeholder}
    />
  );
}
