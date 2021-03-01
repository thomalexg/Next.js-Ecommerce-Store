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

export async function updateQuantity(productId, quantity) {
  const product = await sql`
UPDATE products SET quantity = ${quantity} WHERE id = ${productId}
RETURNING *
`;
}
export async function getProductWithSize(productId, size) {
  const product = await sql`
  SELECT * FROM products as p, product_size as s, product_stock as st WHERE p.id = ${productId} AND s.size = ${size} AND s.product_id = ${productId} AND st.size_id = s.id
  `;
  return camelcaseRecords(product)[0];
}

//getting size and stock
export async function getSizeStock(productId) {
  const product = await sql`
SELECT
  p.id as id,
  s.size as size,
  st.stock as stock
FROM
  products as p,
  product_size as s,
  product_stock as st
WHERE
  p.id = s.product_id AND
  s.id = st.size_id AND
  p.id = ${productId}
`;
  return product;
}
// export async function getSizeStock(productId) {
//   const product = await sql`
// SELECT s.size as size, s.stock as stock, p.id as id FROM products as p INNER JOIN product_size as s ON p.id = s.product_id WHERE p.id = ${productId}
// `;
//   return product;
// }
// inserting new orders on checkout to orders table
// export async function addOrder(oderArr) {
//   const product = await sql`
// UPDATE products SET quantity = ${quantity} WHERE id = ${productId}
// RETURNING *
// `;
// }
// export async function deleteProduct(productId, quantity) {
//   const product = await sql`
// UPDATE products SET quantity = ${quantity} WHERE id = ${productId}
// RETURNING *
// `;
// }
