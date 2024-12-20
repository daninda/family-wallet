import React, { FC } from 'react';
import styled from '@emotion/styled';
import { AiOutlineClose } from 'react-icons/ai';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ onClose, children }) => (
  <ModalOverlay onClick={onClose}>
    <ModalContent onClick={(e) => e.stopPropagation()}>
      <CloseButton onClick={onClose}>
        <AiOutlineClose size={24} />
      </CloseButton>
      {children}
    </ModalContent>
  </ModalOverlay>
);

export default Modal;