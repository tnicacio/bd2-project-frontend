import { createContext, ReactNode, useState } from 'react';

interface ModalContextData {
  isUserModalOpen: boolean;
  isProductModalOpen: boolean;
  isVendaModalOpen: boolean;
  closeUserModal: () => void;
  openUserModal: () => void;
  closeProductModal: () => void;
  openProductModal: () => void;
  closeVendaModal: () => void;
  openVendaModal: () => void;
}

interface ModalProviderProps {
  children?: ReactNode;
}

export const ModalContext = createContext({} as ModalContextData);

export function ModalProvider({ children }: ModalProviderProps) {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isVendaModalOpen, setIsVendaModalOpen] = useState(false);

  function closeUserModal() {
    setIsUserModalOpen(false);
  }
  function openUserModal() {
    setIsUserModalOpen(true);
  }

  function closeProductModal() {
    setIsProductModalOpen(false);
  }
  function openProductModal() {
    setIsProductModalOpen(true);
  }

  function closeVendaModal() {
    setIsVendaModalOpen(false);
  }
  function openVendaModal() {
    setIsVendaModalOpen(true);
  }

  return (
    <ModalContext.Provider
      value={{
        isUserModalOpen,
        isProductModalOpen,
        isVendaModalOpen,
        closeUserModal,
        openUserModal,
        closeProductModal,
        openProductModal,
        closeVendaModal,
        openVendaModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
