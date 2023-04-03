import React, { useState } from 'react';

export default function useDisclosure(init = false) {
  const [isTrue, setIsTrue] = useState(init);

  const onOpen = () => setIsTrue(true);
  const onClose = () => setIsTrue(false);

  return {
    isOpen: isTrue,
    onOpen,
    onClose,
  };
}
