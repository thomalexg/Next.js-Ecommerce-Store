/** @jsxImportSource @emotion/react */ import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const headerStyles = css`
  background-color: rgba(210, 215, 211, 1);
  width: 100%;
  position: sticky;
  /* height: 110px; */
  min-height: 50px;
  height: 15vh;
  top: 0;
  left: 0;

  .gridCon {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    z-index: 10;
  }
  .logo {
    justify-self: center;
  }
  .logo_link:hover {
    cursor: pointer;
  }
  .scart {
    justify-self: end;
  }
  .hd {
    text-align: center;
    z-index: 8;
  }
  h1 {
    margin-bottom: 0;
    padding-bottom: 0;
  }

  @media (max-width: 900px) {
    height: 5vh;
    h1 {
      display: none;
    }
  }
  @media (max-height: 740px) {
    height: 5vh;
    h1 {
      display: none;
    }
  }
`;

const foot = css`
  position: relative;
  bottom: 0;
  height: 5vh;

  background-color: teal;
  width: 100%;
`;

export default function Layout(props) {
  console.log(props.cartNum);
  return (
    <>
      <Head>
        <link rel="icon" href="/icon.ico" />
      </Head>

      <header css={headerStyles}>
        <div className="gridCon">
          <div className="login">
            <Link href="/">
              <a>Login</a>
            </Link>
          </div>
          <Link className="logo_link" href="/">
            <a className="logo">Send Bikes</a>
          </Link>
          <div className="scart">
            <span>
              {props.cartNum}
              {/* {props.cart}
              {props.cart
                ? props.cart.reduce((a, v) => {
                    return a.quantity + v.quantity;
                  })
                : 0} */}
              {/* {Cookies.getJSON('cart').length > 0 || Cookies.getJSON('cart')
                ? Cookies.getJSON('cart').reduce((a, v) => {
                    return a.quantity + v.quantity;
                  })
                : 0} */}
            </span>
            <Image width="40" height="40" src="/scart.png" />
          </div>
        </div>
        <div className="hd">
          <h1>Send bikes, a selection of the best bikes for you to send it!</h1>
        </div>
      </header>

      {props.children}

      <footer css={foot}>
        <span>Send Bikes</span>{' '}
        <Link href="/">
          <a>About</a>
        </Link>{' '}
        <Link href="/">
          <a>About</a>
        </Link>
      </footer>
    </>
  );
}
// export async function getServerSideProps(context) {
//   const getCart = context.req.cookies.cart;
//   const cart = JSON.parse(getCart);
//   console.log(getCart);
//   console.log(cart);

//   // const { getProducts } = await import('../util/database.js');

//   // const products = await getProducts();

//   return {
//     props: { cart: cart },
//   };
// }
