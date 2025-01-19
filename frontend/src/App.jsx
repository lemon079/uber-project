import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import StartPage from "./Pages/StartPage";
import Home  from "./Pages/Home";
import ProtectRoute from "./Components/user/ProtectRoute";
import Logout from "./Pages/Logout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/user/home" element={<ProtectRoute element={<Home type="User"/>}/>} />
        <Route path="/captain/home" element={<ProtectRoute element={<Home type="Captain"/>}/>} />
        <Route path="/user/login" element={<Login type="User" />} />
        <Route path="/captain/login" element={<Login type="Captain" />} />
        <Route path="/user/signup" element={<Signup type="User" />} />
        <Route path="/captain/signup" element={<Signup type="Captain" />} />
        <Route path="/user/logout" element={<ProtectRoute element={<Logout type="User"/>} />} />
        <Route path="/captain/logout" element={<ProtectRoute element={<Logout type="Captain"/>} />} />
      </Routes>
    </Router>
  );
}

export default App;
