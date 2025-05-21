import * as mariadb from 'mariadb';

const pool = mariadb.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'alex',
  password: process.env.DB_PASSWORD || 'alex2002',
  database: process.env.DB_NAME || 'gastroped',
  connectionLimit: 5,
});

export async function query(sql: string, params?: any[]) {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(sql, params);
    return rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
}
