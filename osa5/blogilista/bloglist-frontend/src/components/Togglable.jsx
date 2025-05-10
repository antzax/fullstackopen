import { useState } from "react";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };
  const hideWhenVisible = { display: visible ? "none" : "" };

  const changeVisiblity = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={changeVisiblity}>{props.openLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={changeVisiblity}>{props.closeLabel}</button>
      </div>
    </div>
  );
};

export default Togglable;
