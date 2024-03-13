import { createContext } from 'react';

type ModalContextType = {
  modalComponent: JSX.Element | null;
  setModalComponent: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
};
export const ModalContext = createContext<ModalContextType>({
  modalComponent: null,
  setModalComponent: () => {},
});