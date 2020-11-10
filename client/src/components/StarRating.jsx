import React from 'react'

const StarRating = ({ rating }) => {
  const stars = [];
  // This can be made as a fill stars instead of pushing but for
  // the sake of simplicity, pushing the star based on prop is sufficient
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<i class="fas fa-star"></i>);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<i class="fas fa-star-half-alt"></i>);
    } else {
      stars.push(<i class="far fas-star"></i>);
    }
  }

  return (
    <>
      {stars}
    </>
  )
}

export default StarRating
