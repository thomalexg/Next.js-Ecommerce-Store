/** @jsxImportSource @emotion/react */ import { css } from '@emotion/react';
import Layout from '../components/Layout.js';

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
  return (
    <Layout>
      <div css={style(props.product.img_head)} className="container">
        <div className="text" style={{ margin: '0', padding: '0' }}>
          <h1>{props.product.title}</h1>
          {props.product.long_description.split('|').map((e, i) => (
            <div key={i}>
              <p style={{ padding: '0', margin: '0' }}>{e}</p>
              <br />
            </div>
          ))}
          <button>+</button>1<button>-</button>
          <button>Add to cart</button>
        </div>
        <div className="headImg" />
      </div>
      <div css={imagesdiv}>
        {props.images.map((img, i) => (
          <img src={img} key={i} alt="some nice bike" />
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

  const { getProducts } = await import('../util/database.js');
  const products = getProducts();
  const product = products.find((elem) => elem.id === id);
  // const product = () => {
  //   getProducts.forEach((element) => {
  //     if (element.id === id) {
  //       return element;
  //     }
  //   });
  // };

  const { getImages1 } = await import('../util/databaseImage1');
  const allImages = getImages1();
  const images = allImages[id - 1];
  return {
    props: { product: product, images: images },
  };
}
