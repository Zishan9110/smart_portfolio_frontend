import { createCrudSlice } from '../createCrudSlice';

const toolsCrud = createCrudSlice('tools', 'Tool');

export const {
  fetchAll: fetchTools,
  create: createTool,
  update: updateTool,
  remove: deleteTool,
  reorder: reorderTools,
  reorderLocally,
} = toolsCrud.actions;

export default toolsCrud.reducer;
