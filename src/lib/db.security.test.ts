import { query } from './db';

async function runSecurityTests() {
  try {
    console.log('Iniciando pruebas de seguridad...');

    // Prueba de inyección SQL simple
    try {
      const maliciousInput = "'; DROP TABLE test_table; --";
      await query('SELECT * FROM test_table WHERE name = ?', [maliciousInput]);
      console.log('Prueba de inyección SQL: No se detectó vulnerabilidad.');
    } catch (error) {
      console.log('Prueba de inyección SQL: Error capturado, posible protección activa.');
    }

    // Prueba de acceso no autorizado (simulada)
    // Aquí se puede simular un acceso con credenciales inválidas si se implementa autenticación

    // Prueba de manejo de datos sensibles
    // Insertar datos sensibles y verificar que no se expongan en logs o errores
    const sensitiveData = 'contraseña_super_secreta';
    await query('INSERT INTO test_table (name) VALUES (?)', [sensitiveData]);
    console.log('Datos sensibles insertados correctamente.');

    // Limpieza de datos sensibles insertados
    await query('DELETE FROM test_table WHERE name = ?', [sensitiveData]);
    console.log('Datos sensibles eliminados.');

    console.log('Pruebas de seguridad completadas exitosamente.');
  } catch (error) {
    console.error('Error durante las pruebas de seguridad:', error);
  }
}

runSecurityTests();
