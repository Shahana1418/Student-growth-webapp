// Team Formation Logic
// Rules:
// 1. Total teams divisible by 3
// 2. Team size: max 4, few can have 5, NO teams of 3
// 3. Gender balance: 50:50 (2M:2F), all one gender (4M/4F), NOT 1:3 or 3:1
// 4. Total teams <= 15

class TeamFormation {
  constructor(students) {
    this.students = students;
    this.maleStudents = students.filter(s => s.Gender === 'M');
    this.femaleStudents = students.filter(s => s.Gender === 'F');
    this.teams = [];
  }

  // Validate gender composition for a team
  isValidGenderComposition(maleCount, femaleCount) {
    const total = maleCount + femaleCount;

    // Allowed compositions:
    // Team of 2: 1M:1F (50:50), 2M:0F (100:0), 0M:2F (0:100)
    if (total === 2) {
      return (maleCount === 1 && femaleCount === 1) ||
             (maleCount === 2 && femaleCount === 0) ||
             (maleCount === 0 && femaleCount === 2);
    }

    // Team of 4: 2M:2F (50:50), 4M:0F (100:0), 0M:4F (0:100)
    if (total === 4) {
      return (maleCount === 2 && femaleCount === 2) ||
             (maleCount === 4 && femaleCount === 0) ||
             (maleCount === 0 && femaleCount === 4);
    }

    // Team of 5: 5M:0F (100:0), 0M:5F (0:100), 2M:3F (40:60), 3M:2F (60:40)
    if (total === 5) {
      return (maleCount === 5 && femaleCount === 0) ||
             (maleCount === 0 && femaleCount === 5) ||
             (maleCount === 2 && femaleCount === 3) ||
             (maleCount === 3 && femaleCount === 2);
    }

    return false;
  }

  // Generate teams
  generateTeams() {
    const totalStudents = this.students.length;

    // Try to find a valid team configuration
    // Start with minimum teams needed
    let minTeams = Math.ceil(totalStudents / 5);
    let maxTeams = Math.floor(totalStudents / 2);

    // Check divisible by 3
    for (let numTeams = minTeams; numTeams <= Math.min(maxTeams, 15); numTeams++) {
      if (numTeams % 3 === 0) {
        // Try to form numTeams teams
        const result = this.formTeamsWithCount(numTeams);
        if (result.success) {
          this.teams = result.teams;
          return { success: true, teams: this.teams };
        }
      }
    }

    return { success: false, error: 'Could not form valid teams with given constraints' };
  }

  // Try to form exactly numTeams teams
  formTeamsWithCount(numTeams) {
    const avgTeamSize = Math.ceil(this.students.length / numTeams);

    // Distribute students into teams with valid sizes
    const teamSizes = this.calculateTeamSizes(this.students.length, numTeams);
    if (!teamSizes) {
      return { success: false };
    }

    // Shuffle students for random distribution
    const shuffledMale = this.shuffleArray([...this.maleStudents]);
    const shuffledFemale = this.shuffleArray([...this.femaleStudents]);

    const teams = [];
    let maleIndex = 0;
    let femaleIndex = 0;

    for (let i = 0; i < numTeams; i++) {
      const targetSize = teamSizes[i];
      const team = { members: [], maleCount: 0, femaleCount: 0 };

      // Try different gender compositions
      let composed = false;

      // Try balanced compositions first
      if (targetSize === 2) {
        if (maleIndex < shuffledMale.length && femaleIndex < shuffledFemale.length) {
          team.members.push(shuffledMale[maleIndex++]);
          team.members.push(shuffledFemale[femaleIndex++]);
          composed = true;
        }
      } else if (targetSize === 4) {
        if (maleIndex + 1 < shuffledMale.length && femaleIndex + 1 < shuffledFemale.length) {
          team.members.push(shuffledMale[maleIndex++], shuffledMale[maleIndex++]);
          team.members.push(shuffledFemale[femaleIndex++], shuffledFemale[femaleIndex++]);
          composed = true;
        }
      } else if (targetSize === 5) {
        if (maleIndex + 2 < shuffledMale.length && femaleIndex + 2 < shuffledFemale.length) {
          team.members.push(shuffledMale[maleIndex++], shuffledMale[maleIndex++], shuffledMale[maleIndex++]);
          team.members.push(shuffledFemale[femaleIndex++], shuffledFemale[femaleIndex++]);
          composed = true;
        } else if (maleIndex + 1 < shuffledMale.length && femaleIndex + 2 < shuffledFemale.length) {
          team.members.push(shuffledMale[maleIndex++], shuffledMale[maleIndex++]);
          team.members.push(shuffledFemale[femaleIndex++], shuffledFemale[femaleIndex++], shuffledFemale[femaleIndex++]);
          composed = true;
        }
      }

      // If balanced composition not possible, try single gender
      if (!composed) {
        if (maleIndex < shuffledMale.length && team.members.length < targetSize) {
          while (team.members.length < targetSize && maleIndex < shuffledMale.length) {
            team.members.push(shuffledMale[maleIndex++]);
          }
          composed = true;
        }
        if (femaleIndex < shuffledFemale.length && team.members.length < targetSize) {
          while (team.members.length < targetSize && femaleIndex < shuffledFemale.length) {
            team.members.push(shuffledFemale[femaleIndex++]);
          }
        }
      }

      team.maleCount = team.members.filter(s => s.Gender === 'M').length;
      team.femaleCount = team.members.filter(s => s.Gender === 'F').length;

      // Validate gender composition
      if (!this.isValidGenderComposition(team.maleCount, team.femaleCount)) {
        return { success: false };
      }

      teams.push(team);
    }

    // Check if all students are assigned
    if (teams.reduce((sum, t) => sum + t.members.length, 0) !== this.students.length) {
      return { success: false };
    }

    return { success: true, teams };
  }

  // Calculate valid team sizes for given total students and number of teams
  calculateTeamSizes(totalStudents, numTeams) {
    // Valid team sizes: 2, 4, 5 (not 3)
    const sizes = [];
    let remaining = totalStudents;

    // Start with teams of 4
    let teamsOf4 = Math.floor(remaining / 4);
    let teamsOf5 = 0;
    let teamsOf2 = 0;

    for (let i = 0; i < numTeams; i++) {
      if (teamsOf4 > 0 && remaining >= 4) {
        sizes.push(4);
        teamsOf4--;
        remaining -= 4;
      } else if (remaining === 5) {
        sizes.push(5);
        teamsOf5++;
        remaining -= 5;
      } else if (remaining === 2) {
        sizes.push(2);
        teamsOf2++;
        remaining -= 2;
      } else if (remaining >= 5) {
        sizes.push(5);
        teamsOf5++;
        remaining -= 5;
      } else {
        return null; // Invalid configuration
      }
    }

    return remaining === 0 ? sizes : null;
  }

  // Shuffle array
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}

// Function to generate and display teams
function generateTeamsForBatch() {
  if (allStudents.length === 0) {
    alert('No students found to form teams');
    return;
  }

  const formation = new TeamFormation(allStudents);
  const result = formation.generateTeams();

  if (result.success) {
    // Store teams in session and navigate
    sessionStorage.setItem('generatedTeams', JSON.stringify({
      dept: currentDept,
      batch: currentBatch,
      teams: result.teams.map((team, idx) => ({
        teamNumber: idx + 1,
        members: team.members,
        maleCount: team.maleCount,
        femaleCount: team.femaleCount,
        size: team.members.length
      }))
    }));
    window.location.href = 'teams.html';
  } else {
    alert('Could not generate valid teams. Try with a different student group.');
  }
}
