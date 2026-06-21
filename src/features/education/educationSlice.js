import { createCrudSlice } from '../createCrudSlice';

const educationCrud = createCrudSlice('education', 'Education');

export const {
  fetchAll: fetchEducation,
  create: createEducation,
  update: updateEducation,
  remove: deleteEducation,
  reorder: reorderEducation,
  reorderLocally,
} = educationCrud.actions;

export default educationCrud.reducer;
