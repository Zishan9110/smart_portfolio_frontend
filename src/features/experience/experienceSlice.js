import { createCrudSlice } from '../createCrudSlice';

const experienceCrud = createCrudSlice('experience', 'Experience');

export const {
  fetchAll: fetchExperience,
  create: createExperience,
  update: updateExperience,
  remove: deleteExperience,
  reorder: reorderExperience,
  reorderLocally,
} = experienceCrud.actions;

export default experienceCrud.reducer;
