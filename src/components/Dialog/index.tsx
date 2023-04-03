import React, { Children, useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

function Dialog({ isOpen, onClose, children }: Props) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      {children}
    </Modal>
  );
}

export default Dialog;
