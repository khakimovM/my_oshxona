export const totalPrice = (arr) => {
  return arr.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
};
