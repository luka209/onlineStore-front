import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../context/AuthContext"; 
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); 
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", form);

      toast.success(res.data.message || "Login successful!");

      if (res.data.token && res.data.user) {
        login(res.data.token, res.data.user);
      }

      setTimeout(() => navigate("/"), 1500); 
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group-1">
          <h2 className="form-title">Log In to Soltra</h2>
          
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
          />

          <label htmlFor="password">Password*</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}
          />

<div className="forgot-password">
  <Link to="/forgotpassword">Forgot password?</Link>
</div>
          <div className="help-text">
            You have 10 attempts to login, if you use 10 attempts you will be temporarily blocked from signing in.
          </div>

          <button type="submit" className="submit-btn">
            Continue
          </button>

          <div className="HaveACC">
            <span>Don't have an account?</span>
            <Link to="/register">Sign Up →</Link>
          </div>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Login;