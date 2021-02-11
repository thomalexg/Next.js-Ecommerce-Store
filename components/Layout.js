/** @jsxImportSource @emotion/react */ import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const headerStyles = css`
  background-color: grey;
  width: 100%;
  position: sticky;
  /* height: 110px; */
  min-height: 50px;
  height: 15vh;
  top: 0;
  left: 0;
  z-index: 1000;
  .gridCon {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .logo {
    justify-self: center;
  }
  .scart {
    justify-self: end;
  }
  .hd {
    text-align: center;
  }
  h1 {
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;
const container = css`
  width: 100%;
  /* height: 80vh; */
  background-color: black;
  margin: auto;
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-column-gap: 100px;
  grid-row-gap: 100px;
  grid-template-rows: auto;
  margin: 0;
  padding: 50px 100px 10px;
  .bikeImg {
    justify-self: center;
    /* margin-top: 50px; */
  }
  @media (max-width: 400px) {
    padding: 50px 0;
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
  return (
    <>
      <Head>
        <link rel="icon" href="/icon.ico" />
      </Head>

      <header css={headerStyles}>
        <div className="gridCon">
          <div className="login">
            <Link href="#">
              <a>Login</a>
            </Link>
          </div>
          <div className="logo">Send Bikes</div>
          <div className="scart">
            <Image width="40" height="40" src="/scart.png" />
          </div>
        </div>
        <div className="hd">
          <h1>Send bikes, a selection of the best bikes for you to send it!</h1>
        </div>
      </header>
      <div className="container" css={container}>
        {props.children}
      </div>

      <footer css={foot}>
        <span>Send Bikes</span>{' '}
        <Link href="#">
          <a>About</a>
        </Link>{' '}
        <Link href="#">
          <a>About</a>
        </Link>
      </footer>
    </>
  );
}
