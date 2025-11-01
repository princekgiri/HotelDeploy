import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import '../Css/SignUp.css'
import useBackend from './FunctionToBackend'
const SignUp=()=>{
  const Navigate=useNavigate();
  const {SignUpUsers}=useBackend();
  const [details,setDetails]=useState({
    name:"",
    email:"",
    password:"",
    cpassword:"",
    role:'',
    number:''
  });
  const onChange=(e)=>{
    setDetails({...details,[e.target.name]:e.target.value});
  }
  const setRole=(e)=>{
    e.preventDefault();
    const {value,name}=e.currentTarget;
    console.log("Value is this",value);
    setDetails(()=>{
      const updated={...details,[name]:value};
      console.log(updated);
      return updated;
    })
  }
  const onSubmit=(e)=>{
    e.preventDefault();
    SignUpUsers(details,details.role);
    Navigate("/");
  }
return(
  <>
  <div className="signup-whole">
    <div className="signup-container">
      {/* Header */}
      <div className="signup-header">
        <div className="logo-icon">🏠</div>
        <h1 className="signup-title">Create Account</h1>
        <p className="signup-subtitle">Join us and start your journey</p>
      </div>

      {/* Form */}
      <form className="signup-form" onSubmit={onSubmit} method="POST">
        {/* Name Input */}
        <div className="input-group">
          <span className="input-icon">👤</span>
          <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="Full Name" 
            onChange={onChange} 
            value={details.name}
            required
          />
        </div>

        {/* Email Input */}
        <div className="input-group">
          <span className="input-icon">📧</span>
          <input 
            type="email" 
            name="email" 
            id="email"  
            onChange={onChange} 
            value={details.email}
            placeholder="Email Address"
            required
          />
        </div>

        {/* Password Input */}
        <div className="input-group">
          <span className="input-icon">🔒</span>
          <input 
            type="password" 
            name="password" 
            id="password" 
            onChange={onChange} 
            value={details.password}
            placeholder="Password"
            required
          />
        </div>

        {/* Confirm Password Input */}
        <div className="input-group">
          <span className="input-icon">🔑</span>
          <input 
            type="password" 
            name="cpassword" 
            id="cpassword" 
            placeholder="Confirm Password" 
            onChange={onChange} 
            value={details.cpassword}
            required
          />
        </div>
        <div className="input-group">
          <span className="input-icon">🔑</span>
          <input 
            type="text" 
            name="number" 
            id="cpassword" 
            placeholder="Your Phone Number" 
            onChange={onChange} 
            value={details.number}
            required
          />
        </div>

        {/* Role Selection */}
        <div className="role-selection">
          <label className="role-label">Select Your Role</label>
          <div className="radio-container">
            <div className="radio-option">
              <input 
                type="radio" 
                id="Userrole" 
                name="role" 
                value="user" 
                onChange={setRole}
                checked={details.role === 'user'}
              />
              <label htmlFor="Userrole" className="radio-label">
                <span className="radio-icon">👤</span>
                <span className="radio-text">Renter</span>
              </label>
            </div>

            <div className="radio-option">
              <input 
                type="radio" 
                id="Hostrole" 
                name="role" 
                value="host" 
                onChange={setRole}
                checked={details.role === 'host'}
              />
              <label htmlFor="Hostrole" className="radio-label">
                <span className="radio-icon">🏠</span>
                <span className="radio-text">Landlord</span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button" onClick={onSubmit}>
          Create Account
          <span className="button-arrow">→</span>
        </button>
      </form>

      {/* Login Prompt */}
      <div className="login-prompt">
        <p className="login-text">Already have an account?</p>
        <button 
          type="button" 
          className="login-button"
          onClick={() => Navigate('/')}
        >
          Sign In
        </button>
      </div>
    </div>
  </div>
  </>
)
}

export default SignUp