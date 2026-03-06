import React, { useCallback, useEffect, useState } from "react";
import { getData } from "./constants/db";
import Card from "./components/card/Card";
import "./App.css";
import Cart from "./components/cart/Cart";
import axios from "axios";
import Particles from "./Particlec";

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

  const onSendData = useCallback(async () => {
    const queryId = telegram.initDataUnsafe?.query_id;

    try {
      telegram.MainButton.showProgress();

      if (queryId) {
        await axios.post(
          "https://myoshxonatelegramwebapp-73389b9cb104.herokuapp.com/web-data",
          { products: cartItems, queryId },
        );
        telegram.close();
      } else {
        telegram.sendData(JSON.stringify(cartItems));
      }
    } catch (error) {
      console.error("So'rov yuborishda xatolik:", error);
      telegram.showAlert(
        "Xaridingizni amalga oshirishda xatolik yuz berdi. Iltimos qayta urinib ko'ring.",
      );
    } finally {
      telegram.MainButton.hideProgress();
    }
  }, [cartItems]);

  useEffect(() => {
    telegram.onEvent("mainButtonClicked", onSendData);

    return () => telegram.offEvent("mainButtonClicked", onSendData);
  }, [onSendData]);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        height: "100%",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <Particles
          particleColors={["#ffffff"]}
          particleCount={2000}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      <div style={{ position: "relative", zIndex: 1, padding: "20px" }}>
        <h1 className="heading">My oshxona</h1>
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
      </div>
    </div>
  );
};

export default App;
