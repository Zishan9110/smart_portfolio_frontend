import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiPlus, FiBook } from 'react-icons/fi';

import PageHeader from '../../components/dashboard/PageHeader';
import EducationFormModal from '../../components/dashboard/EducationFormModal';
import CrudList from '../../components/dashboard/CrudList';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import EmptyState from '../../components/common/EmptyState';
import Spinner from '../../components/common/Spinner';
import Seo from '../../components/common/Seo';

import { fetchEducation, createEducation, updateEducation, deleteEducation } from '../../features/education/educationSlice';
import { formatDuration } from '../../utils/dateHelpers';

export default function EducationManager() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.education);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    dispatch(fetchEducation());
  }, [dispatch]);

  const handleSubmit = async (payload) => {
    if (editing) {
      await dispatch(updateEducation({ id: editing._id, payload }));
    } else {
      await dispatch(createEducation(payload));
    }
    setModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    await dispatch(deleteEducation(deleteTarget._id));
    setIsDeleting(false);
    setDeleteTarget(null);
  };

  const columns = [
    { label: 'Degree', render: (item) => <span className="font-medium">{item.degree}</span> },
    { label: 'Institution', render: (item) => <span className="text-ink-muted">{item.institution}</span> },
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
      <Seo title="Education — Admin" />
      <PageHeader
        title="Education"
        description={`${items.length} entr${items.length === 1 ? 'y' : 'ies'}`}
        action={
          <button
            onClick={() => {
              setEditing(null);
              setModalOpen(true);
            }}
            className="btn-primary"
          >
            <FiPlus size={14} /> Add Education
          </button>
        }
      />

      {status === 'loading' && items.length === 0 ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : items.length === 0 ? (
        <EmptyState icon={FiBook} title="No education added yet" />
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

      <EducationFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} initialData={editing} />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title={`Delete "${deleteTarget?.degree}"?`}
        isLoading={isDeleting}
      />
    </div>
  );
}
