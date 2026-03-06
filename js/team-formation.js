// Team Formation Logic - Phase 1
// Rules:
// 1. Total teams divisible by 3 (max 15 teams)
// 2. Team size: ONLY 4 or 5 (max 4, few teams can have 5, NO teams of 2 or 3)
// 3. Gender balance: 50:50 (2M:2F for size 4), balanced or all one for size 5
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

    if (total === 4) {
      // Team of 4: 2M:2F (50:50), or all one gender
      return (maleCount === 2 && femaleCount === 2) ||
             (maleCount === 4 && femaleCount === 0) ||
             (maleCount === 0 && femaleCount === 4);
    }

    if (total === 5) {
      // Team of 5: Try to balance, or all one gender
      // 3M:2F or 2M:3F preferred, but allow all one
      return (maleCount === 5 && femaleCount === 0) ||
             (maleCount === 0 && femaleCount === 5) ||
             (maleCount === 3 && femaleCount === 2) ||
             (maleCount === 2 && femaleCount === 3);
    }

    return false;
  }

  // Calculate valid team distributions
  // Returns array of team sizes (4 or 5) that sum to totalStudents
  calculateTeamDistribution(totalStudents, numTeams) {
    // Valid sizes: 4, 5 ONLY
    // Need: 4x + 5y = totalStudents where x + y = numTeams

    for (let num5 = 0; num5 <= numTeams; num5++) {
      const num4 = numTeams - num5;
      const total = (num4 * 4) + (num5 * 5);

      if (total === totalStudents) {
        const sizes = [];
        // Add teams of size 4 first, then 5
        for (let i = 0; i < num4; i++) sizes.push(4);
        for (let i = 0; i < num5; i++) sizes.push(5);
        return sizes;
      }
    }

    return null; // No valid distribution
  }

  // Generate teams
  generateTeams() {
    const totalStudents = this.students.length;

    // With sizes 4 and 5:
    // Min students per team = 4, so min teams = ceil(total/5)
    // Max students per team = 5, so max teams = floor(total/4)
    const minTeams = Math.ceil(totalStudents / 5);
    const maxTeams = Math.min(15, Math.floor(totalStudents / 4));

    console.log(`Generating teams for ${totalStudents} students (min: ${minTeams}, max: ${maxTeams})`);

    // Try each valid number of teams (divisible by 3)
    for (let numTeams = minTeams; numTeams <= maxTeams; numTeams++) {
      if (numTeams % 3 !== 0) continue; // Must be divisible by 3

      console.log(`Trying ${numTeams} teams...`);

      // Try to get valid distribution
      const teamSizes = this.calculateTeamDistribution(totalStudents, numTeams);
      if (teamSizes) {
        console.log(`Found valid distribution: ${teamSizes.join(', ')}`);

        // Try to form teams with this distribution
        const result = this.formTeamsWithSizes(teamSizes);
        if (result.success) {
          this.teams = result.teams;
          return { success: true, teams: this.teams };
        }
      }
    }

    return { success: false, error: 'No valid team configuration found for this group size' };
  }

  // Form teams with specified size distribution
  formTeamsWithSizes(teamSizes) {
    // Shuffle students for random distribution
    const shuffledMale = this.shuffleArray([...this.maleStudents]);
    const shuffledFemale = this.shuffleArray([...this.femaleStudents]);

    const teams = [];
    let maleIdx = 0;
    let femaleIdx = 0;

    // Form each team
    for (const size of teamSizes) {
      const team = { members: [], maleCount: 0, femaleCount: 0 };

      if (size === 4) {
        // Prefer 2M:2F balance
        if (maleIdx + 1 < shuffledMale.length && femaleIdx + 1 < shuffledFemale.length) {
          team.members.push(shuffledMale[maleIdx++]);
          team.members.push(shuffledMale[maleIdx++]);
          team.members.push(shuffledFemale[femaleIdx++]);
          team.members.push(shuffledFemale[femaleIdx++]);
        }
        // Otherwise try all one gender
        else if (maleIdx + 3 < shuffledMale.length) {
          team.members.push(shuffledMale[maleIdx++]);
          team.members.push(shuffledMale[maleIdx++]);
          team.members.push(shuffledMale[maleIdx++]);
          team.members.push(shuffledMale[maleIdx++]);
        }
        else if (femaleIdx + 3 < shuffledFemale.length) {
          team.members.push(shuffledFemale[femaleIdx++]);
          team.members.push(shuffledFemale[femaleIdx++]);
          team.members.push(shuffledFemale[femaleIdx++]);
          team.members.push(shuffledFemale[femaleIdx++]);
        }
        else {
          console.log('Not enough students for team of 4');
          return { success: false };
        }
      }
      else if (size === 5) {
        // Try 3M:2F first
        if (maleIdx + 2 < shuffledMale.length && femaleIdx + 1 < shuffledFemale.length) {
          team.members.push(shuffledMale[maleIdx++]);
          team.members.push(shuffledMale[maleIdx++]);
          team.members.push(shuffledMale[maleIdx++]);
          team.members.push(shuffledFemale[femaleIdx++]);
          team.members.push(shuffledFemale[femaleIdx++]);
        }
        // Then try 2M:3F
        else if (maleIdx + 1 < shuffledMale.length && femaleIdx + 2 < shuffledFemale.length) {
          team.members.push(shuffledMale[maleIdx++]);
          team.members.push(shuffledMale[maleIdx++]);
          team.members.push(shuffledFemale[femaleIdx++]);
          team.members.push(shuffledFemale[femaleIdx++]);
          team.members.push(shuffledFemale[femaleIdx++]);
        }
        // Otherwise try all one gender
        else if (maleIdx + 4 < shuffledMale.length) {
          for (let i = 0; i < 5; i++) {
            team.members.push(shuffledMale[maleIdx++]);
          }
        }
        else if (femaleIdx + 4 < shuffledFemale.length) {
          for (let i = 0; i < 5; i++) {
            team.members.push(shuffledFemale[femaleIdx++]);
          }
        }
        else {
          console.log('Not enough students for team of 5');
          return { success: false };
        }
      }

      // Count gender in team
      team.maleCount = team.members.filter(s => s.Gender === 'M').length;
      team.femaleCount = team.members.filter(s => s.Gender === 'F').length;

      // Validate gender composition
      if (!this.isValidGenderComposition(team.maleCount, team.femaleCount)) {
        console.log(`Invalid gender composition for team of ${size}: ${team.maleCount}M, ${team.femaleCount}F`);
        return { success: false };
      }

      teams.push(team);
    }

    // Verify all students are assigned
    const assignedCount = teams.reduce((sum, t) => sum + t.members.length, 0);
    if (assignedCount !== this.students.length) {
      console.log(`Student count mismatch: assigned ${assignedCount}, total ${this.students.length}`);
      return { success: false };
    }

    console.log(`✓ Successfully formed ${teams.length} teams`);
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
  console.log('=== Generating Teams ===');
  console.log('Total students:', allStudents.length);
  console.log('Males:', allStudents.filter(s => s.Gender === 'M').length);
  console.log('Females:', allStudents.filter(s => s.Gender === 'F').length);

  if (!allStudents || allStudents.length === 0) {
    alert('No students found. Please check the student roster.');
    return;
  }

  const formation = new TeamFormation(allStudents);
  const result = formation.generateTeams();

  if (result.success) {
    console.log('✓ Teams generated successfully');

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
    console.error('✗ Failed to generate teams:', result.error);
    alert('❌ Could not form teams!\n\n' + result.error + '\n\nCheck browser console (F12) for details.');
  }
}
