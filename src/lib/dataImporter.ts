import { query } from './db.connector'; // or './db' depending on which is used in the app

export interface PatientData {
  name: string;
  age: number;
  gender: string;
  diagnosis: string;
  // add other relevant fields
}

export async function importPatientData(patient: PatientData) {
  const sql = `
    INSERT INTO patients (name, age, gender, diagnosis)
    VALUES (?, ?, ?, ?)
  `;
  const params = [patient.name, patient.age, patient.gender, patient.diagnosis];
  try {
    const result = await query(sql, params);
    return result.insertId;
  } catch (error: any) {
    throw new Error('Error importing patient data: ' + error.message);
  }
}
