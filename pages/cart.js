/** @jsxImportSource @emotion/react */ import { css } from '@emotion/react';

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
    width: 50px;
    height: 50px;
    background-color: #5161ce;
    border-radius: 4px;
  }
  .img-prdct img {
    width: 100%;
  }
`;

export default function Cart(props) {
  return (
    <div css={style} className="container-fluid mt-5">
      <h1>{props.cartNum}</h1>
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
                </tr>
              </thead>
              <tbody>
                {props.cookies.map((e) => (
                  <tr key={e.id}>
                    <td>
                      <div className="product-img">
                        <div className="img-prdct">
                          <img
                            alt="#"
                            src="https://www.pos-agent.com/app_v2/assets/upload/product/product_892_20180823125535.jpg"
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <p>Product One</p>
                    </td>
                    <td>
                      <div className="button-container">
                        <button
                          className="cart-qty-plus"
                          type="button"
                          value="+"
                        >
                          +
                        </button>
                        <input
                          type="text"
                          name="qty"
                          min={0}
                          className="qty form-control"
                          defaultValue={0}
                        />
                        <button
                          className="cart-qty-minus"
                          type="button"
                          value="-"
                        >
                          -
                        </button>
                      </div>
                    </td>
                    <td>
                      <input
                        type="text"
                        defaultValue={e.price}
                        className="price form-control"
                        disabled
                      />
                    </td>
                    <td align="right">
                      €{' '}
                      <span id="amount" className="amount">
                        {e.quantity * e.price}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={4} />
                  <td align="right">
                    <strong>
                      TOTAL = ${' '}
                      <span id="total" className="total">
                        0
                      </span>
                    </strong>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // const { getBikesByCart } = await import('../util/database.js');
  const getCookies = context.req.cookies.cart;
  // console.log(JSON.parse(getCookies)[0]);
  // const cookies = getCookies.map((e) => JSON.parse(e));
  const cookies = JSON.parse(getCookies);
  console.log(cookies);
  console.log(typeof cookies.price);
  // const idArr = cookies.map((e) => e.id);
  // const getBikes = JSON.parse(getBikesByCart(idArr));

  return {
    props: { cookies: cookies },
  };
}
