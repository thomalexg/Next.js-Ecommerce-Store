import sum from '../sumFunction';

test('sum of shopping cart', () => {
  const quantity = [
    { id: 1, quantity: 2, size: 'S' },
    { id: 2, quantity: 4, size: 'S' },
  ];
  const bikes = [
    {
      imgHead: '/sd.jpg',
      title: 'The dirt jump bike',
      size: 'S',
      price: 500,
    },
    {
      imgHead: '/se.jpg',
      title: 'The Enduro Bike!',
      size: 'S',
      price: 4200,
    },
  ];
  const result = sum(quantity, bikes);
  expect(result).toEqual(17800);
});
