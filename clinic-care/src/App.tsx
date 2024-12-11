import React from "react"
import { Routes, Route} from "react-router-dom"
import DoctorLoginPage from "./pages/doctors/DoctorLoginPage";
import DoctorMainPage from "./pages/doctors/DoctorMainPage";
import { AuthGuard } from "./pages/doctors/AuthGuard";
import { QueryClient } from "@tanstack/react-query";
import PatientsLoginPage from "./pages/patients/PatientsLoginPage"


function App(){
  
    const queryClient = new QueryClient();

     return(
     
          
        <div className="App">
     
            <Routes>
                <Route index element={<DoctorLoginPage />} />
                <Route path = "/DoctorLogin" element={<DoctorLoginPage />} />

                <Route path="/protected" element={<AuthGuard />}>
                    <Route path = "DoctorMain" element={<DoctorMainPage />} />
                </Route>

            <Route path = "/patient" element={<PatientsLoginPage />} />
          

            
            </Routes>
            
            </div>
          
    )
     
}

export default App;