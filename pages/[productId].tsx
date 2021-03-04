/** @jsxImportSource @emotion/react */ import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { addCookies } from '../util/cookies.js';

const style = function (image: string) {
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
  .img {
    margin: 10px 0 !important;
  }
`;

type SizeStock = Array<{
  id: number;
  size: String;
  stock: number;
  index: number;
  quantity: number;
}>;

type CookiesType = { id: number; size: string; quantity: number }[];

type SingleProductProps = {
  product: {
    id: number;
    title: string;
    longDescription: string;
    shortDescription: string;
    imgHead: string;
    imgNum: number;
    price: number;
  };
  cartNum: number;
  setCartNum: number;
  sizeStock: SizeStock;
};
function setstateItemNum(sizeStock: SizeStock, cookies: CookiesType) {
  return sizeStock.map((stockObj, index) => {
    const foundCookie = cookies.find(
      (cookieObj) =>
        cookieObj.id === stockObj.id && cookieObj.size === stockObj.size,
    );

    if (foundCookie) {
      const newQuantity = foundCookie.quantity;
      stockObj.index = index;
      stockObj.stock = stockObj.stock - newQuantity;
      stockObj.quantity
        ? (stockObj.quantity = stockObj.quantity + newQuantity)
        : (stockObj.quantity = newQuantity);
    }
    return stockObj;
  });
}
export default function SingleProduct(props: SingleProductProps) {
  const [itemNum, setItemNum] = useState<SizeStock>([]);
  const [size, setSize] = useState(props.sizeStock[0]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const initalItemNum = Cookies.getJSON('cart')?.some(
      (elem: any) => elem.id === props.sizeStock[0].id,
    )
      ? setstateItemNum(props.sizeStock, Cookies.getJSON('cart'))
      : props.sizeStock.map((s, index) => {
          s.quantity = 0;
          s.index = index;
          return s;
        });

    setItemNum(initalItemNum);
  }, [props.sizeStock]);

  useEffect(() => {
    if (!Cookies.getJSON('cart')) {
      Cookies.set('cart', []);
    }
  }, []);

  if (props.sizeStock === []) {
    return (
      <Layout cartNum={props.cartNum}>
        <div>Product not found!</div>
      </Layout>
    );
  }
  return (
    <Layout cartNum={props.cartNum}>
      <div css={style(props.product.imgHead)} className="container">
        <div className="text" style={{ margin: '0', padding: '0' }}>
          <h1>{props.product.title}</h1>
          {props.product.longDescription.split('|').map((e: any, i: number) => (
            <div key={i}>
              <p style={{ padding: '0', margin: '0' }}>{e}</p>
              <br />
            </div>
          ))}
          <p>Price: € {props.product.price}</p>
          <form action="/action_page.php">
            <label htmlFor="size">Choose a size:</label>
            <select
              id="size"
              name="size"
              onChange={(e) => {
                setSize(
                  itemNum.find((sizeObj) => sizeObj.size === e.target.value),
                );
              }}
            >
              {itemNum.index
                ? props.sizeStock.map((e, i) => {
                    return (
                      <option key={i} value={e.size}>
                        {' '}
                        {`${e.size}, stock: ${e.stock}`}
                      </option>
                    );
                  })
                : props.sizeStock.map((e, i) => {
                    return (
                      <option key={i} value={e.size}>
                        {' '}
                        {`${e.size}, stock: ${e.stock}`}
                      </option>
                    );
                  })}
            </select>
          </form>
          <button
            onClick={() => {
              if (count > 0) {
                setCount(count - 1);
              }
            }}
          >
            -
          </button>
          {count}
          <button
            data-cy="increase-item-number-to-one"
            onClick={() => {
              const selectedSize = itemNum.find(
                (item) => item.size === size.size,
              );
              if (count < selectedSize.stock) {
                setCount(count + 1);
              }
            }}
          >
            +
          </button>

          <button
          data-cy="add-to-cart"
            onClick={() => {
              if (count > 0) {
                const newItemNum = [...itemNum];
                console.log('ItemNum', itemNum);
                console.log('ItemNum Copy', newItemNum);
                newItemNum.map((item) => {
                  if (item.size === size.size) {
                    item.stock = item.stock - count;
                  }
                  return item;
                });
                setItemNum(newItemNum);
                Cookies.set(
                  'cart',
                  addCookies(
                    props.product.id,
                    count,
                    size.size,
                    Cookies.getJSON('cart'),
                  ),
                );
                props.setCartNum(props.cartNum + count);

                console.log('cookies:', Cookies.getJSON('cart'));
              }
            }}
          >
            Add to cart
          </button>
        </div>

        <div className="headImg" />
      </div>
      <div css={imagesdiv}>
        {[...Array(props.product.imgNum + 1).keys()].slice(1).map((n) => (
          <Image
            className="img"
            src={`/${props.product.id}-${n}.jpg`}
            key={`${props.product.id}-${n}.jpg`}
            width={449.89}
            height={300}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = Number(context.query.productId);

  const { getProduct } = await import('../util/database.js');
  const product = await getProduct(id);
  const { getSizeStock } = await import('../util/database.js');
  const sizeStock = await getSizeStock(id);

  return {
    props: { product: product || [{}], sizeStock: sizeStock || [{}] },
  };
}
