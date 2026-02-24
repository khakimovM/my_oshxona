import React, { useState } from "react";
import "./Card.css";
import Button from "../button/Button";

const Card = (props) => {
  const [count, setCount] = useState(0);
  const { course, onAddItem, onRemoveItem } = props;

  const handleIncrement = () => {
    setCount(count + 1);
    onAddItem(course);
  };

  const handleDecrement = () => {
    setCount(count - 1);
    onRemoveItem(course);
  };

  return (
    <div className="card">
      {count > 0 && <span className="card_badge">{count}</span>}

      <div className="image_container">
        <img
          src={course.Image}
          alt={course.title}
          width={"100%"}
          height={"230px"}
        />
      </div>

      <div className="card_body">
        <h2 className="card_title">{course.title}</h2>
        <div className="card_price">
          {course.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </div>
      </div>

      <div className="hr"></div>

      <div className="btn_container">
        <Button title={"+"} type={"add"} onClick={handleIncrement} />
        {count > 0 && (
          <Button title={"-"} type={"remove"} onClick={handleDecrement} />
        )}
      </div>
    </div>
  );
};

export default Card;
