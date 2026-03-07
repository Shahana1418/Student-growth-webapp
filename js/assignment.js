// Assignment Generation Logic
let teamsData = [];
let assignmentsData = [];
let currentDept = '';
let currentBatch = '';
let currentStep = 1;
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

const ROLES = ['Presenter', 'Reviewer', 'Audience', 'Feedback'];

// Load data on page load
document.addEventListener('DOMContentLoaded', function() {
  loadAssignmentData();
  initializeStep1();
});

function loadAssignmentData() {
  // Get teams data from session
  const assignmentJSON = sessionStorage.getItem('teamsForAssignment');

  if (!assignmentJSON) {
    window.location.href = getBaseUrl() + './teams.html';
    return;
  }

  const data = JSON.parse(assignmentJSON);
  teamsData = data.teams;
  currentDept = data.dept;
  currentBatch = data.batch;
}

function initializeStep1() {
  const dept = departmentNames[currentDept] || currentDept;
  const totalStudents = teamsData.reduce((sum, t) => sum + t.members.length, 0);

  document.getElementById('deptField').value = dept;
  document.getElementById('batchField').value = currentBatch;
  document.getElementById('teamsField').value = teamsData.length;
  document.getElementById('studentsField').value = totalStudents;
}

function goToStep(stepNum) {
  // Hide all steps
  document.querySelectorAll('.step-content').forEach(el => {
    el.classList.remove('active');
  });
  document.querySelectorAll('.step').forEach(el => {
    el.classList.remove('active');
  });

  // Show selected step
  document.getElementById(`step-${stepNum}`).classList.add('active');
  document.getElementById(`step-${stepNum}-indicator`).classList.add('active');

  currentStep = stepNum;

  // Update preview if going to step 3
  if (stepNum === 3) {
    updatePreview();
  }
}

function updatePreview() {
  const presenterDuration = parseInt(document.getElementById('presenterDuration').value) || 12;
  const reviewerDuration = parseInt(document.getElementById('reviewerDuration').value) || 5;
  const audienceDuration = parseInt(document.getElementById('audienceDuration').value) || 5;
  const feedbackDuration = parseInt(document.getElementById('feedbackDuration').value) || 5;

  const totalSessionDuration = presenterDuration + reviewerDuration + audienceDuration + feedbackDuration;
  const totalSessions = teamsData.length;
  const teamsPerRole = Math.ceil(totalSessions / 4);

  document.getElementById('sessionDurationPreview').textContent = totalSessionDuration + ' minutes';
  document.getElementById('totalSessionsPreview').textContent = totalSessions;
  document.getElementById('teamsPerRolePreview').textContent = teamsPerRole;
}

function generateAndDisplay() {
  // Get configured durations
  const presenterDuration = parseInt(document.getElementById('presenterDuration').value) || 12;
  const reviewerDuration = parseInt(document.getElementById('reviewerDuration').value) || 5;
  const audienceDuration = parseInt(document.getElementById('audienceDuration').value) || 5;
  const feedbackDuration = parseInt(document.getElementById('feedbackDuration').value) || 5;

  // Generate role assignments
  generateAssignments();

  // Display role durations in results
  document.getElementById('presenterDisplay').textContent = presenterDuration + '-' + presenterDuration + ' min';
  document.getElementById('reviewerDisplay').textContent = reviewerDuration + ' min';
  document.getElementById('audienceDisplay').textContent = audienceDuration + ' min';
  document.getElementById('feedbackDisplay').textContent = feedbackDuration + ' min';

  // Hide configuration and show results
  document.querySelector('.step-indicator').style.display = 'none';
  document.querySelectorAll('.step-content').forEach(el => {
    el.style.display = 'none';
  });
  document.getElementById('resultsSection').style.display = 'block';

  // Display assignments
  displayAssignments();
}

function resetConfiguration() {
  // Show configuration again
  document.querySelector('.step-indicator').style.display = 'flex';
  document.querySelectorAll('.step-content').forEach(el => {
    el.style.display = 'none';
  });
  document.getElementById('resultsSection').style.display = 'none';

  // Reset to step 1
  goToStep(1);
}

function generateAssignments() {
  // Create assignment array with role rotation
  // For 12 teams: each role gets 3 teams (12/4 = 3)
  // Rotation ensures fair distribution

  assignmentsData = [];
  const numTeams = teamsData.length;
  const numSessions = numTeams;
  const rolesPerSession = 4; // Presenter, Reviewer, Audience, Feedback
  const teamsPerRole = Math.ceil(numTeams / rolesPerSession);

  // Create rotation array
  for (let session = 1; session <= numSessions; session++) {
    const sessionAssignments = {
      session: session,
      presenter: null,
      reviewer: null,
      audience: null,
      feedback: null
    };

    // Assign teams to roles with rotation
    // Team at index (session-1) gets Presenter
    // Next team in rotation gets Reviewer, etc.
    const baseIndex = (session - 1) % numTeams;

    sessionAssignments.presenter = teamsData[(baseIndex) % numTeams];
    sessionAssignments.reviewer = teamsData[(baseIndex + Math.floor(numTeams / 4)) % numTeams];
    sessionAssignments.audience = teamsData[(baseIndex + Math.floor(numTeams / 2)) % numTeams];
    sessionAssignments.feedback = teamsData[(baseIndex + Math.floor(numTeams * 3 / 4)) % numTeams];

    assignmentsData.push(sessionAssignments);
  }
}

function updatePageHeader() {
  const dept = departmentNames[currentDept] || currentDept;

  // Update breadcrumbs
  document.getElementById('deptNameBreadcrumb').textContent = dept;
  document.getElementById('batchBreadcrumb').textContent = `${currentBatch} Batch`;

  // Update main header
  document.getElementById('pageTitle').textContent = `${dept} — ${currentBatch} Batch Assignments`;
  document.getElementById('pageSubtitle').textContent = `${teamsData.length} teams across ${assignmentsData.length} sessions`;
}

function displayAssignments() {
  displaySessionTable();
  displayTeamAssignments();
}

function displaySessionTable() {
  const tbody = document.getElementById('assignmentBody');
  tbody.innerHTML = '';

  assignmentsData.forEach(session => {
    const row = document.createElement('tr');
    const sessionNum = String(session.session).padStart(2, '0');

    const presenterTeam = getTeamNumber(session.presenter);
    const reviewerTeam = getTeamNumber(session.reviewer);
    const audienceTeam = getTeamNumber(session.audience);
    const feedbackTeam = getTeamNumber(session.feedback);

    row.innerHTML = `
      <td class="session-cell">Session ${sessionNum}</td>
      <td class="role-cell presenter"><strong>Team ${presenterTeam}</strong></td>
      <td class="role-cell reviewer"><strong>Team ${reviewerTeam}</strong></td>
      <td class="role-cell audience"><strong>Team ${audienceTeam}</strong></td>
      <td class="role-cell feedback"><strong>Team ${feedbackTeam}</strong></td>
    `;
    tbody.appendChild(row);
  });
}

function displayTeamAssignments() {
  const container = document.getElementById('teamAssignments');
  container.innerHTML = '';

  const teamAssignments = {};

  // Build team-to-session mappings
  teamsData.forEach((team, idx) => {
    const teamNum = idx + 1;
    teamAssignments[teamNum] = [];
  });

  // Map each assignment to teams
  assignmentsData.forEach(session => {
    const presenterTeam = getTeamNumber(session.presenter);
    const reviewerTeam = getTeamNumber(session.reviewer);
    const audienceTeam = getTeamNumber(session.audience);
    const feedbackTeam = getTeamNumber(session.feedback);

    teamAssignments[presenterTeam].push({
      session: session.session,
      role: 'Presenter',
      color: 'presenter'
    });
    teamAssignments[reviewerTeam].push({
      session: session.session,
      role: 'Reviewer',
      color: 'reviewer'
    });
    teamAssignments[audienceTeam].push({
      session: session.session,
      role: 'Audience',
      color: 'audience'
    });
    teamAssignments[feedbackTeam].push({
      session: session.session,
      role: 'Feedback',
      color: 'feedback'
    });
  });

  // Display team cards
  Object.keys(teamAssignments).forEach(teamNum => {
    const assignments = teamAssignments[teamNum];
    const card = document.createElement('div');
    card.className = 'team-assignment-card';

    const assignmentHTML = assignments
      .sort((a, b) => a.session - b.session)
      .map(a => {
        const sessionNum = String(a.session).padStart(2, '0');
        return `<div class="assignment-badge ${a.color}">
          Session ${sessionNum}: ${a.role}
        </div>`;
      })
      .join('');

    card.innerHTML = `
      <div class="team-assignment-header">Team ${teamNum}</div>
      <div class="team-assignment-roles">
        ${assignmentHTML}
      </div>
    `;
    container.appendChild(card);
  });
}

function getTeamNumber(team) {
  return teamsData.indexOf(team) + 1;
}

function downloadAssignmentsCSV() {
  if (assignmentsData.length === 0) return;

  let csv = 'Session,Presenter Team,Reviewer Team,Audience Team,Feedback Team\n';

  assignmentsData.forEach(session => {
    const presenterTeam = getTeamNumber(session.presenter);
    const reviewerTeam = getTeamNumber(session.reviewer);
    const audienceTeam = getTeamNumber(session.audience);
    const feedbackTeam = getTeamNumber(session.feedback);

    csv += `${session.session},Team ${presenterTeam},Team ${reviewerTeam},Team ${audienceTeam},Team ${feedbackTeam}\n`;
  });

  // Create and download file
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
  element.setAttribute('download', `assignments_${currentDept}_${currentBatch}.csv`);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function goBack() {
  window.location.href = getBaseUrl() + './teams.html';
}

function goBackToTeams() {
  sessionStorage.removeItem('teamsForAssignment');
  window.location.href = getBaseUrl() + './teams.html';
}

function goHome() {
  sessionStorage.removeItem('teamsForAssignment');
  window.location.href = getBaseUrl() + './index.html';
}

function goToDepartment() {
  sessionStorage.removeItem('teamsForAssignment');
  window.location.href = getBaseUrl() + './departments.html';
}

function handleLogout() {
  localStorage.removeItem('isLoggedIn');
  sessionStorage.removeItem('selectedDept');
  sessionStorage.removeItem('selectedBatch');
  sessionStorage.removeItem('generatedTeams');
  sessionStorage.removeItem('teamsForAssignment');
  window.location.href = getBaseUrl() + './index.html';
}
