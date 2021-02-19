exports.up = async (sql) => {
  await sql`
	CREATE TABLE IF NOT EXISTS products (
		id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		product_id INT,
	title VARCHAR(150) NOT NULL,
	short_description VARCHAR(300) NOT NULL,
	long_description TEXT,
	img_head TEXT,
	img_num INT NOT NULL,
	price INT
);
`;

  await sql`
  	CREATE TABLE IF NOT EXISTS product_size (
  		id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  	product_id integer references products(id),
  	size VARCHAR(10) NOT NULL
  );
  `;

  await sql`
  CREATE TABLE product_stock (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  	size_id integer references product_size(id),
  	stock INTEGER
  );

  `;
};

exports.down = async (sql) => {
  await sql`
  DROP TABLE product_size
  `;
  await sql`
   DROP TABLE product_stock
   `;
  await sql`
	DROP TABLE products
	`;
};
