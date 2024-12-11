import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../api/authApi';
import { queryClient } from "../../index";
import './DoctorLoginForm.scss';
const logo = require('../../image/logo.jpeg');

export const DoctorLoginForm = () => {
  const [usernameInput, setUsernameInput] = useState("Johnlam");
  const [passwordInput, setPasswordInput] = useState("1234");

  const navigate = useNavigate();

  const onLogin = useMutation({
    mutationFn: async (data: { username: string; password: string }) =>
      login(data.username, data.password),
      onSuccess: (data) => {
      console.log("on success checking", data);
      localStorage.setItem("clinicToken", data);
      console.log("hihihihihii");
      navigate("/protected/DoctorMain")

      queryClient.invalidateQueries({ queryKey: ["authStatus"] });
    },
    onError: (e) => {
      console.log("error!!", e);
    },
  });

  //input field onchange will set the username and pw input by props and state
  //submit button 帶 value入去onLogin mutate 
  const handleLogin = (event:any) => {
    event.preventDefault();
    console.log("loggging in");
    console.log(usernameInput, passwordInput)
    onLogin.mutate({ username: usernameInput, password: passwordInput });
  };

  useEffect(() => {
    // Add a custom class to the body
    document.body.classList.add('doctor-login-body');

    // Cleanup: Remove the class when the component unmounts
    return () => {
      document.body.classList.remove('doctor-login-body');
    };
  }, []); // Run only once when the component mounts

  return (
    <div className="form-container">
      <form className="signIn-Container" onSubmit={handleLogin}>
        <div>
          <img src={logo} alt="company logo" />
        </div>
        <div className="login-div">LOGIN</div>
        <div className="signIn-InfoBox">
          <input
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            className="inputBox"
            type="username"
            name="username"
            placeholder="username"
          />
        </div>
        <div className="signIn-InfoBox">
          <input
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="inputBox"
            type="password"
            name="password"
            placeholder="password"
          />
        </div>
        <div className="submit-btn">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};