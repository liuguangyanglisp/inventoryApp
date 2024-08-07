const {Client} = require('pg');
require('dotenv').config();

const SQL = `
CREATE TABLE IF NOT EXISTS model (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255),
    model VARCHAR (255),
    price INTEGER,
    quantity INTEGER,
    UNIQUE (name, model)
);

CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255) UNIQUE,
    type VARCHAR (255) NOT NULL,
    image TEXT NOT NULL,
    UNIQUE (name, type)
);

-- Update 'type' from 'Sedan' to 'SEDAN' in the category table
UPDATE category
SET type = 'SEDAN'
WHERE type = 'Sedan';

`
async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: process.env.connectionString
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();