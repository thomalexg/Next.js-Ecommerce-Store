import Layout from '../components/Layout.js';

export default function SingleProduct(props) {
  return (
    <Layout>
      <div className="container">
        <div className="headImg" />
        <h1>{props.product.title}</h1>
        <p>{props.product.long_description}</p>
        <div>
          {props.product.img_arr.map((img) => {
            <div style={{ backgroundImage: img }} />;
          })}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { getProducts } = await import('../migrations/leydatabase.js');

  const id = context.query.productId;

  const products = getProducts;
  const product = products.find((elem) => (elem.id = id));

  return {
    props: { product: product },
  };
}
