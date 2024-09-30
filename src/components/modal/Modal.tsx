import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import * as S from './Modal.style';
import { IoClose } from 'react-icons/io5';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  return createPortal(
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={onClose}>
          <IoClose />
        </S.CloseButton>
        {children}
      </S.ModalContent>
    </S.ModalOverlay>,
    document.body
  );
}
