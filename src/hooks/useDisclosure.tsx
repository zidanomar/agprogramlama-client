import React, { useState } from 'react';

export default function useDisclosure(
  init = false
): [boolean, () => void, () => void] {
  const [isTrue, setIsTrue] = useState(init);

  const onOpen = (): void => setIsTrue(true);
  const onClose = (): void => setIsTrue(false);

  return [isTrue, onOpen, onClose];
}
