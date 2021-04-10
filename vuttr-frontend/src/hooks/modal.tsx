import React, {
  createContext,
  useContext,
  useState,
  SetStateAction,
  useCallback,
} from 'react';

interface DeleteData {
  id: number;
  title: string;
}

interface ModalContextData {
  deleteModal: boolean;
  addModal: boolean;
  deleteData: DeleteData;
  setDeleteModal(deleteModal: SetStateAction<boolean>): void;
  setAddModal(addModal: SetStateAction<boolean>): void;
  openDeleteModal(data: DeleteData): void;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

const ModalProvider: React.FC = ({ children }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [deleteData, setDeleteData] = useState<DeleteData>({} as DeleteData);

  const openDeleteModal = useCallback(({ id, title }: DeleteData) => {
    setDeleteModal(true);
    setDeleteData({
      id,
      title,
    });
  }, []);

  return (
    <ModalContext.Provider
      value={{
        deleteModal,
        addModal,
        deleteData,
        setDeleteModal,
        setAddModal,
        openDeleteModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

function useModal(): ModalContextData {
  const context = useContext(ModalContext);

  if (!context) throw new Error('useModal must be used within a ModalProvider');

  return context;
}

export { ModalProvider, useModal };
