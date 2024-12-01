import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { useAppContext } from "../context/AppContext";
import { debounce } from "../utils/utils";
import axios from 'axios'



export const updateEdittedContentAtServer = debounce((data, socketIo) => {
    console.log('newValue', data);
    socketIo?.emit("edit-document", data);
  }, 5000)



  export const fetchDocsService  = async (payload) => {

    try {
        const result = await axios.get(
            `${window.server_url}/api/document/getdocument`,
            {
              headers: {
                authorization: `Bearer ${payload.auth}`, // Add your token or other headers here
                "Content-Type": "application/json",
              },
            }
          );
          const response = result?.data
          console.log('response', response);
          return response;

    }catch(err){
        throw new Error(err);
    }
  

}
