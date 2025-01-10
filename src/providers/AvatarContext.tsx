import React, { createContext, useContext, useState, ReactNode } from "react";

// Create the context
const AvatarContext = createContext<
  | {
      avatarUrl: string;
      avatarUrl2: string;
      setAvatarUrl2: (url: string) => void;
    }
  | undefined
>(undefined);

export const AvatarProvider = ({ children }: { children: ReactNode }) => {
  console.log("");
  const [avatarUrl, setAvatarUrl2] = useState<string>("");
  const avatarUrl2 = avatarUrl;

  return (
    <AvatarContext.Provider value={{ avatarUrl, setAvatarUrl2, avatarUrl2 }}>
      {children}
    </AvatarContext.Provider>
  );
};

// Custom hook to use the AvatarContext
export const useAvatar = () => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error("useAvatar must be used within an AvatarProvider");
  }
  return context;
};
