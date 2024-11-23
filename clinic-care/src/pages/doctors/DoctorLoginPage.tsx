import React, { useState, useEffect } from 'react';
import "./DoctorLoginPage.scss"
import { DoctorLoginForm } from "../../components/doctors/DoctorLoginForm"


export default function DoctorLoginPage(){
   // State to store window width and height
   const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Function to handle window resize
  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  // useEffect to add and clean up the resize event listener
  useEffect(() => {
    // Add event listener on component mount
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

    return(
        <>         
         <DoctorLoginForm />
        </>
        
        
    )
}


