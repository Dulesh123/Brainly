import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Forgetpassword from "./components/Forgetpassword";
import Resetpassword from "./components/Resetpassword";
import TypeSelect from "./components/Typeselect";
import Linkdata from "./components/Linkdata";
import Filedata from "./components/Filedata";


function App() {
  return (
    <GoogleOAuthProvider  clientId="623827049629-rdqh9cq97ccdfda2hfnt7qkbd53trcdc.apps.googleusercontent.com">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
           <Route path="profile" element={<Profile/>} />
           <Route path="signup" element={<Signup/>} />
             <Route path="signin" element={<Signin/>} />
            <Route path="forgot-password" element={<Forgetpassword/>} />
             <Route path="/reset-password" element={<Resetpassword/>} />
              <Route path="/typeselect" element={<TypeSelect/>} />
                   <Route path="/typeselect/add-link" element={<Linkdata/>} />
                   <Route path="/typeselect/add-file" element={<Filedata/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>   
  );
}

export default App;