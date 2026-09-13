import { contentRepository } from '../lib/contentRepository';

async function runTests() {
  console.log('====================================================');
  console.log('STARTING COMPLETE CMS VALIDATION SUITE');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, msg: string) {
    if (condition) {
      console.log(`[PASS] ${msg}`);
      passed++;
    } else {
      console.error(`[FAIL] ${msg}`);
      failed++;
    }
  }

  // 1. Projects Verification
  console.log('--- Scenario 1: Projects CMS ---');
  const initialProjects = contentRepository.getProjects({ includeDrafts: true });
  assert(initialProjects.length >= 4, `Initial projects count is ${initialProjects.length}`);
  const newProj = contentRepository.createProject({
    title: 'Autonomous Rover Telemetry',
    category: 'EMBEDDED',
    categories: ['EMBEDDED'],
    domain: 'Robotics & Hardware',
    shortDescription: 'Autonomous rover real-time navigation telemetry dashboard.',
    fullDescription: 'Long architecture description for rover.',
    technologies: ['C++', 'FreeRTOS', 'Next.js'],
    features: ['Obstacle avoidance', 'Telemetry streaming'],
    images: { main: '/media/projects/rover/main.webp', gallery: [] },
    year: '2026',
    status: 'Active',
    isPublished: true,
  });
  assert(newProj.id.startsWith('project_'), `New project assigned permanent ID: ${newProj.id}`);
  const projAfterAdd = contentRepository.getProjects({ includeDrafts: true });
  assert(projAfterAdd.some((p) => p.id === newProj.id), 'New project found in collection');
  contentRepository.deleteProject(newProj.id);
  const projAfterDel = contentRepository.getProjects({ includeDrafts: true });
  assert(!projAfterDel.some((p) => p.id === newProj.id), 'Deleted project successfully removed');
  const anotherProj = contentRepository.createProject({
    title: 'Second Test Project',
    category: 'SOFTWARE',
    categories: ['SOFTWARE'],
    domain: 'Software',
    shortDescription: 'Test short description',
    fullDescription: 'Test full description',
    technologies: ['TypeScript'],
    features: ['Feature 1'],
    images: { main: '', gallery: [] },
    year: '2026',
    status: 'Active',
  });
  assert(anotherProj.id !== newProj.id, `Retired ID ${newProj.id} was NOT reused (new ID is ${anotherProj.id})`);
  contentRepository.deleteProject(anotherProj.id);

  // 2. Certificates Verification
  console.log('\n--- Scenario 2: Certificates CMS ---');
  const initialCerts = contentRepository.getCertificates({ includeDrafts: true });
  assert(initialCerts.length >= 10, `Initial certificates count is ${initialCerts.length}`);
  const newCert = contentRepository.createCertificate({
    title: 'Robotics Microcontroller Specialist',
    issuer: 'IEEE Robotics Society',
    category: 'Embedded Systems, Automotive & IoT',
    date: '2026',
    description: 'Hardware timers, interrupts, and CAN bus protocols.',
    skills: ['Embedded C', 'CAN Bus'],
    image: '/media/certificates/ieee.jpeg',
    isPublished: true,
  });
  assert(newCert.id.startsWith('cert_'), `New cert assigned permanent ID: ${newCert.id}`);
  contentRepository.deleteCertificate(newCert.id);
  const certAfterDel = contentRepository.getCertificates({ includeDrafts: true });
  assert(!certAfterDel.some((c) => c.id === newCert.id), 'Deleted cert successfully removed');
  const secondCert = contentRepository.createCertificate({
    title: 'Advanced AI Engineer',
    issuer: 'DeepLearning.AI',
    category: 'Artificial Intelligence & Machine Learning',
    date: '2026',
    description: 'Generative AI and Agent workflows.',
    skills: ['LLMs', 'Prompt Engineering'],
    image: '/media/certificates/deeplearning.jpeg',
  });
  assert(secondCert.id !== newCert.id, `Retired cert ID ${newCert.id} was NOT reused (assigned ${secondCert.id})`);
  contentRepository.deleteCertificate(secondCert.id);

  // 3. Skills Matrix Verification
  console.log('\n--- Scenario 3: Skills CMS ---');
  const initialSkills = contentRepository.getSkills({ includeDrafts: true });
  assert(initialSkills.length >= 12, `Initial skills count is ${initialSkills.length}`);
  const newSkill = contentRepository.createSkill({
    name: 'Rust Systems Programming',
    category: 'Programming & Logic',
    proficiency: 80,
    connectedIds: [],
    isPublished: true,
  });
  assert(newSkill.id.startsWith('skill_'), `New skill assigned permanent ID: ${newSkill.id}`);
  contentRepository.updateSkill(newSkill.id, { proficiency: 92 });
  const updatedSkill = contentRepository.getSkillById(newSkill.id);
  assert(updatedSkill?.proficiency === 92, 'Skill proficiency updated to 92%');
  contentRepository.deleteSkill(newSkill.id);
  const skillsAfterDel = contentRepository.getSkills({ includeDrafts: true });
  assert(!skillsAfterDel.some((s) => s.id === newSkill.id), 'Deleted skill removed from collection');
  const secondSkill = contentRepository.createSkill({
    name: 'Go Microservices',
    category: 'Programming & Logic',
    proficiency: 85,
  });
  assert(secondSkill.id !== newSkill.id, `Retired skill ID ${newSkill.id} was NOT reused (assigned ${secondSkill.id})`);
  contentRepository.deleteSkill(secondSkill.id);

  // 4. Education Verification
  console.log('\n--- Scenario 4: Education CMS ---');
  const initialEdu = contentRepository.getEducation({ includeDrafts: true });
  assert(initialEdu.length >= 1, `Initial education count is ${initialEdu.length}`);
  const newEdu = contentRepository.createEducation({
    degree: 'Intermediate (10+2) MPC',
    institution: 'Junior College of Science & Technology',
    field: 'Mathematics, Physics, Chemistry',
    period: '2022 – 2024',
    cgpa: '9.8 / 10',
    expectedGraduation: '2024',
    highlights: ['State top 1% score', 'Academic distinction award'],
    isPublished: true,
  });
  assert(newEdu.id.startsWith('edu_'), `New education assigned permanent ID: ${newEdu.id}`);
  contentRepository.updateEducation(newEdu.id, { cgpa: '9.85 / 10' });
  const updatedEdu = contentRepository.getEducationById(newEdu.id);
  assert(updatedEdu?.cgpa === '9.85 / 10', 'Education CGPA updated successfully');
  contentRepository.deleteEducation(newEdu.id);
  const eduAfterDel = contentRepository.getEducation({ includeDrafts: true });
  assert(!eduAfterDel.some((e) => e.id === newEdu.id), 'Deleted education record removed');
  const secondEdu = contentRepository.createEducation({
    degree: 'Secondary Schooling (SSC)',
    institution: 'High School',
    field: 'General Studies',
    period: '2022',
    cgpa: '10.0 / 10',
    expectedGraduation: '2022',
    highlights: [],
  });
  assert(secondEdu.id !== newEdu.id, `Retired edu ID ${newEdu.id} was NOT reused (assigned ${secondEdu.id})`);
  contentRepository.deleteEducation(secondEdu.id);

  // 5. Experience Verification
  console.log('\n--- Scenario 5: Experience CMS ---');
  const initialExp = contentRepository.getExperience({ includeDrafts: true });
  assert(initialExp.length >= 2, `Initial experience count is ${initialExp.length}`);
  const newExp = contentRepository.createExperience({
    title: 'Autonomous Systems Researcher',
    organization: 'Robotics Lab',
    period: 'Winter 2026',
    type: 'INTERNSHIP',
    location: 'Campus Tech Hub',
    description: 'Researched low-latency sensor fusion telemetry algorithms.',
    highlights: ['Benchmarked I2C and SPI latency', 'Authored technical report'],
    isPublished: true,
  });
  assert(newExp.id.startsWith('exp_'), `New experience assigned permanent ID: ${newExp.id}`);
  contentRepository.updateExperience(newExp.id, { period: 'Nov 2026 – Dec 2026' });
  const updatedExp = contentRepository.getExperienceById(newExp.id);
  assert(updatedExp?.period === 'Nov 2026 – Dec 2026', 'Experience period updated successfully');
  contentRepository.deleteExperience(newExp.id);
  const expAfterDel = contentRepository.getExperience({ includeDrafts: true });
  assert(!expAfterDel.some((e) => e.id === newExp.id), 'Deleted experience record removed');
  const secondExp = contentRepository.createExperience({
    title: 'Junior Developer Trainee',
    organization: 'Tech Academy',
    period: '2025',
    type: 'FULL TIME',
    location: 'Virtual',
    description: 'Training in enterprise stack.',
    highlights: [],
  });
  assert(secondExp.id !== newExp.id, `Retired exp ID ${newExp.id} was NOT reused (assigned ${secondExp.id})`);
  contentRepository.deleteExperience(secondExp.id);

  // 6. Achievements Verification
  console.log('\n--- Scenario 6: Achievements CMS ---');
  const initialAch = contentRepository.getAchievements({ includeDrafts: true });
  assert(initialAch.length >= 6, `Initial achievements count is ${initialAch.length}`);
  const newAch = contentRepository.createAchievement({
    metric: '1st PLACE',
    title: 'State Level AI Hackathon',
    category: 'Competitive Hackathons',
    description: 'Built autonomous disaster response fleet dispatching system.',
    isPublished: true,
  });
  assert(newAch.id.startsWith('ach_'), `New achievement assigned permanent ID: ${newAch.id}`);
  contentRepository.updateAchievement(newAch.id, { metric: 'GRAND WINNER' });
  const updatedAch = contentRepository.getAchievementById(newAch.id);
  assert(updatedAch?.metric === 'GRAND WINNER', 'Achievement metric updated to GRAND WINNER');
  contentRepository.deleteAchievement(newAch.id);
  const achAfterDel = contentRepository.getAchievements({ includeDrafts: true });
  assert(!achAfterDel.some((a) => a.id === newAch.id), 'Deleted achievement removed');
  const secondAch = contentRepository.createAchievement({
    metric: 'TOP 5%',
    title: 'National Algorithmic Challenge',
    category: 'Competitions',
    description: 'Ranked in top percentile.',
  });
  assert(secondAch.id !== newAch.id, `Retired ach ID ${newAch.id} was NOT reused (assigned ${secondAch.id})`);
  contentRepository.deleteAchievement(secondAch.id);

  // 7. Personal Information & Social Links Verification
  console.log('\n--- Scenario 7: Personal Info CMS ---');
  const currentPersonal = contentRepository.getPersonal();
  assert(currentPersonal.social.email === 'nagaaswith3@gmail.com', 'Correct default email confirmed');
  contentRepository.updatePersonal({
    title: 'AI Automation & Embedded Systems Engineer',
    social: {
      ...currentPersonal.social,
      codechef: 'https://www.codechef.com/users/aswith_coder',
    },
  });
  const updatedPersonal = contentRepository.getPersonal();
  assert(updatedPersonal.title === 'AI Automation & Embedded Systems Engineer', 'Personal title updated');
  assert(updatedPersonal.social.codechef === 'https://www.codechef.com/users/aswith_coder', 'CodeChef profile link updated');
  // Revert test title
  contentRepository.updatePersonal({
    title: currentPersonal.title,
    social: currentPersonal.social,
  });

  // 8. Resume Specification Verification
  console.log('\n--- Scenario 8: Resume Specification CMS ---');
  const currentResume = contentRepository.getResume();
  assert(currentResume.path.includes('.pdf'), `Resume path is ${currentResume.path}`);
  contentRepository.updateResume('/media/resume_v2.pdf');
  assert(contentRepository.getResume().path === '/media/resume_v2.pdf', 'Resume path updated to /media/resume_v2.pdf');
  contentRepository.updateResume('/media/resume.pdf'); // Revert

  // 9. Media Library Verification
  console.log('\n--- Scenario 9: Media Asset Mapping CMS ---');
  const currentMedia = contentRepository.getMedia();
  assert(currentMedia.portrait.includes('profile.jpeg'), 'Profile portrait mapping exists');
  contentRepository.updateMedia({ portrait: '/media/profile/portrait_hq.webp' });
  assert(contentRepository.getMedia().portrait === '/media/profile/portrait_hq.webp', 'Media portrait mapping updated');
  contentRepository.updateMedia({ portrait: currentMedia.portrait }); // Revert

  console.log('\n====================================================');
  console.log(`COMPLETE CMS TEST RUN RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Test run error:', err);
  process.exit(1);
});
