// Team Formation Logic - Phase 1
// Rules: Only sizes 4 & 5, divisible by 3 teams, gender balanced per rules

class TeamFormation {
  constructor(students) {
    this.students = students;
    this.maleStudents = students.filter(s => s.Gender === 'M');
    this.femaleStudents = students.filter(s => s.Gender === 'F');
    this.teams = [];
  }

  // Validate gender composition
  isValidGenderComposition(maleCount, femaleCount) {
    const total = maleCount + femaleCount;

    if (total === 4) {
      return (maleCount === 2 && femaleCount === 2) ||
             (maleCount === 4 && femaleCount === 0) ||
             (maleCount === 0 && femaleCount === 4);
    }

    if (total === 5) {
      return (maleCount === 5 && femaleCount === 0) ||
             (maleCount === 0 && femaleCount === 5) ||
             (maleCount === 3 && femaleCount === 2) ||
             (maleCount === 2 && femaleCount === 3);
    }

    return false;
  }

  // Calculate team size distribution
  calculateTeamSizes(totalStudents, numTeams) {
    // Find valid distribution: 4x + 5y = totalStudents where x + y = numTeams
    for (let num5 = 0; num5 <= numTeams; num5++) {
      const num4 = numTeams - num5;
      if ((num4 * 4) + (num5 * 5) === totalStudents) {
        const sizes = [];
        for (let i = 0; i < num4; i++) sizes.push(4);
        for (let i = 0; i < num5; i++) sizes.push(5);
        return sizes;
      }
    }
    return null;
  }

  // Plan gender distribution for teams
  planGenderDistribution(teamSizes, maleCount, femaleCount) {
    const distribution = [];
    let remainingMale = maleCount;
    let remainingFemale = femaleCount;

    for (const size of teamSizes) {
      let composition = null;

      if (size === 4) {
        // Try 2M:2F first if we have enough
        if (remainingMale >= 2 && remainingFemale >= 2) {
          composition = { male: 2, female: 2 };
        }
        // Try all one gender
        else if (remainingMale >= 4) {
          composition = { male: 4, female: 0 };
        }
        else if (remainingFemale >= 4) {
          composition = { male: 0, female: 4 };
        }
        else {
          return null; // Can't form valid team of 4
        }
      }
      else if (size === 5) {
        // Try 3M:2F first
        if (remainingMale >= 3 && remainingFemale >= 2) {
          composition = { male: 3, female: 2 };
        }
        // Try 2M:3F
        else if (remainingMale >= 2 && remainingFemale >= 3) {
          composition = { male: 2, female: 3 };
        }
        // Try all one gender
        else if (remainingMale >= 5) {
          composition = { male: 5, female: 0 };
        }
        else if (remainingFemale >= 5) {
          composition = { male: 0, female: 5 };
        }
        else {
          return null; // Can't form valid team of 5
        }
      }

      if (!composition) return null;

      distribution.push(composition);
      remainingMale -= composition.male;
      remainingFemale -= composition.female;
    }

    // Check if all students are allocated
    if (remainingMale === 0 && remainingFemale === 0) {
      return distribution;
    }

    return null;
  }

  // Assign actual students to teams based on planned distribution
  assignStudentsToTeams(teamSizes, genderDistribution) {
    // Shuffle students
    const shuffledMale = this.shuffleArray([...this.maleStudents]);
    const shuffledFemale = this.shuffleArray([...this.femaleStudents]);

    const teams = [];
    let maleIdx = 0;
    let femaleIdx = 0;

    for (let i = 0; i < teamSizes.length; i++) {
      const size = teamSizes[i];
      const composition = genderDistribution[i];
      const team = { members: [], maleCount: 0, femaleCount: 0 };

      // Add males
      for (let j = 0; j < composition.male; j++) {
        if (maleIdx < shuffledMale.length) {
          team.members.push(shuffledMale[maleIdx++]);
        }
      }

      // Add females
      for (let j = 0; j < composition.female; j++) {
        if (femaleIdx < shuffledFemale.length) {
          team.members.push(shuffledFemale[femaleIdx++]);
        }
      }

      team.maleCount = composition.male;
      team.femaleCount = composition.female;

      if (team.members.length !== size) {
        console.log(`Error: Team size mismatch. Expected ${size}, got ${team.members.length}`);
        return null;
      }

      teams.push(team);
    }

    return teams;
  }

  // Main generation logic
  generateTeams() {
    const totalStudents = this.students.length;
    const maleCount = this.maleStudents.length;
    const femaleCount = this.femaleStudents.length;

    console.log(`Attempting to generate teams...`);
    console.log(`Total: ${totalStudents} (${maleCount}M, ${femaleCount}F)`);

    const minTeams = Math.ceil(totalStudents / 5);
    const maxTeams = Math.min(15, Math.floor(totalStudents / 4));

    console.log(`Valid team range: ${minTeams} to ${maxTeams} teams (divisible by 3)`);

    // Try each valid number of teams
    for (let numTeams = minTeams; numTeams <= maxTeams; numTeams++) {
      if (numTeams % 3 !== 0) continue;

      console.log(`\nTrying ${numTeams} teams...`);

      // Get team size distribution
      const teamSizes = this.calculateTeamSizes(totalStudents, numTeams);
      if (!teamSizes) {
        console.log(`  No valid size distribution for ${numTeams} teams`);
        continue;
      }

      console.log(`  Size distribution: ${teamSizes.join(', ')}`);

      // Plan gender composition
      const genderDist = this.planGenderDistribution(teamSizes, maleCount, femaleCount);
      if (!genderDist) {
        console.log(`  Cannot distribute genders for ${numTeams} teams`);
        continue;
      }

      console.log(`  Gender distribution planned successfully`);

      // Assign students
      const teams = this.assignStudentsToTeams(teamSizes, genderDist);
      if (teams && teams.length === numTeams) {
        console.log(`✓ Successfully formed ${numTeams} teams!`);
        this.teams = teams;
        return { success: true, teams: this.teams };
      }
    }

    return { success: false, error: 'Could not find valid team configuration' };
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

// Generate teams function
function generateTeamsForBatch() {
  console.clear();
  console.log('=== TEAM GENERATION STARTED ===');
  console.log(`Students: ${allStudents.length}`);
  console.log(`Males: ${allStudents.filter(s => s.Gender === 'M').length}`);
  console.log(`Females: ${allStudents.filter(s => s.Gender === 'F').length}`);

  if (!allStudents || allStudents.length === 0) {
    alert('❌ No students found');
    return;
  }

  const formation = new TeamFormation(allStudents);
  const result = formation.generateTeams();

  console.log('\n=== RESULT ===');

  if (result.success) {
    console.log('✓ Teams generated successfully!');
    console.log(`Teams: ${result.teams.length}`);
    console.log('Team breakdown:', result.teams.map(t => `${t.maleCount}M:${t.femaleCount}F`).join(', '));

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
    console.error('✗ Team generation failed:', result.error);
    alert('❌ Could not generate valid teams\n\nOpen Console (F12) to see details');
  }
}
