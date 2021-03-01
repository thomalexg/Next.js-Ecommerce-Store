/** @jsxImportSource @emotion/react */ import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout.tsx';
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
  .img {
    margin: 10px 0 !important;
    /* height: 300px;
    width: auto; */
    /* object-fit: cover; */
  }
`;
// function cartNumFun() {
//   if (Cookies.getJSON('cart') !== [] || Cookies.getJSON('cart')) {
//     Cookies.getJSON('cart').reduce((a, v) => {
//       return a.quantity + v.quantity;
//     });
//   } else {
//     return 0;
//   }
// }
// function increaseItemNum(itemNum, size, setItemNum) {
//   if (itemNum[size.id - 1].quantity < size.stock) {
//     setItemNum(
//       itemNum.map((item) => {
//         if (item.size === size.size) {
//           item.itemNum = item.itemNum + 1;
//         }
//         return item;
//       }),
//     );
//   }
// }

type SingleProductProps = {
  product:
    | [
        {
          id: number;
          title: String;
          longDescription: String;
          shortDescription: String;
          imgHead: String;
          imgNum: Number;
          price: number;
        },
      ]
    | [{}];
  cartNum: number;
  sizeStock:
    | [
        {
          id: number;
          size: String;
          stock: number;
          index: number;
          quantity: number;
        },
      ]
    | [{}];
};
function setstateItemNum(sizeStock, cookies) {
  return sizeStock.map((stockObj, index) => {
    console.log('running');
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
  if (props.sizeStock === [{}]) {
    return (
      <Layout cartNum={props.cartNum}>
        <div>Product not found!</div>
      </Layout>
    );
  }

  const [itemNum, setItemNum] = useState([]);
  const [size, setSize] = useState(props.sizeStock[0]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const initalItemNum = Cookies.getJSON('cart')?.some(
      (elem: any) => elem.id === props.sizeStock[0].id,
    )
      ? setstateItemNum(props.sizeStock, Cookies.getJSON('cart'))
      : props.sizeStock.map((size, index) => {
          size.quantity = 0;
          size.index = index;
          return size;
        });
    // console.log(setstateItemNum(props.sizeStock, Cookies.getJSON('cart')));
    // console.log('initial ItemNUm', initalItemNum);
    setItemNum(initalItemNum);
  }, [props.sizeStock]);
  // console.log('sizeStock stock', props.sizeStock[0].stock);
  console.log('sizeStock', props.sizeStock);
  // console.log('ITEM NUM', itemNum);
  // const [itemNum, setItemNum] = useState(
  //   props.sizeStock.map((size, index) => {
  //     size.quantity = 0;
  //     size.index = index;
  //     return size;
  //   }),
  // );

  // console.log('sizeStock of selected product size', size.stock);
  console.log(size);
  // console.log('size', size.size);
  // console.log('itemNum', itemNum);
  // console.log(itemNum[size.index].quantity);

  useEffect(() => {
    if (!Cookies.getJSON('cart')) {
      Cookies.set('cart', []);
    }
    // const cNum =
    //   Cookies.getJSON('cart').length > 0 || Cookies.getJSON('cart')
    //     ? Cookies.getJSON('cart').reduce((a, v) => {
    //         return a.quantity + v.quantity;
    //       }, 0)
    //     : 0;
    // setCartNum(cNum);
  }, []);
  return (
    <Layout cartNum={props.cartNum}>
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
          <form action="/action_page.php">
            <label htmlFor="size">Choose a size:</label>
            <select
              id="size"
              name="size"
              onChange={(e) => {
                // console.log(e.target.value);
                setSize(
                  itemNum.find((sizeObj) => sizeObj.size === e.target.value),
                );
                // setSize(
                //   props.sizeStock.find(
                //     (sizeObj) => sizeObj.size === e.target.value,
                //   ),
                // );
              }}
            >
              {itemNum.index
                ? props.sizeStock.map((e, i) => {
                    // console.log('index of itemNUm', itemNum[e.index].stock);
                    return (
                      <option key={i} value={e.size}>
                        {' '}
                        {`${e.size}, stock: ${e.stock}`}
                      </option>
                    );
                  })
                : props.sizeStock.map((e, i) => {
                    // console.log('index of itemNUm', itemNum[e.index]?.stock);
                    return (
                      <option key={i} value={e.size}>
                        {' '}
                        {`${e.size}, stock: ${e.stock}`}
                      </option>
                    );
                  })}
              {/* <option value="saab">Saab</option>
             <option value="fiat">Fiat</option>
             <option value="audi">Audi</option> */}
            </select>
          </form>
          <button
            onClick={() => {
              if (count > 0) {
                setCount(count - 1);
              }
              // const selectedSize = itemNum.find(
              //   (item) => item.size === size.size,
              // );
              // if (selectedSize.quantity > 0) {
              //   const newItemNum = itemNum.map((item) => {
              //     const itemCopy = { ...item };
              //     if (item.size === size.size) {
              //       itemCopy.quantity = item.quantity - 1;
              //     }

              //     return itemCopy;
              //   });
              //   console.log('NEW Item num', newItemNum);
              //   setItemNum(newItemNum);
              // }
            }}
          >
            -
          </button>
          {/* {itemNum[size.index]?.quantity || 0} */}
          {count}
          <button
            onClick={() => {
              const selectedSize = itemNum.find(
                (item) => item.size === size.size,
              );
              if (count < selectedSize.stock) {
                setCount(count + 1);
              }

              //   if (selectedSize.quantity < selectedSize.stock) {
              //     const newItemNum = itemNum.map((item) => {
              //       const itemCopy = { ...item };
              //       if (item.size === size.size) {
              //         itemCopy.quantity = item.quantity + 1;
              //       }

              //       return itemCopy;
              //     });
              //     console.log('NEW Item num', newItemNum);
              //     setItemNum(newItemNum);
              //   }
            }}
          >
            +
          </button>

          <button
            onClick={() => {
              console.log('sizeObj', size);
              console.log('size', size.size);
              // setItemNum(
              //   addCookies(
              //     props.product.id,
              //     itemNum[size.id - 1].itemNum,
              //     size.size,
              //   ),
              // );
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
              // Cookies.set('productQuan', changeQuantity);
              Cookies.set(
                'cart',
                addCookies(props.product.id, count, size.size),
              );
              props.setCartNum(props.cartNum + count);

              console.log('cookies:', Cookies.getJSON('cart'));
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
          // <img
          //   key={`${props.product.id}-${n}.jpg`}
          //   src={`${props.product.id}-${n}.jpg`}
          //   alt="details"
          // />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // const { getProducts } = await import('../migrations/leydatabase.js');

  const id = Number(context.query.productId);

  // const products = getProducts;
  // const product = products.find((elem) => (elem.id = id));

  const { getProduct } = await import('../util/database.js');
  const product = await getProduct(id);
  const { getSizeStock } = await import('../util/database.js');
  const sizeStock = await getSizeStock(id);
  // console.log(sizeStock);
  // const product = products.find((elem) => elem.id === id);

  return {
    props: { product: product || [{}], sizeStock: sizeStock || [{}] },
  };
}
