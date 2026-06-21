import { createCrudSlice } from '../createCrudSlice';

const skillsCrud = createCrudSlice('skills', 'Skill');

export const {
  fetchAll: fetchSkills,
  create: createSkill,
  update: updateSkill,
  remove: deleteSkill,
  reorder: reorderSkills,
  reorderLocally,
} = skillsCrud.actions;

export default skillsCrud.reducer;
