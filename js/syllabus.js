// Syllabus and Curriculum Management
let curriculumData = {};
let selectedBatch = null;
let selectedSemester = null;
let selectedCourse = null;

// Load curriculum on page load
document.addEventListener('DOMContentLoaded', function() {
  loadCurriculum();
  populateBatchSelect();
});

function loadCurriculum() {
  fetch('data/curriculum.json')
    .then(response => response.json())
    .then(data => {
      curriculumData = data;
      console.log('Curriculum loaded:', curriculumData);
    })
    .catch(error => console.error('Error loading curriculum:', error));
}

function populateBatchSelect() {
  const batchSelect = document.getElementById('batchSelect');

  curriculumData.batches?.forEach(batch => {
    const option = document.createElement('option');
    option.value = batch.batch;
    option.textContent = `Batch ${batch.batch} (Passing Year: ${batch.passingYear})`;
    batchSelect.appendChild(option);
  });
}

function updateBatch() {
  const batch = document.getElementById('batchSelect').value;
  const semesterSelect = document.getElementById('semesterSelect');

  // Clear semester select
  semesterSelect.innerHTML = '<option value="">-- Select Semester --</option>';
  document.getElementById('passingYearField').value = '';
  document.getElementById('coursesSection').style.display = 'none';
  document.getElementById('courseDetailsSection').style.display = 'none';
  document.getElementById('emptyState').style.display = 'block';

  if (!batch) return;

  selectedBatch = curriculumData.batches.find(b => b.batch === batch);

  if (selectedBatch) {
    document.getElementById('passingYearField').value = selectedBatch.passingYear;

    selectedBatch.semesters.forEach(sem => {
      const option = document.createElement('option');
      option.value = sem.semester;
      option.textContent = `Semester ${sem.semester}`;
      semesterSelect.appendChild(option);
    });
  }
}

function updateSemester() {
  const semester = parseInt(document.getElementById('semesterSelect').value);

  document.getElementById('coursesSection').style.display = 'none';
  document.getElementById('courseDetailsSection').style.display = 'none';
  document.getElementById('emptyState').style.display = 'block';

  if (!semester || !selectedBatch) return;

  selectedSemester = selectedBatch.semesters.find(s => s.semester === semester);

  if (selectedSemester) {
    displayCourses();
  }
}

function displayCourses() {
  const coursesGrid = document.getElementById('coursesGrid');
  coursesGrid.innerHTML = '';

  selectedSemester.courses.forEach(course => {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.onclick = () => viewCourseDetails(course);

    card.innerHTML = `
      <div class="course-card-header">
        <h3>${course.name}</h3>
        <span class="course-code">${course.code}</span>
      </div>
      <div class="course-card-info">
        <span class="credits">Credits: ${course.credits}</span>
        <span class="units-count">${course.units.length} Units</span>
      </div>
    `;

    coursesGrid.appendChild(card);
  });

  document.getElementById('coursesSection').style.display = 'block';
  document.getElementById('emptyState').style.display = 'none';
  document.getElementById('courseDetailsSection').style.display = 'none';
}

function viewCourseDetails(course) {
  selectedCourse = course;

  // Display course header
  const courseHeader = document.getElementById('courseHeader');
  courseHeader.innerHTML = `
    <div class="course-info">
      <h2>${course.name}</h2>
      <div class="course-meta">
        <span class="code-badge">${course.code}</span>
        <span class="credits-badge">${course.credits} Credits</span>
      </div>
    </div>
  `;

  // Display objectives
  const objectivesList = document.getElementById('objectivesList');
  objectivesList.innerHTML = '';
  course.objectives.forEach(obj => {
    const li = document.createElement('li');
    li.textContent = obj;
    objectivesList.appendChild(li);
  });

  // Display outcomes
  const outcomesList = document.getElementById('outcomesList');
  outcomesList.innerHTML = '';
  course.outcomes.forEach(outcome => {
    const li = document.createElement('li');
    li.textContent = outcome;
    outcomesList.appendChild(li);
  });

  // Display units
  displayUnits(course.units);

  document.getElementById('courseDetailsSection').style.display = 'block';
  document.getElementById('coursesSection').style.display = 'none';
  window.scrollTo(0, 0);
}

function displayUnits(units) {
  const unitsSection = document.getElementById('unitsSection');
  unitsSection.innerHTML = '';

  const unitTitle = document.createElement('h4');
  unitTitle.innerHTML = '📚 Course Units & Topics';
  unitsSection.appendChild(unitTitle);

  units.forEach(unit => {
    const unitCard = document.createElement('div');
    unitCard.className = 'unit-card';

    let topicsHTML = '';
    unit.topics.forEach(topic => {
      topicsHTML += `
        <div class="topic">
          <div class="topic-name">${topic.name}</div>
          <div class="topic-content">${topic.content}</div>
        </div>
      `;
    });

    unitCard.innerHTML = `
      <div class="unit-header">
        <h5>Unit ${unit.unit}: ${unit.title}</h5>
        <span class="topic-count">${unit.topics.length} Topics</span>
      </div>
      <div class="topics-list">
        ${topicsHTML}
      </div>
    `;

    unitsSection.appendChild(unitCard);
  });
}

function backToCourses() {
  selectedCourse = null;
  document.getElementById('courseDetailsSection').style.display = 'none';
  document.getElementById('coursesSection').style.display = 'block';
  window.scrollTo(0, 0);
}

function goToAssignmentGeneration() {
  if (!selectedCourse) return;

  // Save course data to sessionStorage
  sessionStorage.setItem('selectedCourse', JSON.stringify({
    batch: selectedBatch.batch,
    passingYear: selectedBatch.passingYear,
    semester: selectedSemester.semester,
    course: selectedCourse
  }));

  window.location.href = getBaseUrl() + 'course-assignment.html';
}

function goBack() {
  window.location.href = getBaseUrl() + './index.html';
}

function handleLogout() {
  localStorage.removeItem('isLoggedIn');
  sessionStorage.clear();
  window.location.href = getBaseUrl() + './index.html';
}
