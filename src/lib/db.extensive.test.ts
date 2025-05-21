import { query } from './db';

async function runExtensiveTests() {
  try {
    console.log('Probando conexión a la base de datos...');
    const result = await query('SELECT 1 as val');
    console.log('Conexión exitosa:', result);

    console.log('Probando inserción...');
    await query('CREATE TABLE IF NOT EXISTS test_table (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(50))');
    const insertResult = await query('INSERT INTO test_table (name) VALUES (?)', ['test']);
    console.log('Inserción exitosa, ID:', insertResult.insertId);

    console.log('Probando consulta...');
    const rows = await query('SELECT * FROM test_table WHERE id = ?', [insertResult.insertId]);
    console.log('Consulta exitosa:', rows);

    console.log('Probando actualización...');
    await query('UPDATE test_table SET name = ? WHERE id = ?', ['test_updated', insertResult.insertId]);
    const updatedRows = await query('SELECT * FROM test_table WHERE id = ?', [insertResult.insertId]);
    console.log('Actualización exitosa:', updatedRows);

    console.log('Probando eliminación...');
    await query('DELETE FROM test_table WHERE id = ?', [insertResult.insertId]);
    const deletedRows = await query('SELECT * FROM test_table WHERE id = ?', [insertResult.insertId]);
    console.log('Eliminación exitosa, filas encontradas:', deletedRows.length);

    // Nuevas pruebas exhaustivas

    console.log('Probando manejo de errores con consulta inválida...');
    try {
      await query('SELECT * FROM tabla_inexistente');
    } catch (error) {
      console.log('Error capturado correctamente:', error.message);
    }

    console.log('Probando concurrencia con múltiples inserciones...');
    const promises = [];
    for (let i = 0; i < 10; i++) {
      promises.push(query('INSERT INTO test_table (name) VALUES (?)', [`concurrent_test_${i}`]));
    }
    const results = await Promise.all(promises);
    console.log('Inserciones concurrentes completadas:', results.map(r => r.insertId));

    console.log('Probando validación de datos con inserción inválida...');
    try {
      await query('INSERT INTO test_table (name) VALUES (?)', [null]);
    } catch (error) {
      console.log('Error de validación capturado:', error.message);
    }

    // Limpieza de datos concurrentes insertados
    const ids = results.map(r => r.insertId);
    await query(`DELETE FROM test_table WHERE id IN (${ids.join(',')})`);
    console.log('Datos concurrentes eliminados.');

    console.log('Pruebas exhaustivas completadas exitosamente.');
  } catch (error) {
    console.error('Error durante las pruebas:', error);
  }
}

runExtensiveTests();
