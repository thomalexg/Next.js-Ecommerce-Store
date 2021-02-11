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
    justify-content: center;
    align-items: center;
    background-image: url(${image});
    background-size: cover;
    width: 500px;
    height: 292.5px;

    background-position: center;

    @media (max-width: 400px) {
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
        Test Text
      </div>
      <div className="bikeImg" css={newBike('/se.jpg')}>
        Test Text
      </div>
      <div className="bikeImg" css={newBike('/sdh.jpg')}>
        Test Text
      </div>
      <div className="bikeImg" css={newBike('/cee.jpg')}>
        Test Text
      </div>
      <div className="bikeImg" css={newBike('/se29.jpg')}>
        Test Text
      </div>
      <div className="bikeImg" css={newBike('/see.jpg')}>
        Test Text
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

      <div className="container">Item container</div>
    </Layout>
  );
}
