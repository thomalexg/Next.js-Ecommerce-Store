import Link from 'next/link';
import { Layout } from '../components/Layout';

export default function About(props: any) {
  return (
    <Layout cartNum={props.cartNum}>
      <h1>About</h1>
      <p>
        This is an E-Commerce project I did in the Upleveled Bootcamp in
        February and March 2021.
        <br /> <hr /> The website is created by using Next.js, React,js and
        PostgreSQL. I am using cookies to store the items in the shopping
        cart(product Id and size plus the quantity of items), all the other
        informations come from the database. <br />
        <hr /> All pictures and product descriptions are from the website of{' '}
        <Link href="https://www.santacruzbicycles.com/">
          <a style={{ textDecoration: 'underline' }}>Santa Cruz Bikes</a>
        </Link>
        .
      </p>
    </Layout>
  );
}
