import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/api/users/reset-password/${token}`, { password });
      toast.success(res.data.message || "Password reset successful");

  
      setTimeout(() => {
        navigate("/login");  
      }, 2500); 
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div>
      <h2 style={{marginTop: "100px"}}>Reset Password</h2>
      <form onSubmit={handleSubmit} style={{gap:"25px", marginTop:"150px"}}>
        <label>New Password:</label>
        <input
          style={{width: "400px"}}
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" style={{backgroundColor:"#000080", padding: "10px",borderRadius: "5px", marginBottom:"80px", color: "white"}}>
          Reset Password
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default ResetPassword;