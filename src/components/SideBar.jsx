import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { fetchDocsService } from "../services/Document";
import { useNavigate } from "react-router-dom";
import Editor from "./Editor";
import { io } from "socket.io-client";

const SideBar = () => {
  const {
    auth,
    updateContent,
    setAuth,
    setUsers,
    setDocumentContent,
    documentList,
    setDocumentList,
  } = useAppContext();
  const navigate = useNavigate();
  const socketIo = io(window.server_url);
  useEffect(() => {
    console.log("something chnaged!!!!", updateContent);
    setAuth(localStorage.getItem("token") || "");
    setUsers(JSON.parse(localStorage.getItem("user") || null));
    if (!auth) {
      navigate("/");
    } else {
      navigate("/list");
    }
    socketIo.on("document-updated", (newContent) => {
      console.log("newContent", newContent);
      setDocumentContent({ ...newContent._doc });

      (async () => {
        const result = await fetchDocsService({ auth });

        setDocumentList(result?.data || []);
        setDocumentContent(result?.data[0] || "");
      })();
    });

    (async () => {
      const result = await fetchDocsService({ auth });

      setDocumentList(result?.data || []);
      setDocumentContent(result?.data[0] || "");
    })();
  }, [updateContent]);

  // const handleNewDoc = (data) => {
  //   setDocumentContent(data)
  // };

  const handleDocSelection = (data) => {
    setDocumentContent(data);
    navigate("/edit");
  };

  return (
    <div className="bg-gray-100 w-full p-4 border-r border-gray-300">
      <h2 className="font-bold text-lg mb-4">Documets</h2>
      {/* <div onClick={handleNewDoc}>Create New doc</div> */}
      <ul>
        {documentList?.map((data, index) => (
          <ol
            key={index}
            onClick={(e) => handleDocSelection(data)}
            className="mb-2 px-1 py-2 text-gray-700 border-gray-600 text-white rounded-lg bg-blue-500"
          >
            <span className="px-1">{index + 1}.</span>
            {data?.title || ""}
          </ol>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
