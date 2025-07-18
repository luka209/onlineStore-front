import React from "react";
import "./technicService.css";
import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";
function TechnicService() {
  return (
    <>
      <h1 className="favorite123">Technical Service</h1>
      <div className="service-steps-wrapper">
        <h2 className="service-title">Soltra Offers the Following Types of Services</h2>
        <div className="service-steps">
          <div className="step-row">
            <div className="step">Cartridge refilling and restoration</div>
            <div className="step">Personal computer diagnostics, repair, and software setup</div>
          </div>
          <div className="step-row indent1">
            <div className="step">Laptop diagnostics, repair, and software setup</div>
            <div className="step">Commercial terminal installation and software setup</div>
          </div>
          <div className="step-row indent2">
            <div className="step">Regular maintenance and diagnostics of equipment (UPS, printer, projector, scanner, etc.)</div>
            <div className="step">Power supply unit repair</div>
          </div>
          <div className="step-row indent2">
            <div className="step">Installation and configuration of computer screens and display panels</div>
          </div>
        </div>
      </div>
  <div className="service-contact">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  <p className="phone">
    <FaPhone className="icon" /> 0422 27 17 49
  </p>
</div>

<hr />

<div className="service-location">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  <p className="address">
    <FaMapMarkerAlt className="icon" /> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </p>
</div>
    </>
  );
}

export default TechnicService;