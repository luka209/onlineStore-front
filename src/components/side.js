import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { categories } from "../data/categoriesData";
import "./Sidebar.css";
import "../layout/Layout";

function Side() {
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [hoveredCategoryIndex, setHoveredCategoryIndex] = useState(null);
  const [submenuHovered, setSubmenuHovered] = useState(false);

  const activeSubItems =
    hoveredCategoryIndex !== null ? categories[hoveredCategoryIndex].subItems : [];

  const sortedSubItems = [...activeSubItems].sort((a, b) => a.localeCompare(b));


  return (
    <>
     <div
  className="sidebar-container"
  onMouseEnter={() => {
    setSidebarHovered(true);
    setSubmenuHovered(true);
  }}
  onMouseLeave={() => {
    setSidebarHovered(false);
    setSubmenuHovered(false);
    setHoveredCategoryIndex(null);
  }}
>
  <div className={`sidebar-hover ${sidebarHovered ? "expanded" : ""}`}>
    <div className="sidebar-header">
      <FaBars className="menu-icon" />
      <span className="header-text">All Categories</span>
    </div>

    <div className="category-list">
      {categories.map((item, index) => (
        <div
          className="category-item"
          key={index}
          onMouseEnter={() => setHoveredCategoryIndex(index)}
        >
          <span className="icon">{item.icon}</span>
          <Link
            to={`/category/${encodeURIComponent(item.label)}`}
            className="category-label-link"
          >
            {item.label}
          </Link>
        </div>
      ))}
    </div>
  </div>

  {hoveredCategoryIndex !== null && (   
    <div className="submenu" style={{ left: sidebarHovered ? "265px" : "60px" }}>
      {sortedSubItems.map((subItem, subIndex) => (
        <li key={subIndex} className="submenu-item">
          <Link
            to={`/category/${encodeURIComponent(subItem)}`}
            className="submenu-link"
            onClick={() => {
              setSidebarHovered(false);
              setHoveredCategoryIndex(null);
            }}
          >
            {subItem}
          </Link>
        </li>
      ))}
    </div>
  )}
</div>

{(sidebarHovered || submenuHovered) && (
  <div
    className="body-overlay"
    onClick={() => {
      setSidebarHovered(false);
      setHoveredCategoryIndex(null);
      setSubmenuHovered(false);
    }}
  />
)}
    </>
  );
}

export default Side;