import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiPlus, FiBriefcase } from 'react-icons/fi';

import PageHeader from '../../components/dashboard/PageHeader';
import ExperienceFormModal from '../../components/dashboard/ExperienceFormModal';
import CrudList from '../../components/dashboard/CrudList';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import EmptyState from '../../components/common/EmptyState';
import Spinner from '../../components/common/Spinner';
import Seo from '../../components/common/Seo';

import { fetchExperience, createExperience, updateExperience, deleteExperience } from '../../features/experience/experienceSlice';
import { formatDuration } from '../../utils/dateHelpers';

export default function ExperienceManager() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.experience);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    dispatch(fetchExperience());
  }, [dispatch]);

  const handleSubmit = async (payload) => {
    if (editing) {
      await dispatch(updateExperience({ id: editing._id, payload }));
    } else {
      await dispatch(createExperience(payload));
    }
    setModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    await dispatch(deleteExperience(deleteTarget._id));
    setIsDeleting(false);
    setDeleteTarget(null);
  };

  const columns = [
    { label: 'Position', render: (item) => <span className="font-medium">{item.position}</span> },
    { label: 'Company', render: (item) => <span className="text-ink-muted">{item.company}</span> },
    {
      label: 'Duration',
      render: (item) => (
        <span className="text-xs text-ink-muted font-mono">
          {formatDuration(item.startDate, item.endDate, item.isCurrent)}
        </span>
      ),
    },
  ];

  return (
    <div>
      <Seo title="Experience — Admin" />
      <PageHeader
        title="Experience"
        description={`${items.length} entr${items.length === 1 ? 'y' : 'ies'}`}
        action={
          <button
            onClick={() => {
              setEditing(null);
              setModalOpen(true);
            }}
            className="btn-primary"
          >
            <FiPlus size={14} /> Add Experience
          </button>
        }
      />

      {status === 'loading' && items.length === 0 ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : items.length === 0 ? (
        <EmptyState icon={FiBriefcase} title="No experience added yet" />
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

      <ExperienceFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} initialData={editing} />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title={`Delete "${deleteTarget?.position}"?`}
        isLoading={isDeleting}
      />
    </div>
  );
}
