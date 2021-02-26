import Cookies from 'js-cookie';
// export function addCookies(productId, itemNum, size) {
//   // Find if the teamMemberId matches any of the array elements
//   const cookies = Cookies.getJSON('cart');
//   const idInArray = cookies.some((product) => product.id === productId);

//   // If the array doesn't contain an element with the teamMemberId,
//   // then add a new array element at the end
//   if (!idInArray) {
//     console.log('It does not exist');
//     return [
//       ...cookies,
//       {
//         id: productId,
//         quantity: itemNum,
//         size: size
//       },
//     ];
//   }

//   // If the array does contain an element matching the
//   // teamMemberId, increase the number of visits in that
//   // element by 1
//   return cookies.map((item) => {
//     if (productId === item.id) {
//       item.quantity = itemNum + item.quantity;
//     }
//     return item;
//   });
// }
export function addCookies(productId, itemNum, size) {
  // Find if the teamMemberId matches any of the array elements
  const cookies = Cookies.getJSON('cart');
  const idInArray =
    cookies.some((product) => product.id === productId) &&
    cookies.some((product) => product.size === size);

  // If the array doesn't contain an element with the teamMemberId,
  // then add a new array element at the end
  if (!idInArray) {
    console.log('It does not exist');
    return [
      ...cookies,
      {
        id: productId,
        quantity: itemNum,
        size: size,
      },
    ];
  }

  // If the array does contain an element matching the
  // teamMemberId, increase the number of visits in that
  // element by 1
  return cookies.map((item) => {
    if (size === item.size) {
      item.quantity = itemNum + item.quantity;
    }
    return item;
  });
}
export function addQuantity(productId, size, quantity) {
  const cookies = Cookies.getJSON('cart');

  return cookies.map((item) => {
    if (productId === item.id && size === item.size) {
      item.quantity = quantity + 1;
    }
    return item;
  });
}

export function subQuantity(productId, quantity) {
  const cookies = Cookies.getJSON('cart');

  return cookies.map((item) => {
    if (productId === item.id) {
      item.quantity = quantity - 1;
    }
    return item;
  });
}

export function changeQuantity(productId, quantity) {
  const cookies = Cookies.getJSON('cart');

  return cookies.map((item) => {
    if (productId === item.id) {
      item.quantity = quantity;
    }
    return item;
  });
}
export function deleteProduct(index) {
  const cookies = Cookies.getJSON('cart');

  cookies.splice(index, 1);
  return cookies;
  // const newCookies = cookies.filter((e) => e.index !== index);
  // return newCookies;
}
