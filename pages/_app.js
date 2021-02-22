import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [cartNum, setCartNum] = useState(
    Cookies.getJSON('cart')?.length
      ? Cookies.getJSON('cart').reduce((a, v) => {
          const newCount = a.quantity + v.quantity;
          return { quantity: newCount };
        }).quantity
      : 0,
  );

  useEffect(() => {
    if (!Cookies.getJSON('cart')) {
      Cookies.set('cart', []);
    }
    // const cNum = 0;
    // // Cookies.getJSON('cart').length > 0 || Cookies.getJSON('cart')
    // //   ? Cookies.getJSON('cart').reduce((a, v) => {
    // //       return a.quantity + v.quantity;
    // //     }, 0)
    // //   : 0;
    // setCartNum(cNum);
  }, []);
  return <Component cartNum={cartNum} setCartNum={setCartNum} {...pageProps} />;
}

export default MyApp;
