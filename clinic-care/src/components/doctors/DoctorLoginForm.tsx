import React from 'react';
import './DoctorLoginForm.scss';
const logo =  require("../../image/logo.jpeg");


export const DoctorLoginForm = () => {

  return (
    <div className = 'form-container'>
      <form className = "signIn-Container">
      <div>
      <img src={logo} alt="company logo" />
    </div>
      <div className='login-div'>LOGIN</div>
        <div className = "signIn-InfoBox">
          <input className='inputBox'
          type = 'username'
          name = 'password'
          placeholder='username'
         />
         </div>       
          <div className = "signIn-InfoBox">
          
          <input className='inputBox'
          type = 'username'
          name = 'password'
          placeholder='password'
         />
         </div>
         <div className='submit-btn'>
          <button type="submit">Submit</button>
          </div>
          </form> 
          </div>
  )
}
function useState(arg0: { width: number; height: number; }): [any, any] {
  throw new Error('Function not implemented.');
}

function useEffect(arg0: () => () => void, arg1: never[]) {
  throw new Error('Function not implemented.');
}

