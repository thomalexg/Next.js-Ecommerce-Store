export default function sum(quantity, bikes) {
  return quantity
    .map((e, i) => {
      return e.quantity * bikes[i].price;
    })
    .reduce((a, v) => {
      return a + v;
    });
}
