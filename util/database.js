import camelcaseKeys from 'camelcase-keys';
import postgres from 'postgres';

// Read in the values from the .env file
// (which should be ignored in Git!)
require('dotenv-safe').config();

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production') {
    sql = postgres({ ssl: true });
  } else {
    if (!globalThis.__postgresSqlClient) {
      globalThis.__postgresSqlClient = postgres();
    }
    sql = globalThis.__postgresSqlClient;
  }
  return sql;
}

// Connect to PostgreSQL
const sql = connectOneTimeToDatabase();

function camelcaseRecords(records) {
  return records.map((record) => camelcaseKeys(record));
}
export async function getProducts() {
  const products = await sql`
  SELECT * FROM products
  `;
  return camelcaseRecords(products);
}

export async function getProduct(productId) {
  const product = await sql`
  SELECT * FROM products WHERE id = ${productId}
  `;
  return camelcaseRecords(product)[0];
}
