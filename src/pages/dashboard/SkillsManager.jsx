import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiPlus, FiCode } from 'react-icons/fi';

import PageHeader from '../../components/dashboard/PageHeader';
import SkillFormModal from '../../components/dashboard/SkillFormModal';
import CrudList from '../../components/dashboard/CrudList';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import EmptyState from '../../components/common/EmptyState';
import Spinner from '../../components/common/Spinner';
import Seo from '../../components/common/Seo';

import { fetchSkills, createSkill, updateSkill, deleteSkill } from '../../features/skills/skillsSlice';

export default function SkillsManager() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.skills);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  const handleSubmit = async (payload) => {
    if (editing) {
      await dispatch(updateSkill({ id: editing._id, payload }));
    } else {
      await dispatch(createSkill(payload));
    }
    setModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    await dispatch(deleteSkill(deleteTarget._id));
    setIsDeleting(false);
    setDeleteTarget(null);
  };

  const columns = [
    { label: 'Name', render: (item) => <span className="font-medium">{item.name}</span> },
    { label: 'Category', render: (item) => <span className="text-ink-muted">{item.category}</span> },
    {
      label: 'Proficiency',
      render: (item) => (
        <div className="flex items-center gap-2 w-32">
          <div className="h-1.5 flex-1 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full bg-gradient-accent" style={{ width: `${item.proficiency}%` }} />
          </div>
          <span className="text-xs text-ink-muted font-mono">{item.proficiency}%</span>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Seo title="Skills — Admin" />
      <PageHeader
        title="Skills"
        description={`${items.length} skill${items.length === 1 ? '' : 's'} listed`}
        action={
          <button
            onClick={() => {
              setEditing(null);
              setModalOpen(true);
            }}
            className="btn-primary"
          >
            <FiPlus size={14} /> Add Skill
          </button>
        }
      />

      {status === 'loading' && items.length === 0 ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : items.length === 0 ? (
        <EmptyState icon={FiCode} title="No skills yet" message="Add your first skill to get started." />
      ) : (
        <CrudList
          items={items}
          columns={columns}
          onEdit={(item) => {
            setEditing(item);
            setModalOpen(true);
          }}
          onDelete={setDeleteTarget}
        />
      )}

      <SkillFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} initialData={editing} />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title={`Delete "${deleteTarget?.name}"?`}
        isLoading={isDeleting}
      />
    </div>
  );
}
