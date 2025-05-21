import { query } from './db';

async function runPerformanceTests() {
  try {
    console.log('Iniciando pruebas de rendimiento...');

    // Prueba de carga: múltiples inserciones concurrentes
    const insertPromises = [];
    const numInserts = 1000;
    console.time('Inserciones concurrentes');
    for (let i = 0; i < numInserts; i++) {
      insertPromises.push(query('INSERT INTO test_table (name) VALUES (?)', [`performance_test_${i}`]));
    }
    await Promise.all(insertPromises);
    console.timeEnd('Inserciones concurrentes');

    // Prueba de consulta masiva
    console.time('Consulta masiva');
    const rows = await query('SELECT * FROM test_table WHERE name LIKE ?', ['performance_test_%']);
    console.timeEnd('Consulta masiva');
    console.log(`Filas recuperadas: ${rows.length}`);

    // Limpieza de datos insertados
    const ids = rows.map((row: any) => row.id);
    if (ids.length > 0) {
      await query(`DELETE FROM test_table WHERE id IN (${ids.join(',')})`);
      console.log('Datos de prueba de rendimiento eliminados.');
    }

    console.log('Pruebas de rendimiento completadas exitosamente.');
  } catch (error) {
    console.error('Error durante las pruebas de rendimiento:', error);
  }
}

runPerformanceTests();
