import { useEffect, useRef } from 'react';

const useScrollToBottom = (loader: any): React.RefObject<HTMLDivElement> => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [loader]);

  return messagesEndRef;
};

export default useScrollToBottom;
