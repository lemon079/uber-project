import { useContext, useEffect } from "react";
import { UserDataContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../Context/CaptainContext";

const ProtectRoute = ({ element, type = "User" }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { user } = useContext(UserDataContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    if (type === "User") {
      if (!user || !token) {
        navigate("/user/login");
      }
    } else if (type === "Captain") {
      if (!captain || !token) {
        navigate("/user/login");
      }
    }
  }, [type === "User" ? user : captain, token]);

  return element;
};

export default ProtectRoute;
