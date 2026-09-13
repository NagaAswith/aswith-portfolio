export interface SkillNode {
  id: string; // Permanent internal ID, e.g. "skill_001"
  name: string;
  category: 'Programming & Logic' | 'Web & Frontend' | 'AI & Automation' | 'Embedded & IoT' | 'Tools & Workflows';
  proficiency: number; // Percentage 0-100
  connectedIds?: string[];
  displayOrder?: number;
  isPublished?: boolean;
}

export const skillsData: SkillNode[] = [
  { id: 'skill_001', name: 'Python', category: 'Programming & Logic', proficiency: 95, connectedIds: ['skill_006', 'skill_005', 'skill_008'], displayOrder: 1, isPublished: true },
  { id: 'skill_002', name: 'C Language', category: 'Programming & Logic', proficiency: 85, connectedIds: ['skill_011', 'skill_010'], displayOrder: 2, isPublished: true },
  { id: 'skill_003', name: 'JavaScript (ES6+)', category: 'Web & Frontend', proficiency: 88, connectedIds: ['skill_004', 'skill_012'], displayOrder: 3, isPublished: true },
  { id: 'skill_004', name: 'HTML5 & CSS3', category: 'Web & Frontend', proficiency: 92, connectedIds: ['skill_003'], displayOrder: 4, isPublished: true },
  { id: 'skill_005', name: 'SQL', category: 'Programming & Logic', proficiency: 82, connectedIds: ['skill_001', 'skill_007'], displayOrder: 5, isPublished: true },
  { id: 'skill_006', name: 'Generative AI & LLMs', category: 'AI & Automation', proficiency: 88, connectedIds: ['skill_001', 'skill_008'], displayOrder: 6, isPublished: true },
  { id: 'skill_007', name: 'Data Analysis', category: 'AI & Automation', proficiency: 82, connectedIds: ['skill_001', 'skill_005'], displayOrder: 7, isPublished: true },
  { id: 'skill_008', name: 'CrewAI', category: 'AI & Automation', proficiency: 85, connectedIds: ['skill_006', 'skill_001'], displayOrder: 8, isPublished: true },
  { id: 'skill_009', name: 'n8n Workflow Automation', category: 'AI & Automation', proficiency: 84, connectedIds: ['skill_006', 'skill_012'], displayOrder: 9, isPublished: true },
  { id: 'skill_010', name: 'IoT Telemetry', category: 'Embedded & IoT', proficiency: 86, connectedIds: ['skill_002', 'skill_011'], displayOrder: 10, isPublished: true },
  { id: 'skill_011', name: 'Embedded Systems & Arduino', category: 'Embedded & IoT', proficiency: 85, connectedIds: ['skill_002', 'skill_010'], displayOrder: 11, isPublished: true },
  { id: 'skill_012', name: 'Git & GitHub', category: 'Tools & Workflows', proficiency: 88, connectedIds: ['skill_001', 'skill_003'], displayOrder: 12, isPublished: true },
];
