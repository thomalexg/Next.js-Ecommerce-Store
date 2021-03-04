/** @jsxImportSource @emotion/react */ import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent } from 'react';

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
  .scartIcon:hover {
    cursor: pointer;
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

type LayoutProps = {
  cartNum: Number;
};

export const Layout: FunctionComponent<LayoutProps> = ({
  children,
  cartNum,
}) => {
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
          <Link href="/">
            <a className="logo">Send Bikes</a>
          </Link>
          <div className="scart">
            <Link href="/cart">
              <a>{cartNum}</a>
            </Link>
            <Link href="/cart">
              <a data-cy="go-to-cart">
                <Image
                  className="scartIcon"
                  width="40"
                  height="40"
                  src="/scart.png"
                />
              </a>
            </Link>
          </div>
        </div>
        <div className="hd">
          <h1>Send bikes, a selection of the best bikes for you to send it!</h1>
        </div>
      </header>

      {children}

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
};
