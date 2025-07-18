import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/forgotpassword", { email });
      toast.success("Password reset link sent to your email.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send reset email.");
    }
  };

  return (
    <div className="container">
      <h2 style={{marginTop: "100px", color:"white"}}>Forgot Your Password?</h2>
      <form  style={{gap:"40px"}} onSubmit={handleSubmit}>
        <label style={{color:"white", marginTop:"50px"}} htmlFor="email">Enter your email address:</label>
        <input
        style={{color:"black", border: "0", width: "350px" }}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
        />
        <button type="submit"  style={{color:"white", border: "0", padding:"15px", backgroundColor:"#000080", cursor:"pointer"  }}>Send Reset Link</button>
      </form>
    </div>
  );
}

export default ForgotPassword;