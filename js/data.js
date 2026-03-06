// Departments and Batches Data Module

export const departments = [
  {
    id: 1,
    name: 'Automobile Engineering',
    code: 'ATE',
    totalStudents: 154,
    male: 126,
    female: 28,
    icon: '🚗',
    color: 'ate',
    batches: [2027, 2028, 2029]
  },
  {
    id: 2,
    name: 'Computer Science and Engineering',
    code: 'CSE',
    totalStudents: 185,
    male: 82,
    female: 103,
    icon: '💻',
    color: 'cse',
    batches: [2027, 2028, 2029]
  },
  {
    id: 3,
    name: 'Civil Engineering',
    code: 'CVE',
    totalStudents: 156,
    male: 74,
    female: 82,
    icon: '🏗️',
    color: 'cve',
    batches: [2027, 2028, 2029]
  },
  {
    id: 4,
    name: 'Electronics and Communication Engineering',
    code: 'ECE',
    totalStudents: 183,
    male: 105,
    female: 78,
    icon: '📱',
    color: 'ece',
    batches: [2027, 2028, 2029]
  },
  {
    id: 5,
    name: 'Electrical and Electronics Engineering',
    code: 'EEE',
    totalStudents: 180,
    male: 106,
    female: 74,
    icon: '⚡',
    color: 'eee',
    batches: [2027, 2028, 2029]
  },
  {
    id: 6,
    name: 'Information Technology',
    code: 'IMT',
    totalStudents: 173,
    male: 89,
    female: 84,
    icon: '🖥️',
    color: 'imt',
    batches: [2027, 2028, 2029]
  },
  {
    id: 7,
    name: 'Mechanical Engineering',
    code: 'MCE',
    totalStudents: 167,
    male: 147,
    female: 20,
    icon: '⚙️',
    color: 'mce',
    batches: [2027, 2028, 2029]
  },
  {
    id: 8,
    name: 'Data Science',
    code: 'CDS',
    totalStudents: 56,
    male: 28,
    female: 28,
    icon: '📊',
    color: 'cds',
    batches: [2029]
  }
];

// Batch Details Data
export const batchData = {
  // ATE (Automobile Engineering)
  'ATE-2027': {
    deptCode: 'ATE',
    year: 2027,
    level: '3rd Year',
    joinedYear: 2023,
    passsingYear: 2027,
    semester: 6,
    totalStudents: 49,
    male: 43,
    female: 6
  },
  'ATE-2028': {
    deptCode: 'ATE',
    year: 2028,
    level: '2nd Year',
    joinedYear: 2024,
    passsingYear: 2028,
    semester: 4,
    totalStudents: 58,
    male: 45,
    female: 13
  },
  'ATE-2029': {
    deptCode: 'ATE',
    year: 2029,
    level: '1st Year',
    joinedYear: 2025,
    passsingYear: 2029,
    semester: 2,
    totalStudents: 47,
    male: 38,
    female: 9
  },

  // CSE (Computer Science and Engineering)
  'CSE-2027': {
    deptCode: 'CSE',
    year: 2027,
    level: '3rd Year',
    joinedYear: 2023,
    passsingYear: 2027,
    semester: 6,
    totalStudents: 52,
    male: 28,
    female: 24
  },
  'CSE-2028': {
    deptCode: 'CSE',
    year: 2028,
    level: '2nd Year',
    joinedYear: 2024,
    passsingYear: 2028,
    semester: 4,
    totalStudents: 68,
    male: 35,
    female: 33
  },
  'CSE-2029': {
    deptCode: 'CSE',
    year: 2029,
    level: '1st Year',
    joinedYear: 2025,
    passsingYear: 2029,
    semester: 2,
    totalStudents: 65,
    male: 19,
    female: 46
  },

  // CVE (Civil Engineering)
  'CVE-2027': {
    deptCode: 'CVE',
    year: 2027,
    level: '3rd Year',
    joinedYear: 2023,
    passsingYear: 2027,
    semester: 6,
    totalStudents: 48,
    male: 24,
    female: 24
  },
  'CVE-2028': {
    deptCode: 'CVE',
    year: 2028,
    level: '2nd Year',
    joinedYear: 2024,
    passsingYear: 2028,
    semester: 4,
    totalStudents: 54,
    male: 28,
    female: 26
  },
  'CVE-2029': {
    deptCode: 'CVE',
    year: 2029,
    level: '1st Year',
    joinedYear: 2025,
    passsingYear: 2029,
    semester: 2,
    totalStudents: 54,
    male: 22,
    female: 32
  },

  // ECE (Electronics and Communication Engineering)
  'ECE-2027': {
    deptCode: 'ECE',
    year: 2027,
    level: '3rd Year',
    joinedYear: 2023,
    passsingYear: 2027,
    semester: 6,
    totalStudents: 55,
    male: 35,
    female: 20
  },
  'ECE-2028': {
    deptCode: 'ECE',
    year: 2028,
    level: '2nd Year',
    joinedYear: 2024,
    passsingYear: 2028,
    semester: 4,
    totalStudents: 63,
    male: 38,
    female: 25
  },
  'ECE-2029': {
    deptCode: 'ECE',
    year: 2029,
    level: '1st Year',
    joinedYear: 2025,
    passsingYear: 2029,
    semester: 2,
    totalStudents: 65,
    male: 32,
    female: 33
  },

  // EEE (Electrical and Electronics Engineering)
  'EEE-2027': {
    deptCode: 'EEE',
    year: 2027,
    level: '3rd Year',
    joinedYear: 2023,
    passsingYear: 2027,
    semester: 6,
    totalStudents: 54,
    male: 38,
    female: 16
  },
  'EEE-2028': {
    deptCode: 'EEE',
    year: 2028,
    level: '2nd Year',
    joinedYear: 2024,
    passsingYear: 2028,
    semester: 4,
    totalStudents: 62,
    male: 40,
    female: 22
  },
  'EEE-2029': {
    deptCode: 'EEE',
    year: 2029,
    level: '1st Year',
    joinedYear: 2025,
    passsingYear: 2029,
    semester: 2,
    totalStudents: 64,
    male: 28,
    female: 36
  },

  // IMT (Information Technology)
  'IMT-2027': {
    deptCode: 'IMT',
    year: 2027,
    level: '3rd Year',
    joinedYear: 2023,
    passsingYear: 2027,
    semester: 6,
    totalStudents: 52,
    male: 30,
    female: 22
  },
  'IMT-2028': {
    deptCode: 'IMT',
    year: 2028,
    level: '2nd Year',
    joinedYear: 2024,
    passsingYear: 2028,
    semester: 4,
    totalStudents: 60,
    male: 33,
    female: 27
  },
  'IMT-2029': {
    deptCode: 'IMT',
    year: 2029,
    level: '1st Year',
    joinedYear: 2025,
    passsingYear: 2029,
    semester: 2,
    totalStudents: 61,
    male: 26,
    female: 35
  },

  // MCE (Mechanical Engineering)
  'MCE-2027': {
    deptCode: 'MCE',
    year: 2027,
    level: '3rd Year',
    joinedYear: 2023,
    passsingYear: 2027,
    semester: 6,
    totalStudents: 51,
    male: 48,
    female: 3
  },
  'MCE-2028': {
    deptCode: 'MCE',
    year: 2028,
    level: '2nd Year',
    joinedYear: 2024,
    passsingYear: 2028,
    semester: 4,
    totalStudents: 58,
    male: 55,
    female: 3
  },
  'MCE-2029': {
    deptCode: 'MCE',
    year: 2029,
    level: '1st Year',
    joinedYear: 2025,
    passsingYear: 2029,
    semester: 2,
    totalStudents: 58,
    male: 44,
    female: 14
  },

  // CDS (Data Science)
  'CDS-2029': {
    deptCode: 'CDS',
    year: 2029,
    level: '1st Year',
    joinedYear: 2025,
    passsingYear: 2029,
    semester: 2,
    totalStudents: 56,
    male: 28,
    female: 28
  }
};

// Utility function to get batch details
export function getBatchDetails(deptCode, year) {
  return batchData[`${deptCode}-${year}`];
}

// Utility function to get department by code
export function getDepartmentByCode(code) {
  return departments.find(dept => dept.code === code);
}
