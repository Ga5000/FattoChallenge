import React from "react";

const CustomButton = ({ 
  text = null, 
  image = null, 
  onClick, 
  onDragOver = null, 
  onDragLeave = null, 
  onDrop = null, 
  disabled = null, 
  className = null 
}) => {
  return (
    <button 
      className={className} 
      onClick={onClick} 
      onDragOver={onDragOver} 
      onDragLeave={onDragLeave} 
      onDrop={onDrop} 
      disabled={disabled}
    >
      {image && <img src={image} alt="icon" className="button-icon" />}
      {text}
    </button>
  );
};

export default CustomButton;
