import { totalPrice } from "../../units/total-price";
import Button from "../button/Button";
import "./Cart.css";

const Cart = ({ cartItems, onCheckout }) => {
  return (
    <div className="cart_container">
      <p>
        Umumiy narx:{" "}
        {totalPrice(cartItems).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </p>
      <Button
        title={cartItems.length === 0 ? "Buyurtma berish" : "To'lov"}
        type={"checkout"}
        disable={cartItems.length === 0 ? true : false}
        onClick={onCheckout}
      />
    </div>
  );
};

export default Cart;
