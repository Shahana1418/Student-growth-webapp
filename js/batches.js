// Batch Data and Functions
const batchData = {
  // ATE (Automobile Engineering)
  'ATE-2027': { year: 2027, level: '3rd Year', joined: 2023, passing: 2027, sem: 6, total: 49, male: 43, female: 6, color: 'blue' },
  'ATE-2028': { year: 2028, level: '2nd Year', joined: 2024, passing: 2028, sem: 4, total: 58, male: 45, female: 13, color: 'green' },
  'ATE-2029': { year: 2029, level: '1st Year', joined: 2025, passing: 2029, sem: 2, total: 47, male: 38, female: 9, color: 'purple' },

  // CSE (Computer Science and Engineering)
  'CSE-2027': { year: 2027, level: '3rd Year', joined: 2023, passing: 2027, sem: 6, total: 52, male: 28, female: 24, color: 'blue' },
  'CSE-2028': { year: 2028, level: '2nd Year', joined: 2024, passing: 2028, sem: 4, total: 68, male: 35, female: 33, color: 'green' },
  'CSE-2029': { year: 2029, level: '1st Year', joined: 2025, passing: 2029, sem: 2, total: 65, male: 19, female: 46, color: 'purple' },

  // CVE (Civil Engineering)
  'CVE-2027': { year: 2027, level: '3rd Year', joined: 2023, passing: 2027, sem: 6, total: 48, male: 24, female: 24, color: 'blue' },
  'CVE-2028': { year: 2028, level: '2nd Year', joined: 2024, passing: 2028, sem: 4, total: 54, male: 28, female: 26, color: 'green' },
  'CVE-2029': { year: 2029, level: '1st Year', joined: 2025, passing: 2029, sem: 2, total: 54, male: 22, female: 32, color: 'purple' },

  // ECE (Electronics and Communication Engineering)
  'ECE-2027': { year: 2027, level: '3rd Year', joined: 2023, passing: 2027, sem: 6, total: 55, male: 35, female: 20, color: 'blue' },
  'ECE-2028': { year: 2028, level: '2nd Year', joined: 2024, passing: 2028, sem: 4, total: 63, male: 38, female: 25, color: 'green' },
  'ECE-2029': { year: 2029, level: '1st Year', joined: 2025, passing: 2029, sem: 2, total: 65, male: 32, female: 33, color: 'purple' },

  // EEE (Electrical and Electronics Engineering)
  'EEE-2027': { year: 2027, level: '3rd Year', joined: 2023, passing: 2027, sem: 6, total: 54, male: 38, female: 16, color: 'blue' },
  'EEE-2028': { year: 2028, level: '2nd Year', joined: 2024, passing: 2028, sem: 4, total: 62, male: 40, female: 22, color: 'green' },
  'EEE-2029': { year: 2029, level: '1st Year', joined: 2025, passing: 2029, sem: 2, total: 64, male: 28, female: 36, color: 'purple' },

  // IMT (Information Technology)
  'IMT-2027': { year: 2027, level: '3rd Year', joined: 2023, passing: 2027, sem: 6, total: 52, male: 30, female: 22, color: 'blue' },
  'IMT-2028': { year: 2028, level: '2nd Year', joined: 2024, passing: 2028, sem: 4, total: 60, male: 33, female: 27, color: 'green' },
  'IMT-2029': { year: 2029, level: '1st Year', joined: 2025, passing: 2029, sem: 2, total: 61, male: 26, female: 35, color: 'purple' },

  // MCE (Mechanical Engineering)
  'MCE-2027': { year: 2027, level: '3rd Year', joined: 2023, passing: 2027, sem: 6, total: 51, male: 48, female: 3, color: 'blue' },
  'MCE-2028': { year: 2028, level: '2nd Year', joined: 2024, passing: 2028, sem: 4, total: 58, male: 55, female: 3, color: 'green' },
  'MCE-2029': { year: 2029, level: '1st Year', joined: 2025, passing: 2029, sem: 2, total: 58, male: 44, female: 14, color: 'purple' },

  // CDS (Data Science) - Only 2029
  'CDS-2029': { year: 2029, level: '1st Year', joined: 2025, passing: 2029, sem: 2, total: 56, male: 28, female: 28, color: 'purple' }
};

const departmentIcons = {
  'ATE': '🚗',
  'CSE': '💻',
  'CVE': '🏗️',
  'ECE': '📱',
  'EEE': '⚡',
  'IMT': '🖥️',
  'MCE': '⚙️',
  'CDS': '📊'
};

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

const departmentTotals = {
  'ATE': { total: 154, male: 126, female: 28 },
  'CSE': { total: 185, male: 82, female: 103 },
  'CVE': { total: 156, male: 74, female: 82 },
  'ECE': { total: 183, male: 105, female: 78 },
  'EEE': { total: 180, male: 106, female: 74 },
  'IMT': { total: 173, male: 89, female: 84 },
  'MCE': { total: 167, male: 147, female: 20 },
  'CDS': { total: 56, male: 28, female: 28 }
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
  if (deptCode === 'CDS') {
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
  sessionStorage.removeItem('isLoggedIn');
  sessionStorage.removeItem('selectedDept');
  sessionStorage.removeItem('selectedBatch');
  window.location.href = 'index.html';
}
