import React, { useState } from "react";

export const AppContext = React.createContext({
  channel: null,
  setChannelT: (channel: any) => {},
  thread: null,
  setThread: (thread: any) => {},
});

export const AppProvider = ({ children }) => {
  const [channel, setChannelT] = useState();
  const [thread, setThread] = useState();

  return (
    <AppContext.Provider value={{ channel, setChannelT, thread, setThread }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
