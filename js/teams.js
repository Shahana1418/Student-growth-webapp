// Teams Display Logic
let teamsData = [];
let currentDept = '';
let currentBatch = '';
let departmentNames = {
  'ATE': 'Automobile Engineering',
  'CSE': 'Computer Science and Engineering',
  'CVE': 'Civil Engineering',
  'ECE': 'Electronics and Communication Engineering',
  'EEE': 'Electrical and Electronics Engineering',
  'IMT': 'Information Technology',
  'MCE': 'Mechanical Engineering',
  'DSC': 'Data Science'
};

// Load teams on page load
document.addEventListener('DOMContentLoaded', function() {
  loadTeams();
});

function loadTeams() {
  // Get teams data from session
  const teamsJSON = sessionStorage.getItem('generatedTeams');

  if (!teamsJSON) {
    window.location.href = 'departments.html';
    return;
  }

  const data = JSON.parse(teamsJSON);
  teamsData = data.teams;
  currentDept = data.dept;
  currentBatch = data.batch;

  // Update page header
  updatePageHeader();

  // Display teams
  displayTeams();
}

function updatePageHeader() {
  const dept = departmentNames[currentDept] || currentDept;

  // Update breadcrumbs
  document.getElementById('deptNameBreadcrumb').textContent = dept;
  document.getElementById('batchBreadcrumb').textContent = `${currentBatch} Batch`;

  // Update main header
  document.getElementById('pageTitle').textContent = `${dept} — ${currentBatch} Batch Teams`;
  document.getElementById('pageSubtitle').textContent = `${teamsData.length} teams formed with ${teamsData.reduce((sum, t) => sum + t.members.length, 0)} students`;

  // Update stats
  const totalStudents = teamsData.reduce((sum, t) => sum + t.members.length, 0);
  const avgSize = teamsData.length > 0 ? (totalStudents / teamsData.length).toFixed(1) : 0;

  document.getElementById('totalTeams').textContent = teamsData.length;
  document.getElementById('totalStudents').textContent = totalStudents;
  document.getElementById('avgTeamSize').textContent = avgSize;
}

function displayTeams() {
  const grid = document.getElementById('teamsGrid');
  grid.innerHTML = '';

  teamsData.forEach((team, index) => {
    const card = createTeamCard(team, index + 1);
    grid.appendChild(card);
  });
}

function createTeamCard(team, teamNumber) {
  const card = document.createElement('div');
  card.className = 'team-card';

  // Determine color based on team index
  const colors = ['blue', 'green', 'purple', 'orange', 'indigo', 'pink', 'teal', 'cyan'];
  const colorClass = colors[(teamNumber - 1) % colors.length];
  card.classList.add(colorClass);

  const membersHTML = team.members.map(member => `
    <div class="team-member">
      <span class="member-id">${member.Student_ID}</span>
      <span class="member-name">${member.Name}</span>
      <span class="member-gender ${member.Gender === 'M' ? 'male' : 'female'}">
        ${member.Gender === 'M' ? '👨' : '👩'}
      </span>
    </div>
  `).join('');

  card.innerHTML = `
    <div class="team-header">
      <div class="team-number">Team ${teamNumber}</div>
      <div class="team-size">${team.size} Members</div>
    </div>

    <div class="team-composition">
      <div class="composition-item">
        <span class="composition-label">Male</span>
        <span class="composition-value male">${team.maleCount}</span>
      </div>
      <div class="composition-item">
        <span class="composition-label">Female</span>
        <span class="composition-value female">${team.femaleCount}</span>
      </div>
    </div>

    <div class="team-members">
      ${membersHTML}
    </div>
  `;

  return card;
}

function goBack() {
  sessionStorage.removeItem('generatedTeams');
  window.location.href = `students.html?dept=${currentDept}&batch=${currentBatch}`;
}

function goBackToStudents() {
  sessionStorage.removeItem('generatedTeams');
  window.location.href = `students.html?dept=${currentDept}&batch=${currentBatch}`;
}

function goHome() {
  sessionStorage.removeItem('generatedTeams');
  window.location.href = 'index.html';
}

function goToDepartment() {
  sessionStorage.removeItem('generatedTeams');
  window.location.href = `departments.html`;
}

function handleLogout() {
  sessionStorage.removeItem('isLoggedIn');
  sessionStorage.removeItem('selectedDept');
  sessionStorage.removeItem('selectedBatch');
  sessionStorage.removeItem('generatedTeams');
  window.location.href = 'index.html';
}

function downloadTeamsCSV() {
  if (teamsData.length === 0) return;

  let csv = 'Team Number,Student ID,Student Name,Gender,Team Size,Male Count,Female Count\n';

  teamsData.forEach((team, idx) => {
    team.members.forEach((member, memberIdx) => {
      csv += `Team ${idx + 1},${member.Student_ID},"${member.Name}",${member.Gender},${team.size},${team.maleCount},${team.femaleCount}\n`;
    });
  });

  // Create and download file
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
  element.setAttribute('download', `teams_${currentDept}_${currentBatch}.csv`);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
