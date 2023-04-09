import { useEffect, useRef } from 'react';

const useScrollToBottom = (
  newMessage: any
): React.RefObject<HTMLDivElement> => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [newMessage]);

  return messagesEndRef;
};

export default useScrollToBottom;
