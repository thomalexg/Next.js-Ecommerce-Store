/** @jsxImportSource @emotion/react */ import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout.js';
import { addCookies } from '../util/cookies.js';

const style = function (image) {
  return css`
    display: grid;
    width: 90%;
    grid-template-columns: repeat(2, minmax(250px, 1fr));
    grid-column-gap: 10px;
    grid-row-gap: 40px;
    grid-template-rows: auto;
    margin: 0 auto;
    padding: 10px 40px;
    .headImg {
      /* height: 390px;
      width: 667.667px; */
      width: 100%;
      padding-top: 58%;
      background-image: url(${image});
      background-size: cover;
      justify-self: center;
    }
    .text {
      text-align: center;
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
};
const imagesdiv = css`
  width: 75%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  img {
    margin: 10px 0;
    height: 300px;
    width: auto;
    /* object-fit: cover; */
  }
`;

export default function SingleProduct(props) {
  const [itemNum, setItemNum] = useState(1);
  const [cartNum, setCartNum] = useState(
    Cookies.getJSON('cart') || Cookies.getJSON('cart') !== []
      ? Cookies.getJSON('cart').reduce((a, v) => {
          return a.quantity + v.quantity;
        })
      : 0,
  );
  if (!props.product) {
    return (
      <Layout>
        <div>Not found</div>
      </Layout>
    );
  }
  useEffect(() => {
    if (!Cookies.getJSON('cart')) {
      Cookies.set('cart', []);
    }
  }, []);
  return (
    <Layout cartNum={cartNum}>
      <div css={style(props.product.imgHead)} className="container">
        <div className="text" style={{ margin: '0', padding: '0' }}>
          <h1>{props.product.title}</h1>
          {props.product.longDescription.split('|').map((e, i) => (
            <div key={i}>
              <p style={{ padding: '0', margin: '0' }}>{e}</p>
              <br />
            </div>
          ))}
          <p>Price: € {props.product.price}</p>

          <button onClick={() => (itemNum > 0 ? setItemNum(itemNum - 1) : '')}>
            -
          </button>
          {itemNum}
          <button
            onClick={() => {
              setItemNum(itemNum + 1);
            }}
          >
            +
          </button>

          <button
            onClick={() => {
              Cookies.set(
                'cart',
                addCookies(props.product.id, itemNum, props.product.price),
              );
              setCartNum(cartNum + itemNum);
              console.log(Cookies.getJSON('cart'));
            }}
          >
            Add to cart
          </button>
        </div>

        <div className="headImg" />
      </div>
      <div css={imagesdiv}>
        {[...Array(props.product.imgNum + 1).keys()].slice(1).map((n) => (
          <img
            key={`${props.product.id}-${n}.jpg`}
            src={`${props.product.id}-${n}.jpg`}
            alt="details"
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // const { getProducts } = await import('../migrations/leydatabase.js');

  const id = Number(context.query.productId);

  // const products = getProducts;
  // const product = products.find((elem) => (elem.id = id));

  const { getProduct } = await import('../util/database.js');
  const product = await getProduct(id);

  // const product = products.find((elem) => elem.id === id);

  return {
    props: { product: product || null },
  };
}
