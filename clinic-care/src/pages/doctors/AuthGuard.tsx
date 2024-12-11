import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStatusDoctor } from "../../api/authApi";
import  DoctorLoginPage  from "./DoctorLoginPage";
import  DoctorNavBar  from "../../components/doctors/DoctorNavBar"

export function AuthGuard() {
  let authStatus = useAuthStatusDoctor();
  let navigate = useNavigate();

  if (authStatus.status === "success") {
    return (
      <>
        <DoctorNavBar />
        <Outlet />
      </>
    );
  } else {
    return (
      <>
        <DoctorLoginPage />
      </>
    );
  }
}
