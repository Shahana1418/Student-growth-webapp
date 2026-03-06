// Team Formation Logic - Phase 1
// Rules: Only sizes 4 & 5, gender balanced per rules

class TeamFormation {
  constructor(students) {
    this.students = students;
    this.maleStudents = students.filter(s => s.Gender === 'M');
    this.femaleStudents = students.filter(s => s.Gender === 'F');
    this.teams = [];
  }

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

  calculateTeamSizes(totalStudents, numTeams) {
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

  // Smart gender distribution planner
  planGenderDistribution(teamSizes, maleCount, femaleCount) {
    const distribution = [];

    // Count teams of each size
    const num4 = teamSizes.filter(s => s === 4).length;
    const num5 = teamSizes.filter(s => s === 5).length;

    console.log(`Planning distribution: ${num4} teams of 4, ${num5} teams of 5`);
    console.log(`Available: ${maleCount}M, ${femaleCount}F`);

    // Try to find a valid allocation
    // For size 4: can be (2M:2F), (4M:0F), (0M:4F)
    // For size 5: can be (3M:2F), (2M:3F), (5M:0F), (0M:5F)

    // Try all combinations of size-4 team compositions
    for (let t4_2m2f = 0; t4_2m2f <= num4; t4_2m2f++) {
      for (let t4_4m0f = 0; t4_4m0f <= num4 - t4_2m2f; t4_4m0f++) {
        const t4_0m4f = num4 - t4_2m2f - t4_4m0f;

        // Calculate males/females used by size-4 teams
        const m4 = (t4_2m2f * 2) + (t4_4m0f * 4) + (t4_0m4f * 0);
        const f4 = (t4_2m2f * 2) + (t4_4m0f * 0) + (t4_0m4f * 4);

        // Remaining for size-5 teams
        const mRemain = maleCount - m4;
        const fRemain = femaleCount - f4;

        if (mRemain < 0 || fRemain < 0) continue;

        // Try all combinations of size-5 team compositions
        for (let t5_3m2f = 0; t5_3m2f <= num5; t5_3m2f++) {
          for (let t5_2m3f = 0; t5_2m3f <= num5 - t5_3m2f; t5_2m3f++) {
            for (let t5_5m0f = 0; t5_5m0f <= num5 - t5_3m2f - t5_2m3f; t5_5m0f++) {
              const t5_0m5f = num5 - t5_3m2f - t5_2m3f - t5_5m0f;

              // Calculate males/females used by size-5 teams
              const m5 = (t5_3m2f * 3) + (t5_2m3f * 2) + (t5_5m0f * 5) + (t5_0m5f * 0);
              const f5 = (t5_3m2f * 2) + (t5_2m3f * 3) + (t5_5m0f * 0) + (t5_0m5f * 5);

              // Check if this allocation works
              if (m5 === mRemain && f5 === fRemain) {
                console.log(`✓ Found valid distribution!`);
                console.log(`  Size 4: ${t4_2m2f}×(2M:2F) + ${t4_4m0f}×(4M:0F) + ${t4_0m4f}×(0M:4F)`);
                console.log(`  Size 5: ${t5_3m2f}×(3M:2F) + ${t5_2m3f}×(2M:3F) + ${t5_5m0f}×(5M:0F) + ${t5_0m5f}×(0M:5F)`);

                // Build the distribution array
                const dist = [];
                // Size 4 teams
                for (let i = 0; i < t4_2m2f; i++) dist.push({ male: 2, female: 2 });
                for (let i = 0; i < t4_4m0f; i++) dist.push({ male: 4, female: 0 });
                for (let i = 0; i < t4_0m4f; i++) dist.push({ male: 0, female: 4 });
                // Size 5 teams
                for (let i = 0; i < t5_3m2f; i++) dist.push({ male: 3, female: 2 });
                for (let i = 0; i < t5_2m3f; i++) dist.push({ male: 2, female: 3 });
                for (let i = 0; i < t5_5m0f; i++) dist.push({ male: 5, female: 0 });
                for (let i = 0; i < t5_0m5f; i++) dist.push({ male: 0, female: 5 });

                return dist;
              }
            }
          }
        }
      }
    }

    console.log(`✗ Could not find valid gender distribution`);
    return null;
  }

  assignStudentsToTeams(teamSizes, genderDistribution) {
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
        console.log(`Error: Team size mismatch`);
        return null;
      }

      teams.push(team);
    }

    return teams;
  }

  generateTeams() {
    const totalStudents = this.students.length;
    const maleCount = this.maleStudents.length;
    const femaleCount = this.femaleStudents.length;

    console.log(`Attempting to generate teams...`);
    console.log(`Total: ${totalStudents} (${maleCount}M, ${femaleCount}F)`);

    const minTeams = Math.ceil(totalStudents / 5);
    const maxTeams = Math.min(15, Math.floor(totalStudents / 4));

    console.log(`Valid team range: ${minTeams} to ${maxTeams} teams`);

    // First pass: divisible by 3
    console.log(`\nFirst pass: Looking for teams divisible by 3...`);
    for (let numTeams = minTeams; numTeams <= maxTeams; numTeams++) {
      if (numTeams % 3 !== 0) continue;
      const result = this.tryFormTeams(numTeams, totalStudents, maleCount, femaleCount);
      if (result.success) return result;
    }

    // Second pass: any valid configuration
    console.log(`\nSecond pass: Looking for ANY valid team configuration...`);
    for (let numTeams = minTeams; numTeams <= maxTeams; numTeams++) {
      if (numTeams % 3 === 0) continue;
      const result = this.tryFormTeams(numTeams, totalStudents, maleCount, femaleCount);
      if (result.success) {
        console.warn(`⚠️ Note: ${numTeams} teams (not divisible by 3)`);
        return result;
      }
    }

    return { success: false, error: 'Could not find valid team configuration' };
  }

  tryFormTeams(numTeams, totalStudents, maleCount, femaleCount) {
    console.log(`\nTrying ${numTeams} teams...`);

    const teamSizes = this.calculateTeamSizes(totalStudents, numTeams);
    if (!teamSizes) {
      console.log(`  No valid size distribution`);
      return { success: false };
    }

    console.log(`  Sizes: ${teamSizes.join(', ')}`);

    const genderDist = this.planGenderDistribution(teamSizes, maleCount, femaleCount);
    if (!genderDist) {
      console.log(`  Cannot distribute genders`);
      return { success: false };
    }

    const teams = this.assignStudentsToTeams(teamSizes, genderDist);
    if (teams && teams.length === numTeams) {
      console.log(`✓ Successfully formed ${numTeams} teams!`);
      this.teams = teams;
      return { success: true, teams: this.teams };
    }

    return { success: false };
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}

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
    alert('❌ Could not generate valid teams\n\nCheck Console (F12) for details');
  }
}
