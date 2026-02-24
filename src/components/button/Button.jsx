import React from "react";
import "./Button.css";

const Button = (props) => {
  const { type, title, onClick, disable } = props;

  return (
    <button
      onClick={onClick}
      className={`btn ${(type === "add" && "add") || (type === "remove" && "remove") || (type === "checkout" && "checkout")} 
        ${disable === true && "disable"}
      `}
      disabled={disable}
    >
      {title}
    </button>
  );
};

export default Button;
