import React, { createContext, useContext, useState } from "react";

// Create context
const AppContext = createContext();

// Context provider
export const AppProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [documentContent, setDocumentContent] = useState("");
  const [users, setUsers] = useState([]);

  return (
    <AppContext.Provider
      value={{
        username,
        setUsername,
        documentContent,
        setDocumentContent,
        users,
        setUsers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access context
export const useAppContext = () => useContext(AppContext);
