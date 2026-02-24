import React, { useEffect, useState } from "react";
import { getData } from "./constants/db";
import Card from "./components/card/Card";
import "./App.css";
import Cart from "./components/cart/Cart";

const courses = getData();
const telegram = window.Telegram.WebApp;

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    telegram.ready();
  }, []);

  const onAddItem = (item) => {
    const existItem = cartItems.find((value) => value.id == item.id);
    if (existItem) {
      const newData = cartItems.map((value) =>
        value.id === item.id
          ? { ...value, quantity: value.quantity + 1 }
          : value,
      );
      setCartItems(newData);
    } else {
      const newData = [...cartItems, { ...item, quantity: 1 }];
      setCartItems(newData);
    }
  };

  const onRemoveItem = (item) => {
    setCartItems((prev) =>
      prev
        .map((value) =>
          value.id === item.id
            ? { ...value, quantity: value.quantity - 1 }
            : value,
        )
        .filter((value) => value.quantity > 0),
    );
  };

  const onCheckout = () => {
    telegram.MainButton.text = "Sotib olish :)";
    telegram.MainButton.show();
  };

  return (
    <>
      <h1 className="heading">Sammi kurslari</h1>
      <Cart cartItems={cartItems} onCheckout={onCheckout} />
      <div className="cards_container">
        {courses.map((course) => {
          return (
            <Card
              key={course.id}
              course={course}
              onAddItem={onAddItem}
              onRemoveItem={onRemoveItem}
            />
          );
        })}
      </div>
    </>
  );
};

export default App;
