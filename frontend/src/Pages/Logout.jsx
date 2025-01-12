import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ formType = "User" }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}${
          formType === "User" ? "/user/logout" : "/captain/logout"
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("token");
        navigate("/user/login");
      }
    })();
  }, [token]);

  return <div>Logout</div>;
};

export default Logout;
