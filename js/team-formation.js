// Team Formation Logic - Phase 1
// Rules:
// 1. Total teams divisible by 3 (max 15 teams)
// 2. Team size: 2, 4, or 5 (NO teams of 3)
// 3. Gender balance: 50:50 (2M:2F), all one gender, NOT 1:3 or 3:1
// 4. Valid sizes: Team of 2 (1M:1F or all one), Team of 4 (2M:2F or all one), Team of 5 (balanced or all one)

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

    if (total === 2) {
      // Team of 2: 1M:1F (50:50), or all one gender
      return (maleCount === 1 && femaleCount === 1) ||
             (maleCount === 2 && femaleCount === 0) ||
             (maleCount === 0 && femaleCount === 2);
    }

    if (total === 4) {
      // Team of 4: 2M:2F (50:50), or all one gender
      return (maleCount === 2 && femaleCount === 2) ||
             (maleCount === 4 && femaleCount === 0) ||
             (maleCount === 0 && femaleCount === 4);
    }

    if (total === 5) {
      // Team of 5: all one gender (safest), or 2M:3F / 3M:2F
      return (maleCount === 5 && femaleCount === 0) ||
             (maleCount === 0 && femaleCount === 5) ||
             (maleCount === 2 && femaleCount === 3) ||
             (maleCount === 3 && femaleCount === 2);
    }

    return false;
  }

  // Calculate valid team size distributions
  // Returns array of team sizes that sum to totalStudents with numTeams teams
  calculateTeamDistribution(totalStudents, numTeams) {
    // Valid sizes: 2, 4, 5
    // Need: sum of sizes = totalStudents, count = numTeams

    const solutions = [];

    // Try all combinations of num2, num4, num5
    for (let num5 = 0; num5 <= numTeams; num5++) {
      for (let num4 = 0; num4 <= numTeams - num5; num4++) {
        const num2 = numTeams - num5 - num4;
        if (num2 >= 0) {
          const total = (num5 * 5) + (num4 * 4) + (num2 * 2);
          if (total === totalStudents) {
            const sizes = [];
            for (let i = 0; i < num5; i++) sizes.push(5);
            for (let i = 0; i < num4; i++) sizes.push(4);
            for (let i = 0; i < num2; i++) sizes.push(2);
            return sizes;
          }
        }
      }
    }

    return null; // No valid distribution found
  }

  // Generate teams
  generateTeams() {
    const totalStudents = this.students.length;

    // Calculate valid number of teams (divisible by 3, max 15)
    const minTeams = Math.max(3, Math.ceil(totalStudents / 5)); // At least 3, at least enough for all students
    const maxTeams = Math.min(15, Math.floor(totalStudents / 2)); // Max 15, max teams needed

    // Try each valid number of teams (divisible by 3)
    for (let numTeams = minTeams; numTeams <= maxTeams; numTeams++) {
      if (numTeams % 3 !== 0) continue; // Must be divisible by 3

      // Try to get valid distribution
      const teamSizes = this.calculateTeamDistribution(totalStudents, numTeams);
      if (teamSizes) {
        // Try to form teams with this distribution
        const result = this.formTeamsWithSizes(teamSizes);
        if (result.success) {
          this.teams = result.teams;
          return { success: true, teams: this.teams };
        }
      }
    }

    return { success: false, error: 'Could not form valid teams with the given students' };
  }

  // Form teams with specified size distribution
  formTeamsWithSizes(teamSizes) {
    // Shuffle students
    const shuffledMale = this.shuffleArray([...this.maleStudents]);
    const shuffledFemale = this.shuffleArray([...this.femaleStudents]);

    const teams = [];
    let maleIdx = 0;
    let femaleIdx = 0;

    // Try to form each team
    for (const size of teamSizes) {
      const team = { members: [], maleCount: 0, femaleCount: 0 };

      if (size === 2) {
        // Prefer 1M:1F, but allow all one gender
        if (maleIdx < shuffledMale.length && femaleIdx < shuffledFemale.length) {
          team.members.push(shuffledMale[maleIdx++]);
          team.members.push(shuffledFemale[femaleIdx++]);
        } else if (maleIdx < shuffledMale.length) {
          team.members.push(shuffledMale[maleIdx++]);
          team.members.push(shuffledMale[maleIdx++]);
        } else if (femaleIdx < shuffledFemale.length) {
          team.members.push(shuffledFemale[femaleIdx++]);
          team.members.push(shuffledFemale[femaleIdx++]);
        } else {
          return { success: false }; // Not enough students
        }
      } else if (size === 4) {
        // Prefer 2M:2F, but allow all one gender
        if (maleIdx + 1 < shuffledMale.length && femaleIdx + 1 < shuffledFemale.length) {
          team.members.push(shuffledMale[maleIdx++]);
          team.members.push(shuffledMale[maleIdx++]);
          team.members.push(shuffledFemale[femaleIdx++]);
          team.members.push(shuffledFemale[femaleIdx++]);
        } else if (maleIdx + 3 < shuffledMale.length) {
          team.members.push(shuffledMale[maleIdx++]);
          team.members.push(shuffledMale[maleIdx++]);
          team.members.push(shuffledMale[maleIdx++]);
          team.members.push(shuffledMale[maleIdx++]);
        } else if (femaleIdx + 3 < shuffledFemale.length) {
          team.members.push(shuffledFemale[femaleIdx++]);
          team.members.push(shuffledFemale[femaleIdx++]);
          team.members.push(shuffledFemale[femaleIdx++]);
          team.members.push(shuffledFemale[femaleIdx++]);
        } else {
          return { success: false };
        }
      } else if (size === 5) {
        // Try 3M:2F first, then 2M:3F, then all one gender
        if (maleIdx + 2 < shuffledMale.length && femaleIdx + 1 < shuffledFemale.length) {
          team.members.push(shuffledMale[maleIdx++]);
          team.members.push(shuffledMale[maleIdx++]);
          team.members.push(shuffledMale[maleIdx++]);
          team.members.push(shuffledFemale[femaleIdx++]);
          team.members.push(shuffledFemale[femaleIdx++]);
        } else if (maleIdx + 1 < shuffledMale.length && femaleIdx + 2 < shuffledFemale.length) {
          team.members.push(shuffledMale[maleIdx++]);
          team.members.push(shuffledMale[maleIdx++]);
          team.members.push(shuffledFemale[femaleIdx++]);
          team.members.push(shuffledFemale[femaleIdx++]);
          team.members.push(shuffledFemale[femaleIdx++]);
        } else if (maleIdx + 4 < shuffledMale.length) {
          team.members.push(shuffledMale[maleIdx++]);
          team.members.push(shuffledMale[maleIdx++]);
          team.members.push(shuffledMale[maleIdx++]);
          team.members.push(shuffledMale[maleIdx++]);
          team.members.push(shuffledMale[maleIdx++]);
        } else if (femaleIdx + 4 < shuffledFemale.length) {
          team.members.push(shuffledFemale[femaleIdx++]);
          team.members.push(shuffledFemale[femaleIdx++]);
          team.members.push(shuffledFemale[femaleIdx++]);
          team.members.push(shuffledFemale[femaleIdx++]);
          team.members.push(shuffledFemale[femaleIdx++]);
        } else {
          return { success: false };
        }
      }

      // Count gender in team
      team.maleCount = team.members.filter(s => s.Gender === 'M').length;
      team.femaleCount = team.members.filter(s => s.Gender === 'F').length;

      // Validate gender composition
      if (!this.isValidGenderComposition(team.maleCount, team.femaleCount)) {
        return { success: false };
      }

      teams.push(team);
    }

    // Verify all students are assigned
    const assignedCount = teams.reduce((sum, t) => sum + t.members.length, 0);
    if (assignedCount !== this.students.length) {
      return { success: false };
    }

    return { success: true, teams };
  }

  // Shuffle array using Fisher-Yates
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}

// Main function to generate and display teams
function generateTeamsForBatch() {
  console.log('Generating teams for students:', allStudents.length);

  if (!allStudents || allStudents.length === 0) {
    alert('No students found. Please check the student roster.');
    return;
  }

  const formation = new TeamFormation(allStudents);
  const result = formation.generateTeams();

  console.log('Team generation result:', result);

  if (result.success) {
    console.log('Teams formed successfully:', result.teams.length);

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
    console.error('Failed to generate teams:', result.error);
    alert('⚠️ Could not generate teams: ' + result.error + '\n\nPlease check console for details.');
  }
}
