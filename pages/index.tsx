/** @jsxImportSource @emotion/react */ import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { Layout } from '../components/Layout';

const newBike = function (image: string) {
  return css`
    display: flex;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    background-image: url(${image});
    background-size: cover;
    width: 666.67px;
    height: 390px;
    box-shadow: 10px 5px 5px black;
    background-position: center;
    .content {
      transition: 3s all ease-in;
      display: none;
      // delete this
      transition: 3s all ease-in;
      display: block;
      color: black;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      background-color: rgba(232, 232, 232, 0.2);
      border-radius: 10px;
      text-align: center;
      justify-content: center;
      p {
        color: khaki;
        display: block;

        font-weight: 90%;
        margin: 16px 0 51px;
      }
      h1 {
        font-size: 2em;

        padding-top: 40px;
        padding-bottom: 35px;
      }
    }
    /* :hover {
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
          padding-bottom: 25px;
          font-weight: 90%;
        }
        h1 {
          font-weight: 90%;
          padding-bottom: 1em;
          padding-top: 0.5em;
        }
      }
    } */
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

type IndexProps = {
  cartNum: number;
  products: [
    {
      id: number;
      title: string;
      shortDescription: string;
      longDescription: string;
      imgHead: string;
      imgNum: number;
      price: number;
    },
  ];
};
export default function Home(props: IndexProps) {
  return (
    <Layout cartNum={props.cartNum}>
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
              <div />
              <div>
                <p>{product.shortDescription}</p>
              </div>
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
  const { getProducts } = await import('../util/database.js');

  const products = await getProducts();

  return {
    props: {
      products: products,
    },
  };
}
