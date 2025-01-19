import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../../Context/CaptainContext";
import axios from "axios";

const ProtectRoute = ({ element, type = "User" }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { user } = useContext(UserDataContext);
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      if (
        !token ||
        (type === "User" && !user) ||
        (type === "Captain" && !captain)
      ) {
        navigate(type === "User" ? "/user/login" : "/captain/login");
        return;
      }

      try {
        const endpoint = type === "User" ? "/user/profile" : "/captain/profile";
        const { data, status } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}${endpoint}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (status === 200) {
          if (type === "Captain") {
            setCaptain(data.captain);
          }
        }
      } catch (error) {
        console.error(error);
        navigate(type === "Captain" ? "/captain/login" : "/user/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAccess();
  }, [token, type === "User" ? user : captain]);

  if (isLoading) {
    return <div className="animate-spin">Loading</div>;
  }

  return element;
};

export default ProtectRoute;
