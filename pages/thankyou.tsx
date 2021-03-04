import Link from 'next/link';

export default function Thankyou() {
  return (
    <div>
      <h1 data-cy="thankyou">Thanks, your order has just been recieved</h1>
      <Link href="/">
        <a data-cy="back-home"> Back Home! </a>
      </Link>
    </div>
  );
}
