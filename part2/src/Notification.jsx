import React from 'react';

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  const notificationStyle = type === 'error' ? 'notification error' : 'notification success';

  return (
    <div className={notificationStyle}>
      {message}
    </div>
  );
};

export default Notification;
