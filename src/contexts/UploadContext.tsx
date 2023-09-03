"use client";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
interface ContextProps {
    vidLink: string,
    setVidLink: Dispatch<SetStateAction<string>>,
    
}
const UploadContext = createContext<ContextProps>({ vidLink: "", setVidLink: (): string => "" });
export const useUploadContext = () => useContext(UploadContext);

export const UploadContextProvider = ({ children }: { children: any }) => {
  const [vidLink, setVidLink] = useState("");
  return (
    <UploadContext.Provider value={{ vidLink, setVidLink }}>
      {children}
    </UploadContext.Provider>
  );
};

