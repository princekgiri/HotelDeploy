import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import '../Css/Login.css'
import Swal from 'sweetalert2'
import AllofBackend from './FunctionToBackend'
import { noteContext } from './NoteState/NoteState'
import { noteContextSo } from '../../HostRouter/JSX/Notestate'
import API_BASE_URL from '../../../config'

function Login() {
  const { logincheck, logincheckstate, setLogincheckstate } = useContext(noteContextSo);
  const { LoginCheck } = AllofBackend();
  const { loginstate } = useContext(noteContext);
  const Navigate = useNavigate();
  const [details, setDetails] = useState({
    email: "",
    password: "",
    role: ""
  })
  useEffect(() => {
    localStorage.setItem('loginstate', false);
  }, [])
  const onClick = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  }
  const onChange = async (e) => {
    e.preventDefault();
    console.log("Here is Login value", loginstate);
    let LoginCheckRes;
    if (details.role) {
      console.log(details.role);
      localStorage.setItem('role', details.role);
      LoginCheckRes = await LoginCheck(details, details.role);
    }
    console.log("LoginCheckRes =", LoginCheckRes);
    if (LoginCheckRes && details.role === "user") {
      console.log("It should go to home");
      Navigate("/home");
      localStorage.setItem('loginstate', true);
      localStorage.setItem('UserEmail', details.email);
      loginstate.current = localStorage.getItem('loginstate');
    }
    else if (LoginCheckRes && details.role === "host") {
      console.log("It should go to home");
      localStorage.setItem('loginstate', true);
      localStorage.setItem('UserEmail', details.email);
      logincheck.current = localStorage.getItem('loginstate');
      console.log("Login value from there is ", logincheck);
      Navigate("/HostHome");
    }
    else {
      loginstate.current = localStorage.setItem('loginstate', false);
      Navigate("/");
    }
  }
  const GoToSignUp = () => {
    //console.log("Went to Submit");
    Navigate("/SignUp");
  }
  const handleSuccess = (credentialResponse) => {
    const decode = jwtDecode(credentialResponse.credential);
    console.log("So the decoded languages is ", decode);
    console.log(decode.email);
    console.log(decode.name);
    console.log(decode.picture);
    let role;
    Swal.fire({
      title: 'Select Your Role Below ',
      text: 'With What Role You want to Register',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'host',
      denyButtonText: 'User'
    }).then(async (result) => {
      if (result.isConfirmed){ role = 'host'}
      else if(result.isDenied){role = 'user'};
      console.log("Role is ", role);
      const url = `${API_BASE_URL}/user/api-google`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: decode.email, name: decode.name, role: role })
      });
      const res = await response.json();
      const { user, existed, success ,duplicate} = res;
      if (existed) {
        alert("You are a old User Welcome ")
        const data = {
          email: user.email,
          password: user.password,
          role: user.role
        }
        const UserGot = await LoginCheck(data, user.role);
        if (UserGot) {
          localStorage.setItem('loginstate', "true");
          localStorage.setItem('UserEmail', user.email);
          localStorage.setItem('role', user.role);
          loginstate.current = localStorage.getItem('loginstate');
          if(user.role=='user'){
              console.log("Running here ")
              localStorage.setItem('role','user')
              console.log("Running here ",localStorage.getItem('role'));
              logincheck.current="true";
          Navigate('/home');
        }
        else{
              console.log("Running here ")
              localStorage.setItem('role','host')
              console.log("Running here ",localStorage.getItem('role'));
              logincheck.current="true";
          Navigate("/Hosthome")
        }
        }
      }
      else {
        if(duplicate){
          alert('Email Id already In Use');
          Navigate('/');
        }else{
          Swal.fire({
          title: 'Please Enter A Passwrd ',
          text: 'Remember Password For Login And please Type Phone Number ',
          html: `
            <input id="swal-input1" class="swal2-input" placeholder="Enter your Phone Number" type="tel">
            <input id="swal-input2" class="swal2-input" placeholder="Enter your Password" type="password">
            <input id="swal-input3" class="swal2-input" placeholder="Confirm Password" type="password">
              `,

          confirmButtonText: 'Save Values ',
          showCancelButton: false,
          preConfirm: () => {
            const phone = document.getElementById('swal-input1').value;
            const password = document.getElementById('swal-input2').value;
            const cpassword = document.getElementById('swal-input3').value;

            if (!phone || !password || !cpassword) {
              Swal.showValidationMessage('Please Enter Both ');
              return false
            }
            return { phone, password ,cpassword}
          }
        }).then(async (result) => {
          console.log(result.value);
          const url = `${API_BASE_URL}/${role}/SignUp`;
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({name:decode.name,email:decode.email,password:result.value.password,number:result.value.phone,role:role,cpassword:result.value.cpassword})
          });
          const res = await response.json();
          console.log(res.message || res.Saved);
          if (res.errors) {
            res.errors.forEach(res => {
              console.log(res);
            });
          }
          else{
            alert('Now Try Once Again Through Google ')
            if(role=='user'){
              console.log("Running here ")
              localStorage.setItem('role','user')
              console.log("Running here ",localStorage.getItem('role'));
              logincheck.current="true";
          Navigate('/home');}
        else{
          localStorage.setItem('role','host')
          console.log("Running here 2")
          console.log("Running here 2",localStorage.getItem('role'));
          logincheck.current="true";
          Navigate("/Hosthome")
        }
          }
        })
        }
      }
    })
  }
  const handleError = () => {
    alert("Login Failed");
  }
  return (
    <>
      <div className="Whole">
        {/* About Button - Top Position */}
        <button className="about-button-top" onClick={() => Navigate('/About')}>
          <span className="about-icon">ℹ️</span>
          <span>About Us</span>
        </button>

        <div className="login-container">
          <div className="login-header">
            <div className="logo-icon">🏨</div>
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign in to continue to your account</p>
          </div>

          <form onSubmit={onChange} className="form">
            <div className="input-group">
              <div className="input-icon">📧</div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={details.email}
                onChange={onClick}
                required
              />
            </div>

            <div className="input-group">
              <div className="input-icon">🔒</div>
              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                id="password"
                value={details.password}
                onChange={onClick}
                required
              />
            </div>

            <div className="role-selection">
              <p className="role-label">Select your role</p>
              <div className="radio-container">
                <div className="radio-option">
                  <input
                    type="radio"
                    name="role"
                    id="landlord"
                    value="host"
                    onChange={onClick}
                    required
                  />
                  <label htmlFor="landlord" className="radio-label">
                    <span className="radio-icon">🏠</span>
                    <span className="radio-text">Landlord</span>
                  </label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    value="user"
                    name="role"
                    id="renter"
                    onChange={onClick}
                    required
                  />
                  <label htmlFor="renter" className="radio-label">
                    <span className="radio-icon">👤</span>
                    <span className="radio-text">Renter</span>
                  </label>
                </div>
              </div>
            </div>

            <button type="submit" className="submit-button">
              <span>Sign In</span>
              <span className="button-arrow">→</span>
            </button>
          </form>

          <div className="signup-prompt">
            <p className="signup-text">Don't have an account?</p>
            <button className="signup-button" onClick={GoToSignUp}>
              Create Account
            </button>
          </div>
          <div>
            <p>Or Log In With</p>
            <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
