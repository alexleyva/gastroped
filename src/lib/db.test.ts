import { query } from './db';

async function runTests() {
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

    console.log('Pruebas completadas exitosamente.');
  } catch (error) {
    console.error('Error durante las pruebas:', error);
  }
}

runTests();
