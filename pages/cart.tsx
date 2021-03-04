/** @jsxImportSource @emotion/react */ import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Layout } from '../components/Layout';
import {
  addQuantity,
  changeQuantity,
  deleteProduct,
  subQuantity,
} from '../util/cookies.js';
import sum from '../util/sumFunction';

const style = css`
  body {
    font-family: 'Roboto', sans-serif;
    margin-bottom: 20px;
    margin: 0 auto 20px;
  }
  * {
    margin: 0;
    padding: 0;
  }
  i {
    margin-right: 10px;
  }

  input:focus,
  button:focus,
  .form-control:focus {
    outline: none;
    box-shadow: none;
  }
  .form-control:disabled,
  .form-control[readonly] {
    background-color: #fff;
  }
  .table tr,
  .table tr td {
    vertical-align: middle;
  }
  .button-container {
    display: flex;
    align-items: center;
  }
  .button-container .form-control {
    max-width: 80px;
    text-align: center;
    display: inline-block;
    margin: 0px 5px;
  }
  #myTable .form-control {
    width: auto;
    display: inline-block;
  }
  .cart-qty-plus,
  .cart-qty-minus {
    width: 38px;
    height: 38px;
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
  }
  .cart-qty-plus:hover,
  .cart-qty-minus:hover {
    background-color: #5161ce;
    color: #fff;
  }
  .img-prdct {
    width: 75px;
    height: 50px;
    background-color: #5161ce;
    border-radius: 4px;
  }
  .img-prdct img {
    width: 100%;
  }
  .checkout {
    background-color: gold;
    padding: 5px 10px;
    vertical-align: center;
    margin: 200px;
    border-radius: 25px;
  }
`;

type CartProps = {
  cartNum: number;
  cookies:
    | [
        {
          id: number;
          quantity: number;
          size: string;
          index: number;
        },
      ]
    | [];
  bikes: [
    {
      title: string;
      productId: number;
      id: number;
      size: string;
      imgHead: string;
      stock: number;
      price: number;
    },
  ];
  setCartNum: any;
};

export default function Cart(props: CartProps) {
  const [quantity, setQuantity] = useState(props.cookies);

  if (quantity.length === 0) {
    return (
      <Layout cartNum={props.cartNum}>
        <div>
          <div data-cy="empty-cart">No items in shopping cart!</div>
          <Link href="/">
            <a data-cy="back-to-shop">Back to shop</a>
          </Link>
        </div>
      </Layout>
    );
  }
  return (
    <Layout cartNum={props.cartNum}>
      <div css={style} className="container-fluid mt-5">
        <h2 className="mb-5 text-center">Shopping Cart</h2>

        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="table-responsive">
              <table id="myTable" className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th className="text-right">
                      <span id="amount" className="amount">
                        Amount
                      </span>{' '}
                    </th>
                    <th>Delete Item</th>
                  </tr>
                </thead>
                <tbody>
                  {quantity.map((e, i) => (
                    <tr key={e.id}>
                      <td>
                        <div className="product-img">
                          <div className="img-prdct">
                            <Image
                              width={75}
                              height={50}
                              alt="#"
                              src={`${props.bikes[i].imgHead}`}
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <p>{props.bikes[i].title}</p>
                      </td>
                      <td>
                        <p>{props.bikes[i].size}</p>
                      </td>
                      <td>
                        <div className="button-container">
                          <button
                            data-cy="increase-item"
                            className="cart-qty-plus"
                            type="button"
                            value="+"
                            onClick={() => {
                              if (props.bikes[i].stock > e.quantity) {
                                const newQuantity = addQuantity(
                                  props.bikes[i].productId,
                                  props.bikes[i].size,
                                );
                                console.log(newQuantity);
                                Cookies.set('cart', newQuantity);
                                setQuantity(newQuantity);
                                props.setCartNum(props.cartNum + 1);
                              }
                            }}
                          >
                            +
                          </button>
                          <input
                            type="text"
                            name="qty"
                            min={0}
                            className="qty form-control"
                            defaultValue={e.quantity}
                            value={e.quantity}
                            onChange={(event) => {
                              if (
                                Number(event.target.value) <
                                props.bikes[i].stock
                              ) {
                                const newQuantity = changeQuantity(
                                  props.bikes[i].productId,
                                  Number(event.target.value),
                                  e.size,
                                  Cookies.getJSON('cart'),
                                );
                                Cookies.set('cart', newQuantity);
                                setQuantity(newQuantity);
                                props.setCartNum(
                                  props.cartNum -
                                    Number(e.quantity) +
                                    Number(event.target.value),
                                );
                              }
                            }}
                          />
                          <button
                            data-cy="decrease-item"
                            className="cart-qty-minus"
                            type="button"
                            value="-"
                            onClick={() => {
                              if (quantity[i].quantity > 1) {
                                const newQuantity = subQuantity(
                                  props.bikes[i].productId,
                                  props.bikes[i].size,
                                );
                                Cookies.set('cart', newQuantity);
                                setQuantity(newQuantity);
                                props.setCartNum(props.cartNum - 1);
                              } else {
                                const newQuantity = deleteProduct(
                                  i,
                                  Cookies.getJSON('cart'),
                                );
                                Cookies.set('cart', newQuantity);
                                setQuantity(newQuantity);
                                props.setCartNum(props.cartNum - 1);
                              }
                            }}
                          >
                            -
                          </button>
                        </div>
                      </td>
                      <td>
                        <input
                          type="text"
                          defaultValue={props.bikes[i].price}
                          className="price form-control"
                          disabled
                        />
                      </td>
                      <td align="right">
                        €{' '}
                        <span id="amount" className="amount">
                          {e.quantity * props.bikes[i].price}
                        </span>
                      </td>
                      <td>
                        <button
                          data-cy="delete-item"
                          onClick={() => {
                            const newQuantity = deleteProduct(
                              i,
                              Cookies.getJSON('cart'),
                            );
                            console.log(newQuantity);
                            Cookies.set('cart', newQuantity);
                            props.setCartNum(
                              props.cartNum - Number(e.quantity),
                            );
                            setQuantity(newQuantity);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={4} />
                    <td align="right">
                      <strong>
                        TOTAL = €{' '}
                        <span id="total" className="total">
                          {sum(quantity, props.bikes)}
                        </span>
                      </strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
        <Link href="/checkout">
          <a className="checkout" data-cy="go-to-checkout">
            go to checkout!
          </a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getProductWithSize } = await import('../util/database.js');
  const getCookies = context.req.cookies.cart;

  const cookies = getCookies ? JSON.parse(getCookies) : [];
  const idArr = cookies.map((e: any) => {
    return { id: e.id, size: e.size };
  });

  const getBikes = idArr.map((elem: any) =>
    getProductWithSize(elem.id, elem.size),
  );
  const bikes = await Promise.all(getBikes);

  return {
    props: { cookies: cookies, bikes: bikes },
  };
}
