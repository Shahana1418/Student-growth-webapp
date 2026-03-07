// Course Assignment Generation Logic
let courseData = null;
let generatedAssignments = [];
let currentStep = 1;

const ASSIGNMENT_TYPES = {
  'team-presentation': '🎤 Team Presentation',
  'mini-project': '🛠️ Mini Project',
  'lab': '🧪 Lab Assignment',
  'code-review': '👁️ Code Review'
};

const DIFFICULTY_LEVELS = {
  'easy': 'Easy',
  'medium': 'Medium',
  'hard': 'Hard'
};

// Load course data on page load
document.addEventListener('DOMContentLoaded', function() {
  loadCourseData();
  initializeStep1();
});

function loadCourseData() {
  const courseJSON = sessionStorage.getItem('selectedCourse');

  if (!courseJSON) {
    window.location.href = 'syllabus.html';
    return;
  }

  const data = JSON.parse(courseJSON);
  courseData = data;
}

function initializeStep1() {
  if (!courseData) return;

  document.getElementById('batchField').value = courseData.batch;
  document.getElementById('passingYearField').value = courseData.passingYear;
  document.getElementById('semesterField').value = `Semester ${courseData.semester}`;
  document.getElementById('courseNameField').value = courseData.course.name;
  document.getElementById('courseCodeField').value = courseData.course.code;
  document.getElementById('unitsField').value = courseData.course.units.length;
  document.getElementById('courseBreadcrumb').textContent = courseData.course.name;
  document.getElementById('courseNameDisplay').textContent = courseData.course.name;
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
  window.scrollTo(0, 0);
}

function generateAndDisplay() {
  // Get selected assignment types
  const types = [];
  document.querySelectorAll('.type-checkbox input[type="checkbox"]:checked').forEach(cb => {
    types.push(cb.value);
  });

  if (types.length === 0) {
    alert('Please select at least one assignment type');
    goToStep(2);
    return;
  }

  // Get difficulty distribution
  const difficultyDist = {
    easy: parseInt(document.getElementById('easyPercent').value) || 0,
    medium: parseInt(document.getElementById('mediumPercent').value) || 0,
    hard: parseInt(document.getElementById('hardPercent').value) || 0
  };

  // Validate distribution
  const total = difficultyDist.easy + difficultyDist.medium + difficultyDist.hard;
  if (total !== 100) {
    alert('Difficulty distribution must total 100%');
    return;
  }

  // Get timing settings
  const submissionDays = parseInt(document.getElementById('submissionDays').value) || 7;
  const reviewDays = parseInt(document.getElementById('reviewDays').value) || 3;

  // Generate assignments
  generatedAssignments = generateAssignmentsFromCourse(
    courseData.course,
    types,
    difficultyDist,
    submissionDays,
    reviewDays
  );

  // Display results
  displayAssignments();

  // Hide configuration and show results
  document.querySelector('.step-indicator').style.display = 'none';
  document.querySelectorAll('.step-content').forEach(el => {
    el.style.display = 'none';
  });
  document.getElementById('resultsSection').style.display = 'block';
  window.scrollTo(0, 0);
}

function generateAssignmentsFromCourse(course, types, difficultyDist, submissionDays, reviewDays) {
  const assignments = [];
  let assignmentId = 1;

  // Collect all topics from all units
  const allTopics = [];
  course.units.forEach((unit, unitIndex) => {
    unit.topics.forEach((topic, topicIndex) => {
      allTopics.push({
        unit: unit.unit,
        unitTitle: unit.title,
        topic: topic.name,
        content: topic.content
      });
    });
  });

  // Distribute difficulties
  const topicCount = allTopics.length;
  const easyCount = Math.ceil(topicCount * (difficultyDist.easy / 100));
  const mediumCount = Math.ceil(topicCount * (difficultyDist.medium / 100));
  const hardCount = topicCount - easyCount - mediumCount;

  const difficulties = [
    ...Array(easyCount).fill('easy'),
    ...Array(mediumCount).fill('medium'),
    ...Array(hardCount).fill('hard')
  ];

  // Create assignments for each topic
  allTopics.forEach((topicData, index) => {
    const difficulty = difficulties[index % difficulties.length];
    const typeIndex = index % types.length;
    const assignmentType = types[typeIndex];

    assignments.push({
      id: assignmentId++,
      unit: topicData.unit,
      unitTitle: topicData.unitTitle,
      topic: topicData.topic,
      type: assignmentType,
      typeDisplay: ASSIGNMENT_TYPES[assignmentType],
      difficulty: difficulty,
      description: generateAssignmentDescription(topicData, assignmentType, difficulty),
      deliverables: generateDeliverables(assignmentType),
      submissionDays: submissionDays,
      reviewDays: reviewDays,
      totalDays: submissionDays + reviewDays
    });
  });

  return assignments;
}

function generateAssignmentDescription(topicData, type, difficulty) {
  const descriptions = {
    'team-presentation': `Present and explain: "${topicData.topic}". Cover key concepts, real-world applications, and provide practical examples.`,
    'mini-project': `Develop a mini project demonstrating: "${topicData.topic}". Include design, implementation, and testing phases.`,
    'lab': `Conduct laboratory work on: "${topicData.topic}". Follow the provided lab manual and document observations.`,
    'code-review': `Review and analyze code samples related to: "${topicData.topic}". Provide detailed feedback on code quality and improvements.`
  };

  return descriptions[type] || `Assignment on: "${topicData.topic}"`;
}

function generateDeliverables(type) {
  const deliverables = {
    'team-presentation': ['Presentation slides', 'Handout/notes', 'Recorded video (optional)'],
    'mini-project': ['Source code', 'Documentation', 'Test cases', 'Demo video'],
    'lab': ['Lab report', 'Observations & findings', 'Data analysis', 'Conclusions'],
    'code-review': ['Review document', 'Code analysis', 'Improvement suggestions', 'Summary report']
  };

  return deliverables[type] || ['Main deliverable'];
}

function displayAssignments() {
  const assignmentsList = document.getElementById('assignmentsList');
  assignmentsList.innerHTML = '';

  generatedAssignments.forEach(assignment => {
    const card = document.createElement('div');
    card.className = `assignment-card difficulty-${assignment.difficulty}`;

    const deliverablesList = assignment.deliverables
      .map(d => `<li>${d}</li>`)
      .join('');

    card.innerHTML = `
      <div class="assignment-header">
        <div class="assignment-title">
          <span class="assignment-id">Assignment #${assignment.id}</span>
          <h3>${assignment.topic}</h3>
        </div>
        <div class="assignment-badges">
          <span class="type-badge">${assignment.typeDisplay}</span>
          <span class="difficulty-badge ${assignment.difficulty}">${DIFFICULTY_LEVELS[assignment.difficulty]}</span>
        </div>
      </div>

      <div class="assignment-unit">
        <strong>Unit ${assignment.unit}:</strong> ${assignment.unitTitle}
      </div>

      <div class="assignment-description">
        ${assignment.description}
      </div>

      <div class="assignment-deliverables">
        <h4>📋 Deliverables:</h4>
        <ul>
          ${deliverablesList}
        </ul>
      </div>

      <div class="assignment-timing">
        <div class="timing-item">
          <span class="timing-label">Submission</span>
          <span class="timing-value">${assignment.submissionDays} days</span>
        </div>
        <div class="timing-item">
          <span class="timing-label">Review</span>
          <span class="timing-value">${assignment.reviewDays} days</span>
        </div>
        <div class="timing-item">
          <span class="timing-label">Total</span>
          <span class="timing-value">${assignment.totalDays} days</span>
        </div>
      </div>
    `;

    assignmentsList.appendChild(card);
  });
}

function downloadAssignmentsCSV() {
  if (generatedAssignments.length === 0) return;

  let csv = 'Assignment ID,Unit,Unit Title,Topic,Type,Difficulty,Description,Deliverables,Submission Days,Review Days\n';

  generatedAssignments.forEach(assignment => {
    const deliverables = assignment.deliverables.join(' | ');
    const description = assignment.description.replace(/"/g, '""');

    csv += `${assignment.id},${assignment.unit},"${assignment.unitTitle}","${assignment.topic}","${assignment.typeDisplay}","${assignment.difficulty}","${description}","${deliverables}",${assignment.submissionDays},${assignment.reviewDays}\n`;
  });

  // Download file
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
  element.setAttribute('download', `assignments_${courseData.course.code}_${courseData.batch}.csv`);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
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

function goBackToSyllabus() {
  sessionStorage.removeItem('selectedCourse');
  window.location.href = 'syllabus.html';
}

function handleLogout() {
  localStorage.removeItem('isLoggedIn');
  sessionStorage.clear();
  window.location.href = 'index.html';
}
