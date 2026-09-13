export interface AchievementItem {
  id: string; // Permanent internal ID, e.g. "ach_001"
  metric: string;
  title: string;
  category: string;
  description: string;
  displayOrder?: number;
  isPublished?: boolean;
}

export const achievementsData: AchievementItem[] = [
  {
    id: 'ach_001',
    displayOrder: 1,
    isPublished: true,
    metric: '2-STAR',
    title: 'CodeChef 2-Star Coder',
    category: 'Competitive Programming',
    description: 'Achieved CodeChef 2-Star rating through consistent competitive programming contests.',
  },
  {
    id: 'ach_002',
    displayOrder: 2,
    isPublished: true,
    metric: '300+',
    title: 'CodeChef Problems Solved',
    category: 'Algorithmic Problem Solving',
    description: 'Successfully solved over 300 data structures and algorithm problems on CodeChef.',
  },
  {
    id: 'ach_003',
    displayOrder: 3,
    isPublished: true,
    metric: '70+',
    title: 'LeetCode Problems Solved',
    category: 'Data Structures & Algorithms',
    description: 'Solved 70+ algorithmic problems spanning arrays, strings, dynamic programming, and graphs.',
  },
  {
    id: 'ach_004',
    displayOrder: 4,
    isPublished: true,
    metric: '2nd PRIZE',
    title: '2nd Prize — Project Expo',
    category: 'SOFTWARE + HARDWARE',
    description: 'Awarded 2nd Prize at the College Engineering Day Project Expo. Individual participation — sole developer and presenter of the engineering project.',
  },
  {
    id: 'ach_005',
    displayOrder: 5,
    isPublished: true,
    metric: 'A+ GRADE',
    title: 'NCC Trained — A+ Certificate',
    category: 'Leadership & Discipline',
    description: 'Completed National Cadet Corps (NCC) training, earning an A+ Grade Certification.',
  },
  {
    id: 'ach_006',
    displayOrder: 6,
    isPublished: true,
    metric: 'POSTER DESIGN',
    title: 'National-Level Poster Design',
    category: 'Competitions',
    description: 'Participated in a national-level poster design event and created a poster based on the "You Are Not Alone" theme.',
  },
];
