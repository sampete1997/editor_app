import React, { createContext, useContext, useState } from "react";

// Create context
const AppContext = createContext();

// Context provider
export const AppProvider = ({ children }) => {
  const [auth, setAuth] = useState("");
  const [documentContent, setDocumentContent] = useState("");
  const [documentList, setDocumentList] = useState([]);
  const [users, setUsers] = useState(JSON.parse (localStorage.getItem('users') || "null") || null);
  const [updateContent, setUpdateContent] = useState("");

  return (
    <AppContext.Provider
      value={{
        auth,
        setAuth,
        documentContent,
        setDocumentContent,
        users,
        setUsers,
        documentList,
        setDocumentList,
        updateContent,
        setUpdateContent

      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access context
export const useAppContext = () => useContext(AppContext);
