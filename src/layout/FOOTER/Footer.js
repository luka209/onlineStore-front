import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <section className="footer">
      <div className="footer-section">
        <div className="footer-content">
          <h4>Soltra</h4>
          <ul>
            <li><Link to="#" className="Link">About us</Link></li>
            <li><Link to="#" className="Link">Contact</Link></li>
            <li><Link to="#" className="Link">Products</Link></li>
          </ul>
        </div>

        <div className="footer-content">
          <h4>Service</h4>
          <ul>
            <li><Link to="#" className="Link">Delivery</Link></li>
            <li><Link to="#" className="Link">Warranty</Link></li>
            <li><Link to="#" className="Link">Return</Link></li>
            <li><Link to="#" className="Link">Technical service</Link></li>
          </ul>
        </div>

        <div className="footer-content">
          <h4>Account</h4>
          <ul>
            <li><Link to="#" className="Link">Login in</Link></li>
            <li><Link to="#" className="Link">Registration</Link></li>
            <li><Link to="#" className="Link">Cart</Link></li>
            <li><Link to="#" className="Link">Favorites</Link></li>
          </ul>
        </div>

        <div className="footer-content">
          <h4>Contact us</h4>
          <ul>
            <li className="text"><FaEnvelope /> Soltra@gmail.com</li>
            <li className="text"><FaPhone /> +995 595 08 68 90</li>
            <li className="text"><FaMapMarkerAlt /> Batumi, Georgia</li>
            <li className="text"><FaClock /> Mon-Sat: 10:00-20:00</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Footer;  