/** @jsxImportSource @emotion/react */ import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';

// const bikeImg = css`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-image: url('/sd.jpg');
//   background-size: cover;
//   width: 500px;
//   height: auto;
//   background-position: center;
// `;

const newBike = function (image) {
  return css`
    display: flex;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    background-image: url(${image});
    background-size: cover;
    /* width: 500px;
    height: 292.5px; */
    width: 666.67px;
    height: 390px;
    box-shadow: 10px 5px 5px black;
    background-position: center;
    .content {
      transition: 3s all ease-in;
      display: none;
    }
    :hover {
      .content {
        transition: 3s all ease-in;
        display: block;
        color: white;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        background-color: rgba(232, 232, 232, 0.2);
        border-radius: 10px;
        text-align: center;
        justify-content: center;
        p {
          color: white;
          display: block;
          padding-bottom: 2.5em;
          font-weight: 10em;
        }
        h1 {
          font-weight: 0.1em;
          padding-bottom: 1em;
          padding-top: 0.5em;
        }
      }
    }
    a {
      background-color: rgba(236, 240, 241, 0.5);
      width: 30%;
      height: 60px;
      line-height: 55px;
      border-radius: 20px;
      display: inline-block;
      vertical-align: middle;
    }
    a:hover {
      background-color: rgba(103, 128, 159, 0.9);
    }
    @media (max-width: 760px) {
      width: 500px;
      height: 292.5px;
    }
    @media (max-width: 630px) {
      width: 375px;
      height: 219.375px;
    }
    @media (max-width: 450px) {
      width: 250px;
      height: 146.25px;
    }
  `;
};
const container = css`
  width: 100%;
  /* height: 80vh; */
  background-color: transparent;
  margin: 0;
  display: grid;
  z-index: 9;
  grid-template-columns: repeat(2, minmax(250px, 1fr));
  grid-column-gap: 50px;
  grid-row-gap: 40px;
  grid-template-rows: auto;
  margin: 0;
  padding: 50px 100px 50px;
  .bikeImg {
    justify-self: center;
    /* margin-top: 50px; */
  }
  @media (max-width: 1800px) {
    padding: 50px 0;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 1507px) {
    padding: 50px 0;
    grid-template-columns: repeat(1, 1fr);
  }
`;

// function cartNum() {
//   if (Cookies.getJSON('cart')) {
//     Cookies.getJSON('cart').reduce((a, v) => {
//       return a.quantity + v.quantity;
//     });
//   } else {
//     return 0;
//   }
// }
export default function Home(props) {
  const [cartNum, setCartNum] = useState(
    Cookies.getJSON('cart') || Cookies.getJSON('cart') !== []
      ? Cookies.getJSON('cart').reduce((a, v) => {
          return a.quantity + v.quantity;
        })
      : 0,
  );

  return (
    <Layout cartNum={cartNum}>
      <Head>
        <title>Send Bikes</title>
      </Head>
      <div className="container" css={container}>
        {props.products.map((product) => (
          <div
            key={product.id}
            className="bikeImg"
            css={newBike(product.imgHead)}
          >
            <div className="content">
              <h1>{product.title}</h1>
              <p>{product.shortDescription}</p>
              <Link href={`/${product.id}`}>
                <a>Show me more</a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  // ✅ Anything that we run in this function will get
  // run ONLY on the server.
  //
  // This allows us to run server-side code such as
  // connecting to a database, etc.

  // This static import...
  // import { getTeamMembers } from '../../database';
  // ...can also be written as a dynamic import, like this:
  const { getProducts } = await import('../util/database.js');

  const products = await getProducts();
  return {
    props: {
      products: products,
    },
  };
}
