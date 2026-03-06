// Batch Data - Updated with actual class strength from student data
const batchData = {
  // ATE (Automobile Engineering)
  'ATE-2027': { year: 2027, level: '3rd Year', joined: 2023, passing: 2027, sem: 6, total: 49, male: 43, female: 6, color: 'blue' },
  'ATE-2028': { year: 2028, level: '2nd Year', joined: 2024, passing: 2028, sem: 4, total: 58, male: 45, female: 13, color: 'green' },
  'ATE-2029': { year: 2029, level: '1st Year', joined: 2025, passing: 2029, sem: 2, total: 47, male: 38, female: 9, color: 'purple' },

  // CSE (Computer Science and Engineering)
  'CSE-2027': { year: 2027, level: '3rd Year', joined: 2023, passing: 2027, sem: 6, total: 64, male: 24, female: 40, color: 'blue' },
  'CSE-2028': { year: 2028, level: '2nd Year', joined: 2024, passing: 2028, sem: 4, total: 64, male: 32, female: 32, color: 'green' },
  'CSE-2029': { year: 2029, level: '1st Year', joined: 2025, passing: 2029, sem: 2, total: 57, male: 26, female: 31, color: 'purple' },

  // CVE (Civil Engineering)
  'CVE-2027': { year: 2027, level: '3rd Year', joined: 2023, passing: 2027, sem: 6, total: 46, male: 27, female: 19, color: 'blue' },
  'CVE-2028': { year: 2028, level: '2nd Year', joined: 2024, passing: 2028, sem: 4, total: 60, male: 29, female: 31, color: 'green' },
  'CVE-2029': { year: 2029, level: '1st Year', joined: 2025, passing: 2029, sem: 2, total: 50, male: 18, female: 32, color: 'purple' },

  // ECE (Electronics and Communication Engineering)
  'ECE-2027': { year: 2027, level: '3rd Year', joined: 2023, passing: 2027, sem: 6, total: 61, male: 27, female: 34, color: 'blue' },
  'ECE-2028': { year: 2028, level: '2nd Year', joined: 2024, passing: 2028, sem: 4, total: 66, male: 0, female: 0, color: 'green' },
  'ECE-2029': { year: 2029, level: '1st Year', joined: 2025, passing: 2029, sem: 2, total: 56, male: 36, female: 20, color: 'purple' },

  // EEE (Electrical and Electronics Engineering)
  'EEE-2027': { year: 2027, level: '3rd Year', joined: 2023, passing: 2027, sem: 6, total: 63, male: 41, female: 22, color: 'blue' },
  'EEE-2028': { year: 2028, level: '2nd Year', joined: 2024, passing: 2028, sem: 4, total: 62, male: 40, female: 22, color: 'green' },
  'EEE-2029': { year: 2029, level: '1st Year', joined: 2025, passing: 2029, sem: 2, total: 55, male: 25, female: 30, color: 'purple' },

  // IMT (Information Technology)
  'IMT-2027': { year: 2027, level: '3rd Year', joined: 2023, passing: 2027, sem: 6, total: 61, male: 34, female: 27, color: 'blue' },
  'IMT-2028': { year: 2028, level: '2nd Year', joined: 2024, passing: 2028, sem: 4, total: 57, male: 29, female: 28, color: 'green' },
  'IMT-2029': { year: 2029, level: '1st Year', joined: 2025, passing: 2029, sem: 2, total: 55, male: 26, female: 29, color: 'purple' },

  // MCE (Mechanical Engineering)
  'MCE-2027': { year: 2027, level: '3rd Year', joined: 2023, passing: 2027, sem: 6, total: 54, male: 48, female: 6, color: 'blue' },
  'MCE-2028': { year: 2028, level: '2nd Year', joined: 2024, passing: 2028, sem: 4, total: 59, male: 52, female: 7, color: 'green' },
  'MCE-2029': { year: 2029, level: '1st Year', joined: 2025, passing: 2029, sem: 2, total: 54, male: 47, female: 7, color: 'purple' },

  // DSC (Data Science) - Only 2029
  'DSC-2029': { year: 2029, level: '1st Year', joined: 2025, passing: 2029, sem: 2, total: 56, male: 28, female: 28, color: 'purple' }
};

const departmentIcons = {
  'ATE': '🚗',
  'CSE': '💻',
  'CVE': '🏗️',
  'ECE': '📱',
  'EEE': '⚡',
  'IMT': '🖥️',
  'MCE': '⚙️',
  'DSC': '📊'
};

const departmentNames = {
  'ATE': 'Automobile Engineering',
  'CSE': 'Computer Science and Engineering',
  'CVE': 'Civil Engineering',
  'ECE': 'Electronics and Communication Engineering',
  'EEE': 'Electrical and Electronics Engineering',
  'IMT': 'Information Technology',
  'MCE': 'Mechanical Engineering',
  'DSC': 'Data Science'
};

const departmentTotals = {
  'ATE': { total: 154, male: 126, female: 28 },
  'CSE': { total: 185, male: 82, female: 103 },
  'CVE': { total: 156, male: 74, female: 82 },
  'ECE': { total: 183, male: 105, female: 78 },
  'EEE': { total: 180, male: 106, female: 74 },
  'IMT': { total: 173, male: 89, female: 84 },
  'MCE': { total: 167, male: 147, female: 20 },
  'DSC': { total: 56, male: 28, female: 28 }
};

// Load batches on page load
document.addEventListener('DOMContentLoaded', function() {
  loadBatches();
});

function loadBatches() {
  // Get department code from URL or session
  const params = new URLSearchParams(window.location.search);
  const deptCode = params.get('dept') || sessionStorage.getItem('selectedDept');

  if (!deptCode) {
    window.location.href = 'departments.html';
    return;
  }

  // Store selected department
  sessionStorage.setItem('selectedDept', deptCode);

  // Update header with department info
  document.getElementById('deptIcon').textContent = departmentIcons[deptCode];
  document.getElementById('deptName').textContent = departmentNames[deptCode];
  document.getElementById('deptNameBreadcrumb').textContent = departmentNames[deptCode];
  document.getElementById('deptCode').textContent = `${deptCode} · ${departmentTotals[deptCode].total} students across 3 batches`;
  document.getElementById('totalStudents').textContent = departmentTotals[deptCode].total;
  document.getElementById('maleCount').textContent = departmentTotals[deptCode].male;
  document.getElementById('femaleCount').textContent = departmentTotals[deptCode].female;

  // Get available batches for this department
  const availableBatches = getAvailableBatches(deptCode);

  // Calculate actual total strength across all batches
  const actualTotal = availableBatches.reduce((sum, year) => {
    const batch = batchData[`${deptCode}-${year}`];
    return sum + (batch ? batch.total : 0);
  }, 0);

  const actualMale = availableBatches.reduce((sum, year) => {
    const batch = batchData[`${deptCode}-${year}`];
    return sum + (batch ? batch.male : 0);
  }, 0);

  const actualFemale = availableBatches.reduce((sum, year) => {
    const batch = batchData[`${deptCode}-${year}`];
    return sum + (batch ? batch.female : 0);
  }, 0);

  // Update with actual totals
  document.getElementById('totalStudents').textContent = actualTotal;
  document.getElementById('maleCount').textContent = actualMale;
  document.getElementById('femaleCount').textContent = actualFemale;
  document.getElementById('deptCode').textContent = `${deptCode} · ${actualTotal} students across ${availableBatches.length} batches`;

  document.getElementById('batchCount').textContent = availableBatches.length;
  document.getElementById('batchYears').textContent = availableBatches.join(', ');

  // Load batch cards
  const grid = document.getElementById('batchesGrid');
  grid.innerHTML = '';

  availableBatches.forEach(year => {
    const key = `${deptCode}-${year}`;
    const batch = batchData[key];
    if (batch) {
      const card = createBatchCard(deptCode, batch);
      grid.appendChild(card);
    }
  });
}

function getAvailableBatches(deptCode) {
  if (deptCode === 'DSC') {
    return [2029];
  }
  return [2027, 2028, 2029];
}

function createBatchCard(deptCode, batch) {
  const card = document.createElement('div');
  card.className = `batch-card ${batch.color}`;
  card.onclick = () => selectBatch(deptCode, batch.year);

  const icon = '📅';
  const yearLevel = batch.level;

  card.innerHTML = `
    <div class="batch-card-header">
      <div class="batch-icon">${icon}</div>
      <div class="batch-title">
        <h4>${batch.year} Batch — ${yearLevel}</h4>
        <p>JOINED ${batch.joined} · PASSING ${batch.passing}</p>
      </div>
    </div>

    <div class="batch-details">
      <div class="batch-details-item">
        <span class="batch-details-label">Semester</span>
        <span class="batch-details-value">SEM ${batch.sem}</span>
      </div>
    </div>

    <div class="batch-stats">
      <div class="batch-stat">
        <div class="batch-stat-label">Total Students</div>
        <div class="batch-stat-value">${batch.total}</div>
        <div class="batch-stat-breakdown">
          <span class="male">👨 ${batch.male}</span> | <span class="female">👩 ${batch.female}</span>
        </div>
      </div>
      <div class="batch-stat">
        <div class="batch-stat-label">Sem</div>
        <div class="batch-stat-value">${batch.sem}</div>
        <div class="sem-label">SEM ${batch.sem}</div>
      </div>
    </div>

    <div class="batch-action">
      View Details
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </div>
  `;

  return card;
}

function selectBatch(deptCode, year) {
  sessionStorage.setItem('selectedDept', deptCode);
  sessionStorage.setItem('selectedBatch', year);
  window.location.href = `students.html?dept=${deptCode}&batch=${year}`;
}

function goBack() {
  sessionStorage.removeItem('selectedDept');
  window.location.href = 'departments.html';
}

function handleLogout() {
  localStorage.removeItem('isLoggedIn');
  sessionStorage.removeItem('selectedDept');
  sessionStorage.removeItem('selectedBatch');
  sessionStorage.removeItem('generatedTeams');
  window.location.href = 'index.html';
}
