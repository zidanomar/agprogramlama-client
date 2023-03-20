type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  theme?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
};

export default function Button(props: ButtonProps) {
  const {
    children,
    className,
    onClick,
    disabled = false,
    theme = 'primary',
  } = props;
  let baseClasses = 'text-textLight font-bold py-2 px-4 rounded';
  let bgClasses =
    theme === 'primary'
      ? 'bg-primary hover:bg-purple-600'
      : 'bg-primary hover:bg-purple-600';

  if (disabled) {
    bgClasses = 'bg-gray-400 cursor-not-allowed';
  }

  return (
    <button
      className={`${baseClasses} ${bgClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
