import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Send Bikes</title>
      </Head>
      <div className="bikeImg">
        <Image width="500" height="292.5" src="/sd.jpg" />
      </div>
      <div className="bikeImg">
        <Image width="500" height="292.5" src="/se.jpg" />
      </div>
      <div className="bikeImg">
        <Image width="500" height="292.5" src="/sdh.jpg" />
      </div>
      <div className="bikeImg">
        <Image width="500" height="292.5" src="/cee.jpg" />
      </div>
      <div className="bikeImg">
        <Image width="500" height="292.5" src="/se29.jpg" />
      </div>
      <div className="bikeImg">
        <Image width="500" height="292.5" src="/see.jpg" />
      </div>

      <div className="container">Item container</div>
    </Layout>
  );
}
