import React from 'react';

interface Props {
  primary?: boolean;
  className?: string;
  content: string;
}

export default function Message(props: Props) {
  const { content, primary, className, ...rest } = props;
  const primaryStyle = 'bg-primary self-end';
  const secondaryStyle = 'bg-dark self-start';
  return (
    <div
      className={`max-w-[50%] p-4 rounded-lg break-all ${className} ${
        primary ? primaryStyle : secondaryStyle
      }`}
      {...rest}
    >
      {content}
    </div>
  );
}
