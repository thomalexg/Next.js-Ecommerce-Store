/** @jsxImportSource @emotion/react */ import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';

const bikeImg = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('/sd.jpg');
  background-size: cover;
  width: 500px;
  height: auto;
  background-position: center;
`;

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
        button {
          background-color: rgba(236, 240, 241, 0.5);
          width: 30%;
          height: 15%;
          border-radius: 20px;
          border: none;
          outline: none;
        }
        button:hover {
          background-color: rgba(103, 128, 159, 0.9);
          cursor: pointer;
        }
      }
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
export default function Home(props) {
  return (
    <Layout>
      <Head>
        <title>Send Bikes</title>
      </Head>
      {props.products.map((product) => (
        <div
          key={product.id}
          className="bikeImg"
          css={newBike(product.img_head)}
        >
          <div className="content">
            <h1>{product.title}</h1>
            <p>{product.short_description}</p>
            <Link href={`/${product.id}`}>
              <button>Show me more</button>
            </Link>
          </div>
        </div>
      ))}

      {/* <div className="bikeImg" css={newBike('/sd.jpg')}>
        <div className="content">
          <h1>The Dirt Jump Bike!</h1>
          <p>You love the streets and dirt jumps?</p>
          <button>Show me more</button>
        </div>
      </div>
      <div className="bikeImg" css={newBike('/se.jpg')}>
        <div className="content">
          <h1>The Enduro Bike!</h1>
          <p>Tour with the family or bikepark session? Both!</p>
          <button>Show me more</button>
        </div>
      </div>
      <div className="bikeImg" css={newBike('/sdh.jpg')}>
        <div className="content">
          <h1>The Downhill Bike!</h1>
          <p>Are you ready for the bikepark? This bike sure is!</p>
          <button>Show me more</button>
        </div>
      </div>
      <div className="bikeImg" css={newBike('/cee.jpg')}>
        <div className="content">
          <h1>The E-Enduro!</h1>
          <p>No lift on your local trails? This bike is your lift!</p>
          <button>Show me more</button>
        </div>
      </div>
      <div className="bikeImg" css={newBike('/se29.jpg')}>
        <div className="content">
          <h1>The Enduro Bike!</h1>
          <p>Tour with the family or bikepark session? Both!</p>
          <button>Show me more</button>
        </div>
      </div>
      <div className="bikeImg" css={newBike('/see.jpg')}>
        <div className="content">
          <h1>The E-Enduro!</h1>
          <p>No lift on your local trails? This bike is your lift!</p>
          <button>Show me more</button>
        </div>
      </div> */}
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

  const products = getProducts();
  return {
    props: {
      products: products,
    },
  };
}
