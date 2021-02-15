import { css } from '@emotion/react';
import Layout from '../components/Layout.js';

const style = function (image) {
  return css`
    .headImg {
      background-image: url() (${image});
    }
  `;
};

export default function SingleProduct(props) {
  return (
    <Layout>
      <div css={style(props.product.img_head)} className="container">
        <div className="headImg" />
        <h1>{props.product.title}</h1>
        <p>{props.product.long_description}</p>
        <div>
          {/* {props.product.img_arr.map((img) => {
            <div style={{ backgroundImage: img }} />;
          })} */}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // const { getProducts } = await import('../migrations/leydatabase.js');

  const id = parseInt(context.query.productId);

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
  console.log(context.query.productId);
  console.log(product);
  console.log(id);
  return {
    props: { product: product },
  };
}
