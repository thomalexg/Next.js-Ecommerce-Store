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
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE products
	`;
};
