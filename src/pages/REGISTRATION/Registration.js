import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext"; 
import "./Registration.css";
import { toast, ToastContainer } from "react-toastify";

function Registration() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    country: "Georgia",
  });
  const { login, setToken } = useContext(AuthContext);
  const [registered, setRegistered] = useState(false);
  const navigate = useNavigate();
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const [message, setMessage] = useState(null);
const [messageType, setMessageType] = useState(null);
  useEffect(() => {
    if (window.google && clientId) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleResponse,
        use_fedcm_for_prompt: true,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { theme: "outline", size: "large" }
      );
    }
  }, [clientId]);

  const handleGoogleResponse = async (response) => {
    try {
      const res = await axios.post("http://localhost:5000/api/users/google", {
        token: response.credential,
      });

      console.log("Google Sign-In Response:", res.data);

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      login(token, user);  

setMessage(`Welcome, ${user.email}! Login successful.`);
setMessageType("success");

      setTimeout(() => navigate("/"), 2500);
    } catch (err) {
      console.error("Google Sign-In error:", err);
      const errorMsg = err.response?.data?.message || "Google Sign-In failed";
 setMessage(errorMsg);
setMessageType("error");
  setTimeout(() => {
    setMessage(null);
    setMessageType(null);
  }, 2500);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setMessage(emailRegex);
setMessageType("error");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/users/register", form);
      login(res.data.token, res.data.user); 

      toast.success("Registration successful!");
      setRegistered(true);
      setTimeout(() => navigate("/"), 2500);
    } catch (err) {
      console.error("Registration error:", err.response);
      const errorMsg = err.response?.data?.message || "Registration failed";
      setMessage(errorMsg);
setMessageType("error");
setTimeout(() => {
  setMessage(null);
  setMessageType(null);
}, 2500);
    }
  };

  return (
    <div className="container-1">
{message && (
  <div className="overlay">
    <div className={`overlay-content message-box ${messageType}`}>
      {messageType === "success" && (
        <div className="success-animation">
          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>
      )}
      {messageType === "error" && (
        <div className="error-animation">
          <svg className="Xmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="Xmark__circle" cx="26" cy="26" r="25" fill="none" />
            <line x1="16" y1="16" x2="36" y2="36" className="cross-line" />
            <line x1="36" y1="16" x2="16" y2="36" className="cross-line" />
          </svg>
        </div>
      )}
      <p>{message}</p>
    </div>
  </div>
)}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <h2 className="form-title">Sign up to Soltra</h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            value={form.email}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            minLength={8}
            onChange={handleChange}
            value={form.password}
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            maxLength={16}
            required
            onChange={handleChange}
            value={form.username}
          />

          <label htmlFor="country">Your Country/Region*</label>
          <select
            id="country"
            name="country"
            required
            onChange={handleChange}
            value={form.country}
          >
            <option value="Georgia">Georgia</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
          </select>

          {!registered && (
            <button type="submit" className="submit-btn">Continue</button>
          )}

          <div id="googleSignInDiv" style={{ marginTop: "20px" }}></div>

          <div className="HaveACC">
            <span>Already have an account?</span>
            <Link to="/login">Sign in →</Link>
          </div>
        </div>

        <div className="terms">
          By creating an account, you agree to the{" "}
          <Link to="/termsofservice">Terms of Service</Link>. For more information about
          Soltra's privacy practices, see the{" "}
          <Link to="#">Soltra Privacy Statement</Link>.
        </div>
      </form>

    
    </div>
  );
}

export default Registration;
