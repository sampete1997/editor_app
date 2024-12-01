import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { fetchDocsService, updateEdittedContentAtServer } from "../services/Document";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import { io } from "socket.io-client";

const Editor = () => {
  const socketIo = io(window.server_url);
  const { documentContent, updateContent, setUpdateContent,setDocumentList,setDocumentContent, users, auth, setAuth } =
    useAppContext();
  const [socket, setSocket] = React.useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setAuth(localStorage.getItem("token") || "");
    if (!auth) {
      navigate("/");
    }

    socketIo.emit("join", documentContent._id);
    setSocket(socketIo);

    socketIo.on("document-updated", (newContent) => {
      console.log("newContent", newContent);
      setDocumentContent({ ...newContent._doc });
      setUpdateContent({ ...newContent._doc })
    });

    return () => {
      socketIo.disconnect();
    };
  }, [documentContent, updateContent]);



  const handleTitle = (e) => {
    const title = e.target.value;
    const payload = {
      content: documentContent.content,
      last_updated_by: users.email,
      doc_id: documentContent._id,
      title: title,
    };
    setDocumentContent({ ...documentContent, title });
    updateEdittedContentAtServer(payload, socketIo);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const payload = {
      content: value,
      last_updated_by: users.email,
      doc_id: documentContent._id,
      title: documentContent.title,
    };
    updateEdittedContentAtServer(payload, socketIo);

    setDocumentContent({ ...documentContent, content: value });
  };

  return (
      <div className="p-4 ml-10 w-full">
        <p>Title</p>
        <input
          type="text"
          className="w-[80%] h-auto p-1"
          placeholder="Enter Title"
          value={documentContent?.title || ""}
          onChange={handleTitle}
        />
        <textarea
          className="w-full h-[70vh] p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-lg"
          value={documentContent.content || ""}
          onChange={handleChange}
          placeholder="Start typing here..."
        ></textarea>
      </div>
  );
};

export default Editor;
