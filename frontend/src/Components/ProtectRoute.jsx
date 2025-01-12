import { useContext, useEffect } from "react";
import { UserDataContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const ProtectRoute = ({ element }) => {
  const { user } = useContext(UserDataContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !token) {
      navigate("/user/login");
    }
  }, [user, token]);

  return token ? element : "";
};

export default ProtectRoute;
