// PHASE 1: TEAM FORMATION - STRICT RULES IMPLEMENTATION
// Rule 1: Total teams MUST be divisible by 3 (3, 6, 9, 12, 15)
// Rule 2: Team size = MAX 4, few can have 5 (no size 2, 3, 6, 7...)
// Rule 3: Gender balance:
//   - 50:50 allowed (2M:2F for size 4)
//   - All one gender allowed (4M:0F, 0M:4F)
//   - 1:3 NOT allowed (1M:3F)
//   - 3:1 NOT allowed (3M:1F)
//   - 33:66 NOT allowed
//   - 66:33 NOT allowed
//   - 0:100 allowed (all female)
//   - 100:0 allowed (all male)
// Rule 4: Max 15 teams

class TeamFormation {
  constructor(students) {
    this.students = students;
    this.maleStudents = students.filter(s => s.Gender === 'M');
    this.femaleStudents = students.filter(s => s.Gender === 'F');
    this.teams = [];
  }

  isValidGenderComposition(maleCount, femaleCount) {
    const total = maleCount + femaleCount;

    // TEAM OF 4
    if (total === 4) {
      // Allowed: 2M:2F (50:50), 4M:0F (100:0), 0M:4F (0:100)
      // NOT allowed: 1M:3F (25:75), 3M:1F (75:25)
      return (maleCount === 2 && femaleCount === 2) ||
             (maleCount === 4 && femaleCount === 0) ||
             (maleCount === 0 && femaleCount === 4);
    }

    // TEAM OF 5
    if (total === 5) {
      // Allowed: 5M:0F, 0M:5F, 3M:2F (60:40), 2M:3F (40:60)
      // NOT allowed: 1M:4F (20:80), 4M:1F (80:20)
      return (maleCount === 5 && femaleCount === 0) ||
             (maleCount === 0 && femaleCount === 5) ||
             (maleCount === 3 && femaleCount === 2) ||
             (maleCount === 2 && femaleCount === 3);
    }

    return false;
  }

  calculateTeamSizes(totalStudents, numTeams) {
    // Need: 4x + 5y = totalStudents where x + y = numTeams
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

  planGenderDistribution(teamSizes, maleCount, femaleCount) {
    const num4 = teamSizes.filter(s => s === 4).length;
    const num5 = teamSizes.filter(s => s === 5).length;

    // Exhaustive search: try ALL valid combinations
    for (let t4_2m2f = 0; t4_2m2f <= num4; t4_2m2f++) {
      for (let t4_4m0f = 0; t4_4m0f <= num4 - t4_2m2f; t4_4m0f++) {
        const t4_0m4f = num4 - t4_2m2f - t4_4m0f;

        const m4 = (t4_2m2f * 2) + (t4_4m0f * 4) + (t4_0m4f * 0);
        const f4 = (t4_2m2f * 2) + (t4_4m0f * 0) + (t4_0m4f * 4);

        const mRemain = maleCount - m4;
        const fRemain = femaleCount - f4;

        if (mRemain < 0 || fRemain < 0) continue;

        // Try all size-5 combinations
        for (let t5_5m0f = 0; t5_5m0f <= num5; t5_5m0f++) {
          for (let t5_0m5f = 0; t5_0m5f <= num5 - t5_5m0f; t5_0m5f++) {
            for (let t5_3m2f = 0; t5_3m2f <= num5 - t5_5m0f - t5_0m5f; t5_3m2f++) {
              const t5_2m3f = num5 - t5_5m0f - t5_0m5f - t5_3m2f;

              const m5 = (t5_5m0f * 5) + (t5_3m2f * 3) + (t5_2m3f * 2) + (t5_0m5f * 0);
              const f5 = (t5_5m0f * 0) + (t5_3m2f * 2) + (t5_2m3f * 3) + (t5_0m5f * 5);

              if (m5 === mRemain && f5 === fRemain) {
                // FOUND VALID DISTRIBUTION
                const dist = [];
                for (let i = 0; i < t4_2m2f; i++) dist.push({ male: 2, female: 2 });
                for (let i = 0; i < t4_4m0f; i++) dist.push({ male: 4, female: 0 });
                for (let i = 0; i < t4_0m4f; i++) dist.push({ male: 0, female: 4 });
                for (let i = 0; i < t5_5m0f; i++) dist.push({ male: 5, female: 0 });
                for (let i = 0; i < t5_3m2f; i++) dist.push({ male: 3, female: 2 });
                for (let i = 0; i < t5_2m3f; i++) dist.push({ male: 2, female: 3 });
                for (let i = 0; i < t5_0m5f; i++) dist.push({ male: 0, female: 5 });
                return dist;
              }
            }
          }
        }
      }
    }

    return null;
  }

  assignStudentsToTeams(teamSizes, genderDistribution) {
    const shuffledMale = this.shuffleArray([...this.maleStudents]);
    const shuffledFemale = this.shuffleArray([...this.femaleStudents]);

    const teams = [];
    let maleIdx = 0;
    let femaleIdx = 0;

    for (let i = 0; i < teamSizes.length; i++) {
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
      teams.push(team);
    }

    return teams;
  }

  generateTeams() {
    const totalStudents = this.students.length;
    const maleCount = this.maleStudents.length;
    const femaleCount = this.femaleStudents.length;

    console.log(`\n📊 Students: ${totalStudents} (${maleCount}M, ${femaleCount}F)`);

    const minTeams = Math.ceil(totalStudents / 5);
    const maxTeams = Math.min(15, Math.floor(totalStudents / 4));

    console.log(`📌 Team range: ${minTeams}-${maxTeams}`);
    console.log(`✓ Valid counts (÷3): 3, 6, 9, 12, 15`);

    // Only try divisible by 3
    const validCounts = [3, 6, 9, 12, 15].filter(t => t >= minTeams && t <= maxTeams);

    if (validCounts.length === 0) {
      return { success: false, error: `No valid team count (divisible by 3) in range ${minTeams}-${maxTeams}` };
    }

    console.log(`🔍 Trying: ${validCounts.join(', ')}`);

    for (const numTeams of validCounts) {
      console.log(`\n  → Testing ${numTeams} teams...`);

      const teamSizes = this.calculateTeamSizes(totalStudents, numTeams);
      if (!teamSizes) {
        console.log(`    ✗ No valid size combo (4s and 5s)`);
        continue;
      }

      console.log(`    ✓ Sizes: ${teamSizes.filter(s => s === 4).length}×4 + ${teamSizes.filter(s => s === 5).length}×5`);

      const genderDist = this.planGenderDistribution(teamSizes, maleCount, femaleCount);
      if (!genderDist) {
        console.log(`    ✗ No valid gender distribution`);
        continue;
      }

      const teams = this.assignStudentsToTeams(teamSizes, genderDist);
      if (teams) {
        console.log(`    ✓ Students assigned successfully`);
        console.log(`\n✅ SUCCESS: ${numTeams} teams formed!`);
        this.teams = teams;
        return { success: true, teams: this.teams };
      }
    }

    return { success: false, error: `No valid combination found for ${totalStudents} students` };
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
  console.log('═════════════════════════════════════');
  console.log('  PHASE 1: TEAM GENERATION');
  console.log('═════════════════════════════════════');
  console.log(`📍 ${currentDept} - Batch ${currentBatch}`);

  if (!allStudents || allStudents.length === 0) {
    alert('❌ No students');
    return;
  }

  const formation = new TeamFormation(allStudents);
  const result = formation.generateTeams();

  console.log('═════════════════════════════════════');

  if (result.success) {
    console.log(`✅ TEAMS: ${result.teams.length}`);
    console.log('Team breakdown:');
    result.teams.forEach((t, i) => {
      console.log(`  T${i + 1}: ${t.maleCount}M + ${t.femaleCount}F = ${t.members.length} students`);
    });

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

    window.location.href = getBaseUrl() + './teams.html';
  } else {
    console.error(`❌ FAILED: ${result.error}`);
    alert(`❌ Error: ${result.error}\n\nCheck Console (F12)`);
  }
}
