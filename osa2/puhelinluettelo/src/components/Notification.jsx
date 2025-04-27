const Notification = ({ errorMessage, notificationMessage }) => {
  const notificationStyle = {
    fontSize: 28,
    color: errorMessage ? "red" : "green",
    backgroundColor: "lightblue",
    fontWeight: "bold"
  };

  return (
    <div style={notificationStyle}>{errorMessage || notificationMessage}</div>
  );
};

export default Notification;
