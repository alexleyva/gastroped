import { query } from './db.connector';

export async function createPatientsTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS patients (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      age INT NOT NULL,
      gender VARCHAR(10) NOT NULL,
      diagnosis TEXT NOT NULL
    );
  `;
  try {
    await query(sql);
    console.log('Tabla patients creada o ya existe.');
  } catch (error: any) {
    console.error('Error creando la tabla patients:', error.message);
    throw error;
  }
}
