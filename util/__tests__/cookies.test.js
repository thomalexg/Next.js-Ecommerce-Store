import { addCookies, deleteProduct } from '../cookies';

test('delete cookie of indexToDelete', () => {
  const indexToDelete = 1;
  const visitsCookieValue = [
    { id: 1, quantity: 3, size: 'S' },
    { id: 1, quantity: 5, size: 'M' },
  ];
  const result = deleteProduct(indexToDelete, visitsCookieValue);
  expect(result).toEqual([{ id: 1, quantity: 3, size: 'S' }]);
});

test('add new product when cookie contains non-matching product', () => {
  const visitsCookieValue = [
    { id: 1, quantity: 3, size: 'S' },
    { id: 1, quantity: 5, size: 'M' },
  ];
  const productId = 2;
  const itemNum = 5;
  const size = 'L';
  const result = addCookies(productId, itemNum, size, visitsCookieValue);
  expect(result).toEqual([
    ...visitsCookieValue,
    { id: productId, quantity: itemNum, size: size },
  ]);
});

test('increment products quantity when cookie contains matching product', () => {
  const visitsCookieValue = [
    { id: 1, quantity: 3, size: 'S' },
    { id: 1, quantity: 5, size: 'M' },
  ];
  const productId = 1;
  const itemNum = 5;
  const size = 'S';
  const result = addCookies(productId, itemNum, size, visitsCookieValue);
  expect(result).toEqual([
    { id: 1, quantity: 8, size: 'S' },
    { id: 1, quantity: 5, size: 'M' },
  ]);
});
