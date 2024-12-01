import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import LoginForm from "./Login";
import Editor from "./Editor";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { auth, users, setAuth, setUsers } = useAppContext();

  useEffect(() => {
    setAuth(localStorage.getItem("token") || "");
    setUsers(JSON.parse(localStorage.getItem("user") || null));
    if (!auth) {
      navigate("/");
    }else{
        navigate("/edit");
    }
  }, []);

  return <div className="">{auth ? <Editor /> : <LoginForm />}</div>;
};
export default Home;
