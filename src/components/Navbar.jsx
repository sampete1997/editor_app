import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const { auth, users, setUsers, setAuth } = useAppContext();

  const navigate = useNavigate()
  useEffect(() => {

    setAuth(localStorage.getItem("token") || "")
    setUsers(JSON.parse(localStorage.getItem("user") || null))
    if (!auth) {
      navigate("/")

    }else{
      navigate("/list");
  }

  }, [auth])

  const handleLogout = () => {
    localStorage.setItem("token", "")
    localStorage.setItem("user", "")
    setAuth("")
    setUsers("")
    navigate('/')
  }

  return (

    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
     <Link to={"/list"}> <h1 className="text-xl font-bold">Collaborative Document</h1> </Link>
      <div>
        <span className="text-sm mr-4">Welcome {users?.username || ""}</span>
        {auth && (
          <button onClick={handleLogout} className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-500">
            Logout
          </button>
        )
        }
      </div>
    </div>
  );
};

export default Navbar;
