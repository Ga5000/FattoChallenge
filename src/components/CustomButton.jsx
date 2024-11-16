import React from "react";


const CustomButton = ({ text = null, image = null, onClick, disabled = null}) => {
  return (
    <button className="custom-button" onClick={onClick} disabled={disabled}>
      {image && <img src={image} alt="icon" className="button-icon" />}
      {text}
    </button>
  );
};

export default CustomButton;
