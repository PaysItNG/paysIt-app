import React, { FC } from "react";

type PropType = {
  size?: number; // Size of the spinner
  centered?: boolean; // Whether to center the spinner
};
const StarLoader: FC<PropType> = ({ size = 28, centered = false }) => {
  // Define styles for the spinner based on the size prop
  const spinnerStyle: React.CSSProperties = {
    fontSize: `${size}px`,
    position: "relative",
    display: "inline-block",
    width: `${size}px`,
    height: `${size}px`,
  };

  // Define styles for the centered spinner
  const centeredStyle: React.CSSProperties = {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: "auto",
  };

  // Define styles for the spinner blades based on the size prop
  const bladeStyle = {
    position: "absolute",
    left: `${0.4629 * size}px`,
    bottom: 0,
    width: `${0.074 * size}px`,
    height: `${0.2777 * size}px`,
    borderRadius: "0.0555em",
    backgroundColor: "transparent",
    transformOrigin: `center ${-0.2222 * size}px`,
    animation: "spinner-fade9234 1s infinite linear",
  };

  // Keyframes for the animation (can be added dynamically)
  const keyframes = `
        @keyframes spinner-fade9234 {
            0% { background-color: #69717d; }
            100% { background-color: transparent; }
        }
    `;

  // Create a style tag for keyframes
  React.useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = keyframes;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, [keyframes]);

  return (
    <div style={{ ...spinnerStyle, ...(centered ? centeredStyle : {}) }}>
      {Array.from({ length: 12 }, (_, i) => (
        <div
          key={i}
          style={
            {
              ...bladeStyle,
              animationDelay: `${(i * 0.083).toFixed(3)}s`,
              transform: `rotate(${i * 30}deg)`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};

export default StarLoader;
