/** @jsxImportSource @emotion/react */ import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';
import {
  addQuantity,
  changeQuantity,
  deleteProduct,
  subQuantity,
} from '../util/cookies.js';

const style = css`
  body {
    font-family: 'Roboto', sans-serif;
  }
  * {
    margin: 0;
    padding: 0;
  }
  i {
    margin-right: 10px;
  }

  /*------------------------*/
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
`;

function bikeById(bikes, idFromArr) {
  const bike = bikes.find((e) => e.id === idFromArr);
}

export default function Cart(props) {
  // const [quantity, setQuantity] = useState(props.cookies ? props.cookies : []);
  const [quantity, setQuantity] = useState(props.cookies);
  // const [clicked, setClicked] = useState(false);

  // useEffect(() => {
  //   if (clicked) {
  //     setQuantity(props.cookies);
  //     setClicked(false);
  //   }
  // }, [clicked, setClicked, props.cookies]);
  if (quantity.length === 0 || !quantity) {
    return (
      <Layout
        cartNum={
          quantity.reduce((a, v) => {
            const newCount = a.quantity + v.quantity;
            return { quantity: newCount };
          }).quantity
        }
      >
        <div>
          <div>No items in shopping cart!</div>
          <Link href="/">Back to shop</Link>
        </div>
      </Layout>
    );
  }
  return (
    <Layout
      cartNum={quantity.reduce((a, v) => {
        return a.quantity + v.quantity;
      })}
    >
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
                        <div className="button-container">
                          <button
                            className="cart-qty-plus"
                            type="button"
                            value="+"
                            onClick={() => {
                              // console.log(
                              //   addCookies(props.bikes[i].id, e.quantity),
                              // );
                              const newQuantity = addQuantity(
                                props.bikes[i].id,
                                e.quantity,
                              );
                              Cookies.set('cart', newQuantity);
                              setQuantity(newQuantity);
                            }}
                          >
                            +
                          </button>
                          <input
                            type="text"
                            name="qty"
                            min={0}
                            className="qty form-control"
                            defaultValue={quantity[i].quantity}
                            onChange={(event) => {
                              const newQuantity = changeQuantity(
                                props.bikes[i].id,
                                Number(event.target.value),
                              );
                              Cookies.set('cart', newQuantity);
                              setQuantity(newQuantity);
                            }}
                          />
                          <button
                            className="cart-qty-minus"
                            type="button"
                            value="-"
                            onClick={() => {
                              if (quantity[i].quantity > 1) {
                                const newQuantity = subQuantity(
                                  props.bikes[i].id,
                                  e.quantity,
                                );
                                Cookies.set('cart', newQuantity);
                                setQuantity(newQuantity);
                              } else {
                                const newQuantity = deleteProduct(i);
                                Cookies.set('cart', newQuantity);
                                setQuantity(newQuantity);
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
                          onClick={() => {
                            const newQuantity = deleteProduct(i);
                            console.log(newQuantity);
                            Cookies.set('cart', newQuantity);
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
                          {quantity
                            .map((e, i) => {
                              return e.quantity * props.bikes[i].price;
                            })
                            .reduce((a, v) => {
                              return a + v;
                            })}
                        </span>
                      </strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
        <Link href="/checkout">checkout => </Link>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { getProduct } = await import('../util/database.js');
  const getCookies = context.req.cookies.cart;
  // console.log(JSON.parse(getCookies)[0]);
  // const cookies = getCookies.map((e) => JSON.parse(e));
  const cookies = JSON.parse(getCookies);
  console.log(cookies);
  console.log(typeof cookies.quantity);
  const idArr = cookies.map((e) => e.id);
  console.log(idArr);
  // const getBikes = await idArr.map(async (e) => await getBikesByCart(e));
  // console.log(getBikes);
  const getBikes = idArr.map((id) => getProduct(id));
  const bikes = await Promise.all(getBikes);
  console.log(cookies);

  return {
    props: { cookies: cookies, bikes: bikes },
  };
}
