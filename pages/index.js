/** @jsxImportSource @emotion/react */ import { css } from '@emotion/react';
import Head from 'next/head';
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
    width: 500px;
    height: 292.5px;

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
          color:white;
          display: block;
          padding-bottom: 2.5em;
          font-weight: 10em;
        }
        h1 {
          font-weight: 0.1em;
          padding-bottom: 1em;
          padding-top: 0.5em
        }
        button {
          background-color: rgba(236, 240, 241, 0.5);
          width: 30%;
          height: 15%;
          border-radius: 20px;
          border: none;
        }
        button:hover {
          background-color: rgba(103, 128, 159, 0.9);
          cursor: pointer;
        }
        }
      }
    }

    @media (max-width: 620px) {
      width: 250px;
      height: 146.25px;
    } ;
  `;
};
export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Send Bikes</title>
      </Head>
      <div className="bikeImg" css={newBike('/sd.jpg')}>
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
      </div>
      {/* <div className="bikeImg" style={{ position: relative }}>
        <Image width="500" height="296" src="/se.jpg" />
      </div>
      <div className="bikeImg" style={{ position: relative }}>
        <Image width="500" height="296" src="/sdh.jpg" />
      </div>
      <div className="bikeImg" style={{ position: relative }}>
        <Image width="500" height="296" src="/cee.jpg" />
      </div>
      <div className="bikeImg" style={{ position: relative }}>
        <Image width="500" height="296" src="/se29.jpg" />
      </div>
      <div className="bikeImg" style={{ position: relative }}>
        <Image width="500" height="296" src="/see.jpg" />
      </div> */}
    </Layout>
  );
}
