import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import messageType from "../constants/messageType";
import '../styles/Notification.css';

import successIcon from "../assets/success-icon.svg";
import warningIcon from "../assets/warning-icon.svg";
import failedIcon from "../assets/failed-icon.svg";

function Notification({ message, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); 
    const timer = setTimeout(() => {
      setIsVisible(false); 
      setTimeout(onClose, 3500); 
    }, 3500);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  const getIconForMessageType = (type) => {
    switch (type) {
      case messageType.SUCCESS:
        return successIcon;
      case messageType.WARNING:
        return warningIcon;
      case messageType.FAILED:
      default:
        return failedIcon;
    }
  };

  const getClassName = () => {
    if (message.type === messageType.SUCCESS) {
      return isVisible ? "message-SUCCESS show" : "message-SUCCESS";
    } else if (message.type === messageType.WARNING) {
      return isVisible ? "message-WARNING show" : "message-WARNING";
    } else if (message.type === messageType.FAILED) {
      return isVisible ? "message-FAILED show" : "message-FAILED";
    }
    return "";
  };

  return (
    <div className={getClassName()}>
      <img src={getIconForMessageType(message.type)} alt={`${message.type}-icon`} />
      {message.text}
    </div>
  );
}

Notification.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default Notification;
