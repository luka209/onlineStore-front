import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSlider.css";

const slides = [
  {
    image: "/images/Strix_G18_KV_16x9_N-p-2000.png",
    title: "Discount on all Smart appliances up to 25%",
    subtitle: "Shop great deals on MacBook, Laptops, PCs and more.",
    button: "Shop Now",
  },
  {
    image: "/images/kv.png",
    title: "Latest ROG XBOX ALLY DEALS",
    button: "Explore",
  },
  {
    image: "/images/h470.jpeg ",
    title: "Big Sale on Electronics",
    subtitle: "ROGs, Headphones, and more on DISCOUNT!",
    button: "Grab Now",
  },
];

function getTimeRemaining(target) {
  const total = Date.parse(target) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60).toString().padStart(2, "0");
  const minutes = Math.floor((total / 1000 / 60) % 60).toString().padStart(2, "0");
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24).toString().padStart(2, "0");
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { total, days, hours, minutes, seconds };
}

const HeroSlider = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();  // <-- Added here

  const [targetDate] = useState(() => {
    const saved = localStorage.getItem("countdownTarget");
    if (saved) return new Date(saved);

    const newDate = new Date();
    newDate.setDate(newDate.getDate() + 185);
    localStorage.setItem("countdownTarget", newDate.toISOString());
    return newDate;
  });

  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(targetDate));

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 100000);
    return () => clearInterval(slideTimer);
  }, []);

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      const remaining = getTimeRemaining(targetDate);
      setTimeLeft(remaining);
    }, 1000);
    return () => clearInterval(countdownTimer);
  }, [targetDate]);


  const handleViewDetailsDualSense = () => {
    navigate("/category/Consoles"); 
  };

  const handleViewDetailsCamera = () => {
    navigate("/category/Photo%20%26%20Video%20Cameras"); 
  };

  return (
    <section className="hero-slider">
      <div className="mainthing">
        <div className="lest">
          <img src={slides[index].image} alt="slide" className="imgggg" />
          <div className="texxt">
            <h1>{slides[index].title}</h1>
            <p>{slides[index].subtitle}</p>
            <button>Explore</button>
          </div>
          <div className="dots">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`dot ${index === i ? "active" : ""}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="right">
          <div className="boxsimpl aurora"></div>
          <div className="twopics">
            <div className="box dualsense">
              <h4>New Dual Sense</h4>
              <p>For PlayStation 5</p>
              <button onClick={handleViewDetailsDualSense}>View Details</button>
            </div>
            <div className="box camera">
              <h4>Instant Cameras</h4>
              <p>Get photo paper as a gift</p>
              <button onClick={handleViewDetailsCamera}>View Details</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;