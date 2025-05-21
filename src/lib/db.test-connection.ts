import { query } from './db';

async function testConnection() {
  try {
    const result = await query('SELECT NOW() as now');
    console.log('Conexión exitosa:', result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error en la conexión:', error.message);
    } else {
      console.error('Error en la conexión:', error);
    }
  }
}

async function testQueryWithParams() {
  try {
    const result = await query('SELECT ? + ? as sum', [1, 2]);
    console.log('Query with params successful:', result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error in query with params:', error.message);
    } else {
      console.error('Error in query with params:', error);
    }
  }
}

async function testQueryErrorHandling() {
  try {
    await query('SELECT * FROM non_existing_table');
  } catch (error: unknown) {
    console.log('Error completo:', error);
    if (error instanceof Error) {
      console.log('Properly caught query error:', error.message);
    } else {
      console.log('Properly caught query error:', error);
    }
  }
}

async function testEmptyQuery() {
  try {
    await query('');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('Properly caught empty query error:', error.message);
    } else {
      console.log('Properly caught empty query error:', error);
    }
  }
}

async function testConnectionPoolLimit() {
  const connections = [];
  try {
    for (let i = 0; i < 5; i++) {
      connections.push(await query('SELECT SLEEP(0.1)'));
    }
    console.log('Connection pool limit test passed');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error in connection pool limit test:', error.message);
    } else {
      console.error('Error in connection pool limit test:', error);
    }
  }
}

async function runAllTests() {
  await testConnection();
  await testQueryWithParams();
  await testQueryErrorHandling();
  await testEmptyQuery();
  await testConnectionPoolLimit();
}

runAllTests();


