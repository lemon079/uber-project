import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserContext from "./Context/UserContext.jsx";
import CaptainContext from "./Context/CaptainContext.jsx";
import SharedContext from "./Context/Shared.jsx";
import "leaflet/dist/leaflet.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SharedContext>
      <CaptainContext>
        <UserContext>
          <App />
        </UserContext>
      </CaptainContext>
    </SharedContext>
  </StrictMode>
);
