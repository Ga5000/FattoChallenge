import React from "react";


const CustomButton = ({ text = null, image = null, onClick, disabled = null, className = null}) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {image && <img src={image} alt="icon" className="button-icon" />}
      {text}
    </button>
  );
};



export default CustomButton;
