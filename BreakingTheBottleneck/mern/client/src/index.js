import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {SignIn} from "./components/recordList";

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(

  <React.StrictMode>
    <BrowserRouter>
      { window.location.href.includes("/signin") ?<SignIn />:<App />}
    </BrowserRouter>
  </React.StrictMode>
  
);