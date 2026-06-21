import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiFolder, FiStar, FiEye } from 'react-icons/fi';

import PageHeader from '../../components/dashboard/PageHeader';
import ProjectFormModal from '../../components/dashboard/ProjectFormModal';
import DragDropList from '../../components/dashboard/DragDropList';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import EmptyState from '../../components/common/EmptyState';
import Spinner from '../../components/common/Spinner';
import Seo from '../../components/common/Seo';

import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  deleteProjectImage,
  reorderProjects,
  setFilters,
  reorderLocally,
} from '../../features/projects/projectsSlice';

export default function ProjectsManager() {
  const dispatch = useDispatch();
  const { items, status, filters, pages, total } = useSelector((state) => state.projects);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [reorderMode, setReorderMode] = useState(false);

  useEffect(() => {
    dispatch(fetchProjects({ ...filters, limit: 10 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, filters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setFilters({ search: searchInput, page: 1 }));
    }, 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const openCreateModal = () => {
    setEditingProject(null);
    setModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    if (editingProject) {
      await dispatch(updateProject({ id: editingProject._id, formData }));
    } else {
      await dispatch(createProject(formData));
    }
    setModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    await dispatch(deleteProject(deleteTarget._id));
    setIsDeleting(false);
    setDeleteTarget(null);
  };

  const handleDeleteImage = (projectId, imageId) => {
    dispatch(deleteProjectImage({ projectId, imageId }));
  };

  const handleReorder = (newOrderItems) => {
    dispatch(reorderLocally(newOrderItems));
    const order = newOrderItems.map((item, idx) => ({ id: item._id, displayOrder: idx }));
    dispatch(reorderProjects(order));
  };

  return (
    <div>
      <Seo title="Projects — Admin" />
      <PageHeader
        title="Projects"
        description={`${total} project${total === 1 ? '' : 's'} total`}
        action={
          <div className="flex items-center gap-3">
            <button
              onClick={() => setReorderMode((v) => !v)}
              className={reorderMode ? 'btn-primary !py-2.5 !px-4 text-xs' : 'btn-secondary !py-2.5 !px-4 text-xs'}
            >
              {reorderMode ? 'Done Reordering' : 'Reorder'}
            </button>
            <button onClick={openCreateModal} className="btn-primary">
              <FiPlus size={14} /> Add Project
            </button>
          </div>
        }
      />

      {!reorderMode && (
        <div className="relative max-w-sm mb-6">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" size={16} />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search projects..."
            className="input-field !pl-10 !py-2.5 text-sm"
          />
        </div>
      )}

      {status === 'loading' && items.length === 0 ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          icon={FiFolder}
          title="No projects yet"
          message="Add your first project to showcase your work."
          action={
            <button onClick={openCreateModal} className="btn-primary">
              <FiPlus size={14} /> Add Project
            </button>
          }
        />
      ) : reorderMode ? (
        <div className="glass-card p-4">
          <p className="text-xs text-ink-muted mb-4">Drag items to reorder. Changes save automatically.</p>
          <DragDropList
            items={items}
            onReorder={handleReorder}
            renderItem={(project) => (
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.03]">
                <div className="h-10 w-10 rounded-lg overflow-hidden bg-base-surface shrink-0">
                  {project.images?.[0]?.url && (
                    <img src={project.images[0].url} alt="" className="w-full h-full object-cover" />
                  )}
                </div>
                <span className="text-sm text-ink truncate">{project.title}</span>
              </div>
            )}
          />
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((project) => (
              <div key={project._id} className="glass-card overflow-hidden flex flex-col">
                <div className="aspect-video bg-base-surface relative">
                  {project.images?.[0]?.url ? (
                    <img src={project.images[0].url} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-ink-faint text-xs">
                      No image
                    </div>
                  )}
                  {project.featured && (
                    <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-base/80 flex items-center justify-center text-accent-cyan">
                      <FiStar size={12} />
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-medium text-ink text-sm mb-1 truncate">{project.title}</h3>
                  <p className="text-xs text-ink-muted line-clamp-2 mb-3 flex-1">{project.description}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                    <span className="flex items-center gap-1 text-xs text-ink-faint">
                      <FiEye size={12} /> {project.views || 0}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditModal(project)}
                        className="p-2 rounded-lg text-ink-muted hover:text-ink hover:bg-white/[0.06] transition-colors"
                      >
                        <FiEdit2 size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(project)}
                        className="p-2 rounded-lg text-ink-muted hover:text-red-400 hover:bg-white/[0.06] transition-colors"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {pages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: pages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => dispatch(setFilters({ page: pageNum }))}
                  className={`h-9 w-9 rounded-full text-sm transition-colors ${
                    filters.page === pageNum ? 'bg-gradient-accent text-white' : 'glass-card text-ink-muted hover:text-ink'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      <ProjectFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingProject}
        onDeleteImage={handleDeleteImage}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title={`Delete "${deleteTarget?.title}"?`}
        message="This will permanently remove the project and its images."
        isLoading={isDeleting}
      />
    </div>
  );
}
