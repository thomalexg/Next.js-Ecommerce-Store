import Link from 'next/link';

export default function Thankyou() {
  return (
    <div>
      <h1>Thanks, your order has just been recieved</h1>
      <Link href="/">Back Home! </Link>
    </div>
  );
}
