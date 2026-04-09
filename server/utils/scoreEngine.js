const calculateScore = (studentSkills, companyEligibility) => {
  if (!companyEligibility || companyEligibility.length === 0) return 100;
  if (!studentSkills || studentSkills.length === 0) return 0;
  
  const studentSkillsLower = studentSkills.map(s => s.toLowerCase());
  const matchCount = companyEligibility.reduce((acc, skill) => {
    return studentSkillsLower.includes(skill.toLowerCase()) ? acc + 1 : acc;
  }, 0);
  
  return Math.round((matchCount / companyEligibility.length) * 100);
};

module.exports = { calculateScore };
