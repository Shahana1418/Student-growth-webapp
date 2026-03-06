// Team Formation Logic - Phase 1
// STRICT REQUIREMENTS:
// 1. Total teams MUST be divisible by 3 (3, 6, 9, 12, 15 only) - NO EXCEPTIONS
// 2. Team sizes: ONLY 4 and 5 (max 4, few can have 5)
// 3. Gender balance: 50:50 (2M:2F), all one gender (4M/4F or 5M/5F)
//    NOT allowed: 1:3, 3:1, 33:67, 67:33
// 4. Max 15 teams

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
      // Team of 4: 2M:2F (50:50), 4M:0F, 0M:4F
      return (maleCount === 2 && femaleCount === 2) ||
             (maleCount === 4 && femaleCount === 0) ||
             (maleCount === 0 && femaleCount === 4);
    }

    if (total === 5) {
      // Team of 5: 3M:2F, 2M:3F, 5M:0F, 0M:5F
      return (maleCount === 3 && femaleCount === 2) ||
             (maleCount === 2 && femaleCount === 3) ||
             (maleCount === 5 && femaleCount === 0) ||
             (maleCount === 0 && femaleCount === 5);
    }

    return false;
  }

  calculateTeamSizes(totalStudents, numTeams) {
    // Find: 4x + 5y = totalStudents where x + y = numTeams
    for (let num5 = 0; num5 <= numTeams; num5++) {
      const num4 = numTeams - num5;
      if ((num4 * 4) + (num5 * 5) === totalStudents) {
        const sizes = [];
        for (let i = 0; i < num4; i++) sizes.push(4);
        for (let i = 0; i < num5; i++) sizes.push(5);
        console.log(`    ✓ Size distribution: ${num4}×[4] + ${num5}×[5]`);
        return sizes;
      }
    }
    return null;
  }

  planGenderDistribution(teamSizes, maleCount, femaleCount) {
    console.log(`  Planning gender distribution (${maleCount}M, ${femaleCount}F)...`);

    const num4 = teamSizes.filter(s => s === 4).length;
    const num5 = teamSizes.filter(s => s === 5).length;

    // Try all combinations
    for (let t4_2m2f = 0; t4_2m2f <= num4; t4_2m2f++) {
      for (let t4_4m0f = 0; t4_4m0f <= num4 - t4_2m2f; t4_4m0f++) {
        const t4_0m4f = num4 - t4_2m2f - t4_4m0f;

        const m4 = (t4_2m2f * 2) + (t4_4m0f * 4);
        const f4 = (t4_2m2f * 2) + (t4_0m4f * 4);

        const mRemain = maleCount - m4;
        const fRemain = femaleCount - f4;

        if (mRemain < 0 || fRemain < 0) continue;

        // Try size-5 combinations
        for (let t5_3m2f = 0; t5_3m2f <= num5; t5_3m2f++) {
          for (let t5_2m3f = 0; t5_2m3f <= num5 - t5_3m2f; t5_2m3f++) {
            for (let t5_5m0f = 0; t5_5m0f <= num5 - t5_3m2f - t5_2m3f; t5_5m0f++) {
              const t5_0m5f = num5 - t5_3m2f - t5_2m3f - t5_5m0f;

              const m5 = (t5_3m2f * 3) + (t5_2m3f * 2) + (t5_5m0f * 5);
              const f5 = (t5_3m2f * 2) + (t5_2m3f * 3) + (t5_0m5f * 5);

              if (m5 === mRemain && f5 === fRemain) {
                console.log(`    ✓ Valid distribution found!`);
                const dist = [];
                for (let i = 0; i < t4_2m2f; i++) dist.push({ male: 2, female: 2 });
                for (let i = 0; i < t4_4m0f; i++) dist.push({ male: 4, female: 0 });
                for (let i = 0; i < t4_0m4f; i++) dist.push({ male: 0, female: 4 });
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

    console.log(`    ✗ No valid gender distribution`);
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

      for (let j = 0; j < composition.male; j++) {
        if (maleIdx < shuffledMale.length) {
          team.members.push(shuffledMale[maleIdx++]);
        }
      }

      for (let j = 0; j < composition.female; j++) {
        if (femaleIdx < shuffledFemale.length) {
          team.members.push(shuffledFemale[femaleIdx++]);
        }
      }

      team.maleCount = composition.male;
      team.femaleCount = composition.female;

      if (team.members.length !== size) {
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

    console.log(`\n=== Generating Teams ===`);
    console.log(`Total students: ${totalStudents} (${maleCount}M, ${femaleCount}F)`);

    const minTeams = Math.ceil(totalStudents / 5);
    const maxTeams = Math.min(15, Math.floor(totalStudents / 4));

    console.log(`Team range: ${minTeams}-${maxTeams} (divisible by 3 only: 3,6,9,12,15)`);

    // ONLY try teams divisible by 3 - NO EXCEPTIONS
    const validTeamCounts = [3, 6, 9, 12, 15].filter(
      t => t >= minTeams && t <= maxTeams
    );

    if (validTeamCounts.length === 0) {
      console.log(`✗ No valid team count (divisible by 3) in range ${minTeams}-${maxTeams}`);
      return {
        success: false,
        error: `Batch size ${totalStudents} cannot form teams divisible by 3. Valid: 3,6,9,12,15.`
      };
    }

    console.log(`Trying team counts: ${validTeamCounts.join(', ')}`);

    // Try each valid count
    for (const numTeams of validTeamCounts) {
      console.log(`\nTrying ${numTeams} teams...`);

      const teamSizes = this.calculateTeamSizes(totalStudents, numTeams);
      if (!teamSizes) {
        console.log(`  ✗ No valid size distribution for ${numTeams} teams`);
        continue;
      }

      const genderDist = this.planGenderDistribution(teamSizes, maleCount, femaleCount);
      if (!genderDist) {
        console.log(`  ✗ Cannot distribute genders for ${numTeams} teams`);
        continue;
      }

      const teams = this.assignStudentsToTeams(teamSizes, genderDist);
      if (teams && teams.length === numTeams) {
        console.log(`✓ SUCCESS: ${numTeams} teams formed!`);
        console.log(`Breakdown:`, teams.map((t, i) => `T${i+1}(${t.maleCount}M:${t.femaleCount}F)`).join(', '));
        this.teams = teams;
        return { success: true, teams: this.teams };
      }
    }

    return {
      success: false,
      error: `Cannot form valid teams divisible by 3 for ${totalStudents} students`
    };
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
  console.log('╔════════════════════════════════════╗');
  console.log('║  PHASE 1: TEAM FORMATION START     ║');
  console.log('╚════════════════════════════════════╝');
  console.log(`Department: ${currentDept} | Batch: ${currentBatch}`);
  console.log(`Students: ${allStudents.length}`);
  console.log(`Males: ${allStudents.filter(s => s.Gender === 'M').length}`);
  console.log(`Females: ${allStudents.filter(s => s.Gender === 'F').length}`);

  if (!allStudents || allStudents.length === 0) {
    alert('❌ No students found');
    return;
  }

  const formation = new TeamFormation(allStudents);
  const result = formation.generateTeams();

  console.log('\n╔════════════════════════════════════╗');
  console.log('║           FINAL RESULT             ║');
  console.log('╚════════════════════════════════════╝');

  if (result.success) {
    console.log('✅ TEAMS GENERATED SUCCESSFULLY!');
    console.log(`Total teams: ${result.teams.length} (divisible by 3 ✓)`);

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
    console.error('❌ FAILED:', result.error);
    alert(`❌ Cannot form teams\n\n${result.error}\n\nCheck console (F12) for details`);
  }
}
