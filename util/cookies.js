import Cookies from 'js-cookie';
export function addCookies(productId, itemNum, price) {
  // Find if the teamMemberId matches any of the array elements
  const cookies = Cookies.getJSON('cart');
  const idInArray = cookies.some((product) => product.id === productId);

  // If the array doesn't contain an element with the teamMemberId,
  // then add a new array element at the end
  if (!idInArray) {
    console.log('It does not exist');
    return [
      ...cookies,
      {
        id: productId,
        quantity: itemNum,
        price: price,
      },
    ];
  }

  // If the array does contain an element matching the
  // teamMemberId, increase the number of visits in that
  // element by 1
  return cookies.map((item) => {
    if (productId === item.id) {
      item.quantity = itemNum + item.quantity;
    }
    return item;
  });
}
