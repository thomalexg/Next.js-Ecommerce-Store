/** @jsxImportSource @emotion/react */ import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
// @import url('https://fonts.googleapis.com/css?family=Arimo');
const style = css`
  $coral: rgba(242, 241, 239, 1);
  $maroon: #8e2807;
  $title: #493b76;

  body {
    display: flex;
    justify-content: center;
  }

  .wrapper {
    margin-top: 5%;
    width: 60%;
    display: flex;
    justify-content: center;
    font-family: 'Arimo';
    background-color: rgba(242, 241, 239, 1);
    -webkit-box-shadow: 9px 13px 25px 0px rgba(0, 0, 0, 0.18);
    -moz-box-shadow: 9px 13px 25px 0px rgba(0, 0, 0, 0.18);
    box-shadow: 9px 13px 25px 0px rgba(0, 0, 0, 0.18);
    animation: slideUp 2000ms ease;
  }

  @keyframes slideUp {
    0% {
      -webkit-transform: translateY(100%);
      transform: translateY(100%);
      visibility: visible;
    }

    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
  }

  .container {
    width: 65%;
    padding: 5% 10%;
  }

  h1 {
    align-self: center;
  }

  form {
    width: 100%;

    > * {
      margin-top: 20px;
    }

    input {
      width: 100%;
      min-height: 25px;
      border: 0;
      font-size: 1rem;
      letter-spacing: 0.15rem;
      font-family: 'Arimo';
      margin-top: 5px;
      color: $maroon;
      border-radius: 4px;
    }

    label {
      text-transform: uppercase;
      font-size: 12px;
      letter-spacing: 2px;
      color: $maroon;
    }

    h1 {
      font-size: 24px;
      line-height: 10px;
      color: $title;
      letter-spacing: 1px;
    }

    h1:nth-of-type(2) {
      margin-top: 10%;
    }
  }

  .name {
    justify-content: space-between;
    display: flex;
    width: 100%;

    div {
      width: 45%;
    }
  }

  .address-info {
    display: flex;
    justify-content: space-between;

    div {
      width: 30%;
    }
  }

  .cc-info {
    display: flex;
    justify-content: space-between;

    div {
      width: 45%;
    }
  }

  .btns {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    button {
      margin: 3px 0;
      height: 30px;
      color: black;
      background-color: gold;
      text-transform: uppercase;
      border: 0;
      border-radius: 0.3rem;
      letter-spacing: 2px;

      &:hover {
        animation-name: btn-hov;
        animation-duration: 550ms;
        animation-fill-mode: forwards;
      }
    }
  }

  @keyframes btn-hov {
    100% {
      background-color: #c5c219;
      color: #fff;
      transform: scale(1.05);
    }
  }

  input:focus,
  button:focus {
    outline: none;
  }

  @media (max-width: 736px) {
    .wrapper {
      width: 100%;
    }

    .container {
      width: 100%;
    }

    .btns {
      align-items: center;

      button {
        /* width: 50%; */
      }
    }

    form h1 {
      text-align: center;
    }

    .name,
    .address-info,
    .cc-info {
      flex-direction: column;
      width: 100%;
      justify-content: space-between;

      div {
        align-items: center;
        flex-direction: column;
        width: 100%;
        display: flex;
      }
    }

    .street,
    .cc-num {
      text-align: center;
    }

    input {
      margin: 5px 0;
      min-height: 30px;
    }
  }
`;
type CheckoutProps = {
  cookies:
    | [
        {
          id: number;
          quantity: number;
          size: string;
          index: number;
        },
      ]
    | null;
  sum: number;
};

type PricesType = {
  price: number;
}[];

export default function Checkout(props: CheckoutProps) {
  const router = useRouter();
  if (props.cookies === null) {
    return (
      <div>
        <div>Nada en la shopping carta!</div>
        <Link href="/"> Back Home!</Link>
      </div>
    );
  }
  return (
    <div>
      <div css={style} className="wrapper">
        <div className="container">
          <form
            onSubmit={(e: any) => {
              e.preventDefault();
              Cookies.set('cart', []);
              router.push('/thankyou');
            }}
          >
            <h1>
              <i className="fas fa-shipping-fast" />
              Shipping Details
            </h1>
            <div className="name">
              <div>
                <label htmlFor="f-name">First</label>
                <input data-cy="f-name" type="text" name="f-name" required />
              </div>
              <div>
                <label htmlFor="l-name">Last</label>
                <input data-cy="l-name" type="text" name="l-name" required />
              </div>
            </div>
            <div className="street">
              <label htmlFor="name">Street</label>
              <input data-cy="street" type="text" name="address" required />
            </div>
            <div className="address-info">
              <div>
                <label htmlFor="city">City</label>
                <input data-cy="city" type="text" name="city" required />
              </div>
              <div>
                <label htmlFor="state">State</label>
                <input data-cy="state" type="text" name="state" required />
              </div>
              <div>
                <label htmlFor="zip">Zip</label>
                <input data-cy="zip" type="text" name="zip" required />
              </div>
            </div>
            <h1>
              <i className="far fa-credit-card" /> Payment Information
            </h1>
            <div className="cc-num">
              <label htmlFor="card-num">Credit Card No.</label>
              <input data-cy="card-num" type="text" name="card-num" required />
            </div>
            <div className="cc-info">
              <div>
                <label htmlFor="card-num">Exp</label>
                <input data-cy="expire" type="text" name="expire" required />
              </div>
              <div>
                <label htmlFor="card-num">CCV</label>
                <input
                  data-cy="security-num"
                  type="text"
                  name="security"
                  required
                />
              </div>
            </div>
            <div className="btns">
              <button data-cy="purchase">
                Purchase (Total sum: {props.sum} €)
              </button>
              <Link href="/cart">Back to cart</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getPrices } = await import('../util/database.js');

  const getCookies = context.req.cookies.cart;

  const cookies = getCookies ? JSON.parse(getCookies) : [];
  const idArr = cookies.map((e: any) => {
    return { id: e.id, size: e.size };
  });
  console.log(idArr);
  const fetchPrices = idArr.map((e: any) => getPrices(e.id, e.size));
  const prices: PricesType = await Promise.all(fetchPrices);
  console.log('prices', prices);
  const sum = prices
    .map((elem, index) => {
      return { price: elem.price, quantity: cookies[index].quantity };
    })
    .map((elem) => elem.price * elem.quantity)
    .reduce((a, b) => a + b);
  console.log('sum', sum);

  return {
    props: { cookies: cookies || null, sum: sum },
  };
}
