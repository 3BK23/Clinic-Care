import React from "react"
import { Routes, Route} from "react-router-dom"
import DoctorLoginPage from "./pages/doctors/DoctorLoginPage";


function App(){
  
      
     return(
       
            <Routes>
                <Route index element={<DoctorLoginPage />} />
                <Route path = "/DoctorLogin" element={<DoctorLoginPage />} />
            
        </Routes>
      
    )
     
}

export default App;