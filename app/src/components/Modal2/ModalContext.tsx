import React, {
  RefObject,
  createContext,
  ReactNode,
  useContext,
  SetStateAction,
} from "react";
import { Modal } from "./";
import { Item } from "../../generated/graphql";
interface ProfileState {
  modalContent: ReactNode;
  setModalContent: React.Dispatch<SetStateAction<ReactNode>>;
  close: boolean;
  setClose: React.Dispatch<SetStateAction<boolean>>;
  setOverlay: React.Dispatch<SetStateAction<boolean>>;
  overlay: boolean;
  reff: { item: Item | null; reff: any | null };
  setReff: React.Dispatch<
    SetStateAction<{
      item: Item | null;
      reff: any | null;
    }>
  >;
}

function createCtx<ProfileState>() {
  const ctx = createContext<ProfileState | undefined>(undefined);
  function useCtx() {
    const c = useContext(ctx);
    if (!c) throw new Error("useCtx must be inside a Provider with a value");
    return c;
  }
  return [useCtx, ctx.Provider] as const;
}

export const [useModal, CtxProvider] = createCtx<ProfileState>();

export const ModalProvider: React.FC = ({ children }) => {
  const [modalContent, setModalContent] = React.useState<ReactNode | null>(
    null
  );
  const [close, setClose] = React.useState<boolean>(true);
  const [overlay, setOverlay] = React.useState<boolean>(false);
  const [reff, setReff] = React.useState<{
    reff: any | null;
    item: Item | null;
  }>({ item: null, reff: null });
  return (
    <CtxProvider
      value={{
        setReff,
        reff,
        modalContent,
        setModalContent,
        close,
        setClose,
        overlay,
        setOverlay,
      }}
    >
      <Modal />
      {children}
    </CtxProvider>
  );
};
