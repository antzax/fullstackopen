const Notification = ({ errorMessage, notificationMessage}) => {
  if(errorMessage) {
    return (
      <div className="error">
        {errorMessage}
      </div>
    )
  }
  
  if(notificationMessage) {
    return (
      <div className="notification">
        {notificationMessage}
      </div>
    )
  }
}

export default Notification