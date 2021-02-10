/** @jsxImportSource @emotion/react */ import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const headerStyles = css`
  background-color: grey;
  width: 100%;
  position: fixed;
  height: 110px;
  top: 0;
  left: 0;

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
`;
const container = css`
  margin-top: 78px;
  width: 100%;
  min-height: 1000px;
  background-color: black;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  .bikeImg {
    z-index: 1000;
    margin-top: 100px;
  }
`;
const foot = css`
  position: fixed;
  bottom: 0;
  height: 20px;
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
