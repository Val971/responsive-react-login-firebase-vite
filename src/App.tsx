
import "antd/dist/antd.css";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Home from "./pages/Home";
import ProtectedRoute from "./pages/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
