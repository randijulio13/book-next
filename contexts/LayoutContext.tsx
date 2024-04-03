import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";

export interface ILayoutContext {
  loading: boolean;
  setLoading:  Dispatch<SetStateAction<boolean>>;
}

export const LayoutContext = createContext<ILayoutContext>({} as ILayoutContext);

interface LayoutContextProps {
  children: ReactNode;
}

export const LayoutContextProvider = ({ children }: LayoutContextProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LayoutContext.Provider value={{ loading, setLoading }}>
      {children}
    </LayoutContext.Provider>
  );
};