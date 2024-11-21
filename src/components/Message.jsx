import { useEffect } from 'react';
import failedIcon from '../assets/failed-icon.svg';
import successIcon from '../assets/success-icon.svg';
import warningIcon from '../assets/warning-icon.svg';
import messageType from '../constants/messageType';
import '../styles/Message.css';

function Message({ text, type, setMessage }) {
    let icon;
    switch (type) {
        case messageType.SUCCESS:
            icon = successIcon;
            break;
        case messageType.WARNING:
            icon = warningIcon;
            break;
        case messageType.FAILED:
            icon = failedIcon;
            break;
        default:
            icon = null;
            break;
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage({ text: null, messageType: null });
        }, 3000);
        return () => clearTimeout(timer);
    }, [setMessage]);

    return (
        <div className={`message-${type}`}>
            <img className='message-img' src={icon} alt="status-icon" />
            <p className="message-text">{text}</p>
        </div>
    );
}

export default Message;
