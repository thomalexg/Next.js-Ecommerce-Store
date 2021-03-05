/** @jsxImportSource @emotion/react */ import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent } from 'react';

const headerStyles = css`
  width: 100%;
  position: sticky;
  /* height: 110px; */
  z-index: 10;
  top: 0;
  left: 0;

  .gridCon {
    z-index: 10;
    background-color: rgba(210, 215, 211, 1);
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    z-index: 10;
  }
  .logo {
    justify-self: start;
    font-size: 2rem;
  }
  .logo_link:hover {
    cursor: pointer;
  }
  .scart {
    justify-self: end;
  }
  .spruch {
    text-align: center;
    font-size: 2rem;
  }
  h1 {
    margin-bottom: 0;
    padding-bottom: 0;
  }
  .scartIcon:hover {
    cursor: pointer;
  }
  @media (max-width: 1730px) {
    .gridCon {
      background-color: rgba(210, 215, 211, 1);
      display: grid;
      grid-template-columns: 1fr 1fr;
      z-index: 10;
    }
    .spruch {
      display: none;
    }
  }
  @media (max-width: 900px) {
    .gridCon {
      background-color: rgba(210, 215, 211, 1);
      display: grid;
      grid-template-columns: 1fr 1fr;
      z-index: 10;
    }

    h1 {
      display: none;
    }
  }
`;

const foot = css`
  position: relative;
  bottom: 0;
  height: 5vh;
  background-color: rgba(210, 215, 211, 1);
  text-align: center;
  /* display: grid;
  grid-template-columns: 1fr 1fr; */
  width: 100%;
  a {
    padding: 0 10px;
  }
  .github {
    border-left: 1px solid white;
  }
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
          <div className="logo">
            <Link href="/">
              <a>Send Bikes</a>
            </Link>
          </div>
          <Link href="/">
            <a className="spruch">
              Send bikes, a selection of the best bikes for you to send it!
            </a>
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
        {/* <div className="hd">
          <h1>Send bikes, a selection of the best bikes for you to send it!</h1>
        </div> */}
      </header>

      {children}

      <footer css={foot}>
        <Link href="/about">
          <a className="about">About</a>
        </Link>{' '}
        <Link href="https://github.com/thomalexg">
          <a className="github">GitHub</a>
        </Link>
      </footer>
    </>
  );
};
