import { importPatientData, PatientData } from './dataImporter';
import { query } from './db.connector';
import { createPatientsTable } from './createPatientsTable';

describe('Functional tests for data import', () => {
  let insertId: number;

  beforeAll(async () => {
    await createPatientsTable();
  });

  test('Create patient data', async () => {
    const patient: PatientData = {
      name: 'Test Patient',
      age: 10,
      gender: 'M',
      diagnosis: 'Test Diagnosis',
    };
    insertId = await importPatientData(patient);
    expect(insertId).toBeGreaterThan(0);
  });

  test('Retrieve patient data', async () => {
    const rows = await query('SELECT * FROM patients WHERE id = ?', [insertId]);
    expect(rows.length).toBe(1);
    expect(rows[0].name).toBe('Test Patient');
  });

  test('Update patient data', async () => {
    const newDiagnosis = 'Updated Diagnosis';
    await query('UPDATE patients SET diagnosis = ? WHERE id = ?', [newDiagnosis, insertId]);
    const updatedRows = await query('SELECT * FROM patients WHERE id = ?', [insertId]);
    expect(updatedRows[0].diagnosis).toBe(newDiagnosis);
  });

  test('Delete patient data', async () => {
    await query('DELETE FROM patients WHERE id = ?', [insertId]);
    const deletedRows = await query('SELECT * FROM patients WHERE id = ?', [insertId]);
    expect(deletedRows.length).toBe(0);
  });
});
