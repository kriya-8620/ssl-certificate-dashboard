import { BrowserRouter, Routes, Route } from "react-router-dom";


import MainLayout from "./layout/MainLayout";



import SSLUpload from "./pages/SSLUpload"
import SSLDashboard from "./pages/SSLDashboard"

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<MainLayout />}>

    

          
          <Route path="ssl-upload" element={<SSLUpload />}/>
          <Route path="ssl-dashboard" element={<SSLDashboard />}/>
        
        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;