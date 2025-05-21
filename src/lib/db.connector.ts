import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: "localhost", // Ajusta según tu entorno
  user: "ale",
  password: "gastroped",
  database: "gastroped",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;

export async function query(sql: string, params?: any[]) {
  let conn;
  try {
    conn = await pool.getConnection();
    const [rows] = await conn.execute(sql, params);
    return rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) await conn.release();
  }
}
