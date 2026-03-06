// Global variables
let allStudents = [];
let currentDept = '';
let currentBatch = '';
let batchDetails = {};

// Department information
const departmentNames = {
  'ATE': 'Automobile Engineering',
  'CSE': 'Computer Science and Engineering',
  'CVE': 'Civil Engineering',
  'ECE': 'Electronics and Communication Engineering',
  'EEE': 'Electrical and Electronics Engineering',
  'IMT': 'Information Technology',
  'MCE': 'Mechanical Engineering',
  'CDS': 'Data Science'
};

const batchInfo = {
  'ATE-2027': { level: '3rd Year', joined: 2023, passing: 2027, sem: 6 },
  'ATE-2028': { level: '2nd Year', joined: 2024, passing: 2028, sem: 4 },
  'ATE-2029': { level: '1st Year', joined: 2025, passing: 2029, sem: 2 },
  'CSE-2027': { level: '3rd Year', joined: 2023, passing: 2027, sem: 6 },
  'CSE-2028': { level: '2nd Year', joined: 2024, passing: 2028, sem: 4 },
  'CSE-2029': { level: '1st Year', joined: 2025, passing: 2029, sem: 2 },
  'CVE-2027': { level: '3rd Year', joined: 2023, passing: 2027, sem: 6 },
  'CVE-2028': { level: '2nd Year', joined: 2024, passing: 2028, sem: 4 },
  'CVE-2029': { level: '1st Year', joined: 2025, passing: 2029, sem: 2 },
  'ECE-2027': { level: '3rd Year', joined: 2023, passing: 2027, sem: 6 },
  'ECE-2028': { level: '2nd Year', joined: 2024, passing: 2028, sem: 4 },
  'ECE-2029': { level: '1st Year', joined: 2025, passing: 2029, sem: 2 },
  'EEE-2027': { level: '3rd Year', joined: 2023, passing: 2027, sem: 6 },
  'EEE-2028': { level: '2nd Year', joined: 2024, passing: 2028, sem: 4 },
  'EEE-2029': { level: '1st Year', joined: 2025, passing: 2029, sem: 2 },
  'IMT-2027': { level: '3rd Year', joined: 2023, passing: 2027, sem: 6 },
  'IMT-2028': { level: '2nd Year', joined: 2024, passing: 2028, sem: 4 },
  'IMT-2029': { level: '1st Year', joined: 2025, passing: 2029, sem: 2 },
  'MCE-2027': { level: '3rd Year', joined: 2023, passing: 2027, sem: 6 },
  'MCE-2028': { level: '2nd Year', joined: 2024, passing: 2028, sem: 4 },
  'MCE-2029': { level: '1st Year', joined: 2025, passing: 2029, sem: 2 },
  'CDS-2029': { level: '1st Year', joined: 2025, passing: 2029, sem: 2 }
};

// Load students on page load
document.addEventListener('DOMContentLoaded', function() {
  loadStudents();
});

async function loadStudents() {
  // Get department and batch from URL or session
  const params = new URLSearchParams(window.location.search);
  currentDept = params.get('dept') || sessionStorage.getItem('selectedDept');
  currentBatch = params.get('batch') || sessionStorage.getItem('selectedBatch');

  if (!currentDept || !currentBatch) {
    window.location.href = 'departments.html';
    return;
  }

  // Store in session
  sessionStorage.setItem('selectedDept', currentDept);
  sessionStorage.setItem('selectedBatch', currentBatch);

  // Load student data
  try {
    const response = await fetch('data/students.json');
    const studentsData = await response.json();

    const key = `${currentDept}-${currentBatch}`;
    allStudents = studentsData[key] || [];

    // Update page with data
    updatePageHeader();
    displayStudents(allStudents);
  } catch (error) {
    console.error('Error loading students:', error);
    document.getElementById('studentsTableBody').innerHTML = '<tr><td colspan="6">Error loading student data</td></tr>';
  }
}

function updatePageHeader() {
  const dept = departmentNames[currentDept] || currentDept;
  const batch = batchInfo[`${currentDept}-${currentBatch}`] || {};
  const level = batch.level || 'Unknown';

  // Update breadcrumbs
  document.getElementById('deptNameBreadcrumb').textContent = dept;
  document.getElementById('batchBreadcrumb').textContent = `${currentBatch} Batch`;

  // Update header
  document.getElementById('deptName').textContent = `${dept} — ${currentBatch} Batch (${level})`;
  document.getElementById('batchInfo').textContent =
    `${allStudents.length} students · ${currentDept} · Joined ${batch.joined} · Passing ${batch.passing} · Semester ${batch.sem}`;

  // Calculate gender statistics
  const maleStudents = allStudents.filter(s => s.Gender === 'M').length;
  const femaleStudents = allStudents.filter(s => s.Gender === 'F').length;
  const malePercentage = allStudents.length ? Math.round((maleStudents / allStudents.length) * 100) : 0;
  const femalePercentage = allStudents.length ? Math.round((femaleStudents / allStudents.length) * 100) : 0;

  // Update stats
  document.getElementById('totalStudents').textContent = allStudents.length;
  document.getElementById('maleCount').textContent = maleStudents;
  document.getElementById('malePercentage').textContent = `${malePercentage}%`;
  document.getElementById('femaleCount').textContent = femaleStudents;
  document.getElementById('femalePercentage').textContent = `${femalePercentage}%`;
  document.getElementById('deptCodeText').textContent = `${currentDept} · ${currentBatch}`;
  document.getElementById('semesterDisplay').textContent = `Sem ${batch.sem || 0}`;
  document.getElementById('yearDisplay').textContent = `${level} · ${batch.joined}-${batch.passing}`;
  document.getElementById('studentCount').textContent = `${allStudents.length} students`;
}

function displayStudents(students) {
  const tbody = document.getElementById('studentsTableBody');
  const noResults = document.getElementById('noResults');

  if (students.length === 0) {
    tbody.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }

  noResults.style.display = 'none';
  tbody.innerHTML = students.map(student => `
    <tr>
      <td>${student.Student_ID}</td>
      <td>${student.Name}</td>
      <td>
        <span class="gender-badge ${student.Gender === 'M' ? 'male' : 'female'}">
          ${student.Gender === 'M' ? '👨' : '👩'}
        </span>
      </td>
      <td style="font-size: 0.85rem; color: #0066cc;">
        ${student.Email_ID || '-'}
      </td>
    </tr>
  `).join('');
}

function filterStudents() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const genderFilter = document.getElementById('genderFilter').value;

  let filtered = allStudents.filter(student => {
    const matchesSearch =
      student.Student_ID.toLowerCase().includes(searchInput) ||
      student.Name.toLowerCase().includes(searchInput) ||
      (student.Email_ID && student.Email_ID.toLowerCase().includes(searchInput));

    const matchesGender = !genderFilter || student.Gender === genderFilter;

    return matchesSearch && matchesGender;
  });

  document.getElementById('studentCount').textContent = `${filtered.length} students`;
  displayStudents(filtered);
}

function goBack() {
  sessionStorage.removeItem('selectedBatch');
  window.location.href = `batches.html?dept=${currentDept}`;
}

function goToDepartment() {
  sessionStorage.removeItem('selectedBatch');
  window.location.href = `departments.html`;
}

function handleLogout() {
  sessionStorage.removeItem('isLoggedIn');
  sessionStorage.removeItem('selectedDept');
  sessionStorage.removeItem('selectedBatch');
  window.location.href = 'index.html';
}
