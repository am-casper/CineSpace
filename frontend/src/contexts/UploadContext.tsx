"use client";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
interface ContextProps {
    publicId: string,
    setPublicId: Dispatch<SetStateAction<string>>,
    
}
const UploadContext = createContext<ContextProps>({ publicId: "", setPublicId: (): string => "" });
export const useUploadContext = () => useContext(UploadContext);

export const UploadContextProvider = ({ children }: { children: any }) => {
  const [publicId, setPublicId] = useState("");
  return (
    <UploadContext.Provider value={{ publicId: publicId, setPublicId: setPublicId }}>
      {children}
    </UploadContext.Provider>
  );
};

