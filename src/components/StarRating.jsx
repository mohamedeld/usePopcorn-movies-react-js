import { useState } from "react";
import Star from "./Star";
const ratingStyle = {
  display: "flex",
  alignItems: "center",
  gap: "1px",
};
const StarRating = ({ maxRating, color, size }) => {
  const [star, setStar] = useState(0);
  const [tempRating, setTempRating] = useState(0);
  return (
    <div style={{ display: "flex" }}>
      <div style={ratingStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            selectStar={() => setStar(i + 1)}
            full={tempRating ? tempRating >= i + 1 : star >= i + 1}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={{ marginLeft: "10px" }}>{tempRating || star || ""}</p>
    </div>
  );
};

export default StarRating;
