import { patientsData } from './patientsData';

export { patientsData };

export const getPatientById = (id) => {
  if (!id) return null;
  const formattedId = id.toUpperCase().trim();
  return patientsData[formattedId] || null;
};
