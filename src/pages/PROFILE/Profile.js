import React, { useContext } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { LikeContext } from "../../context/LikeContext";

const Profile = () => {
  const { token, user, logout } = useContext(AuthContext);
  const { clearLikes } = useContext(LikeContext);

  const handleLogout = () => {
    logout();        
    clearLikes();    
  };

  return (
    <div className="cont">
      <div className="wrp">
      
        <div className="user-circle">
          {user?.username ? user.username[0].toUpperCase() : "U"}
        </div>

        <div className="welcome-text">
          Hello, <span>{user?.username?.split(" ")[0] || "Sign In"}</span>
        </div>

        <div className="buttonstogether">
          {token ? (
            <>
              <button className="logout1" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/register" className="logout1">Sign-in</Link>
              <Link to="/login" className="logout2">Login</Link>
            </>
          )}
          <Link to="/favorite" className="logout3">Wishlist</Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;