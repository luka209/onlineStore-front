import React from "react";

const StarRating = ({ ratings }) => {
  const average = Math.round(calculateAverageRating(ratings) * 2) / 2; 
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(average)) {
   
      stars.push(<span key={i} style={{ color: "gold" }}>★</span>);
    } else if (i === Math.ceil(average) && average % 1 !== 0) {
    
      stars.push(
        <span key={i} style={{ color: "gold" }}>
         
        </span>
      );
    } else {
   
      stars.push(<span key={i} style={{ color: "lightgray" }}>☆</span>);
    }
  }

  return (
    <div>
      <div>{stars}</div>    
      <p>შეფასება: {average} / 5 ({ratings.length} შეფასება)</p>
    </div>
  );
};

const calculateAverageRating = (ratings) => {
  if (!ratings || ratings.length === 0) return 0;
  const total = ratings.reduce((sum, rating) => sum + (rating.value || 0), 0);
  return total / ratings.length;
};
export default StarRating;


console.log("ratings:", ratings); 