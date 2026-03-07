// Departments Data
const departments = [
  {
    id: 1,
    name: 'Automobile Engineering',
    code: 'ATE',
    batches: 3,
    totalStudents: 155,
    male: 126,
    female: 29,
    icon: '🚗',
    color: 'ate'
  },
  {
    id: 2,
    name: 'Computer Science and Engineering',
    code: 'CSE',
    batches: 3,
    totalStudents: 185,
    male: 82,
    female: 103,
    icon: '💻',
    color: 'cse'
  },
  {
    id: 3,
    name: 'Civil Engineering',
    code: 'CVE',
    batches: 3,
    totalStudents: 155,
    male: 73,
    female: 82,
    icon: '🏗️',
    color: 'cve'
  },
  {
    id: 4,
    name: 'Electronics and Communication Engineering',
    code: 'ECE',
    batches: 3,
    totalStudents: 183,
    male: 105,
    female: 78,
    icon: '📱',
    color: 'ece'
  },
  {
    id: 5,
    name: 'Electrical and Electronics Engineering',
    code: 'EEE',
    batches: 3,
    totalStudents: 180,
    male: 106,
    female: 74,
    icon: '⚡',
    color: 'eee'
  },
  {
    id: 6,
    name: 'Information Technology',
    code: 'IMT',
    batches: 3,
    totalStudents: 173,
    male: 89,
    female: 84,
    icon: '🖥️',
    color: 'imt'
  },
  {
    id: 7,
    name: 'Mechanical Engineering',
    code: 'MCE',
    batches: 3,
    totalStudents: 167,
    male: 147,
    female: 20,
    icon: '⚙️',
    color: 'mce'
  },
  {
    id: 8,
    name: 'Data Science',
    code: 'DSC',
    batches: 1,
    totalStudents: 56,
    male: 28,
    female: 28,
    icon: '📊',
    color: 'cds'
  }
];

// Load departments on page load
document.addEventListener('DOMContentLoaded', function() {
  loadDepartments();
});

function loadDepartments() {
  const grid = document.getElementById('departmentsGrid');
  grid.innerHTML = '';

  departments.forEach(dept => {
    const card = createDepartmentCard(dept);
    grid.appendChild(card);
  });
}

function createDepartmentCard(dept) {
  const card = document.createElement('div');
  card.className = `department-card ${dept.color}`;
  card.onclick = () => selectDepartment(dept);

  card.innerHTML = `
    <div class="department-header">
      <div class="department-icon">${dept.icon}</div>
      <div class="department-info">
        <h3>${dept.name}</h3>
        <p>${dept.code} · ${dept.batches} BATCHES</p>
      </div>
    </div>

    <div class="department-stats">
      <div class="stat-item">
        <span class="label">Students:</span>
        <span class="value">${dept.totalStudents}</span>
      </div>
      <div class="stat-item male">
        <span class="label">👨 Male:</span>
        <span class="value">${dept.male}</span>
      </div>
      <div class="stat-item female">
        <span class="label">👩 Female:</span>
        <span class="value">${dept.female}</span>
      </div>
    </div>

    <div class="department-action">
      Select Batches
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </div>
  `;

  return card;
}

function selectDepartment(dept) {
  sessionStorage.setItem('selectedDept', dept.code);
  window.location.href = 'batches.html?dept=' + dept.code;
}

function showDepartmentDetail(dept) {
  const modal = document.getElementById('departmentModal');
  const modalBody = document.getElementById('modalBody');

  const deptColorClass = dept.color;

  modalBody.innerHTML = `
    <div class="modal-header">
      <div class="modal-icon" style="background: rgba(30, 58, 138, 0.1); color: var(--primary-blue);">
        ${dept.icon}
      </div>
      <div class="modal-title">
        <h2>${dept.name}</h2>
        <p>${dept.code}</p>
      </div>
    </div>

    <div class="modal-body">
      <div class="modal-stat">
        <label>Total Students</label>
        <value>${dept.totalStudents}</value>
      </div>
      <div class="modal-stat">
        <label>🎓 Batches</label>
        <value>${dept.batches}</value>
      </div>
      <div class="modal-stat">
        <label>👨 Male Students</label>
        <value style="color: #2563eb;">${dept.male}</value>
      </div>
      <div class="modal-stat">
        <label>👩 Female Students</label>
        <value style="color: #ec4899;">${dept.female}</value>
      </div>
    </div>
  `;

  modal.classList.add('show');
}

function closeDepartmentModal() {
  const modal = document.getElementById('departmentModal');
  modal.classList.remove('show');
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
  const modal = document.getElementById('departmentModal');
  if (event.target === modal) {
    closeDepartmentModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeDepartmentModal();
  }
});

// Navigation functions
function goHome() {
  window.location.href = 'index.html';
}

function handleLogout() {
  localStorage.removeItem('isLoggedIn');
  sessionStorage.removeItem('selectedDept');
  sessionStorage.removeItem('selectedBatch');
  sessionStorage.removeItem('generatedTeams');
  window.location.href = 'index.html';
}
