import pool from './db.connector';


async function testConnection() {
    let conn;
    try {
        conn = await pool.getConnection();
        console.log('✅ Conexión exitosa a MariaDB');
    } catch (err) {
        console.error('❌ Error en la conexión:', err.message);
    } finally {
        if (conn) await conn.end();
    }
}
testConnection();
