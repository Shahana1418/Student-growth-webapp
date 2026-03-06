// Quick diagnostic to check which batches can form valid teams divisible by 3

const batchData = {
  'ATE-2027': { total: 49, male: 43, female: 6 },
  'ATE-2028': { total: 58, male: 45, female: 13 },
  'ATE-2029': { total: 47, male: 38, female: 9 },
  'CSE-2027': { total: 64, male: 24, female: 40 },
  'CSE-2028': { total: 64, male: 32, female: 32 },
  'CSE-2029': { total: 57, male: 26, female: 31 },
  'CVE-2027': { total: 46, male: 27, female: 19 },
  'CVE-2028': { total: 60, male: 29, female: 31 },
  'CVE-2029': { total: 50, male: 18, female: 32 },
  'ECE-2027': { total: 61, male: 27, female: 34 },
  'ECE-2028': { total: 66, male: 0, female: 0 },
  'ECE-2029': { total: 56, male: 36, female: 20 },
  'EEE-2027': { total: 63, male: 41, female: 22 },
  'EEE-2028': { total: 62, male: 40, female: 22 },
  'EEE-2029': { total: 55, male: 25, female: 30 },
  'IMT-2027': { total: 61, male: 34, female: 27 },
  'IMT-2028': { total: 57, male: 29, female: 28 },
  'IMT-2029': { total: 55, male: 26, female: 29 },
  'MCE-2027': { total: 54, male: 48, female: 6 },
  'MCE-2028': { total: 59, male: 52, female: 7 },
  'MCE-2029': { total: 54, male: 47, female: 7 },
  'DSC-2029': { total: 56, male: 28, female: 28 }
};

console.log('═══════════════════════════════════════════════════════');
console.log('BATCH VALIDATION - Can form valid teams divisible by 3?');
console.log('═══════════════════════════════════════════════════════\n');

const validBatches = [];
const invalidBatches = [];

Object.entries(batchData).forEach(([batch, data]) => {
  const { total, male, female } = data;
  
  const minTeams = Math.ceil(total / 5);
  const maxTeams = Math.min(15, Math.floor(total / 4));
  
  // Check which divisible-by-3 counts are in valid range
  const validCounts = [3, 6, 9, 12, 15].filter(t => t >= minTeams && t <= maxTeams);
  
  // Check if any valid count has a valid size distribution (4x + 5y = total)
  let hasValidDistribution = false;
  let validTeamCount = null;
  
  for (const numTeams of validCounts) {
    for (let num5 = 0; num5 <= numTeams; num5++) {
      const num4 = numTeams - num5;
      if ((num4 * 4) + (num5 * 5) === total) {
        hasValidDistribution = true;
        validTeamCount = numTeams;
        break;
      }
    }
    if (hasValidDistribution) break;
  }
  
  const status = hasValidDistribution ? '✅ VALID' : '❌ INVALID';
  const details = hasValidDistribution 
    ? `${validTeamCount} teams`
    : `Range: ${minTeams}-${maxTeams}, No divisible-by-3 option`;
  
  console.log(`${batch.padEnd(12)} | ${total.toString().padEnd(3)} students | ${status} | ${details}`);
  
  if (hasValidDistribution) {
    validBatches.push(batch);
  } else {
    invalidBatches.push({ batch, total, minTeams, maxTeams, validCounts });
  }
});

console.log('\n═══════════════════════════════════════════════════════');
console.log(`✅ VALID BATCHES: ${validBatches.length}`);
console.log(`❌ INVALID BATCHES: ${invalidBatches.length}\n`);

if (invalidBatches.length > 0) {
  console.log('BATCHES THAT CANNOT FORM VALID TEAMS:');
  invalidBatches.forEach(b => {
    console.log(`\n${b.batch} (${b.total} students)`);
    console.log(`  Min teams needed: ${b.minTeams}`);
    console.log(`  Max teams allowed: ${b.maxTeams}`);
    console.log(`  Valid divisible-by-3 in range: ${b.validCounts.join(', ') || 'NONE'}`);
  });
}

console.log('\n═══════════════════════════════════════════════════════');
