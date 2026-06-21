import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiPlus, FiStar } from 'react-icons/fi';

import PageHeader from '../../components/dashboard/PageHeader';
import AchievementFormModal from '../../components/dashboard/AchievementFormModal';
import CrudList from '../../components/dashboard/CrudList';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import EmptyState from '../../components/common/EmptyState';
import Spinner from '../../components/common/Spinner';
import Seo from '../../components/common/Seo';

import {
  fetchAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from '../../features/achievements/achievementsSlice';
import { formatDate } from '../../utils/dateHelpers';

export default function AchievementsManager() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.achievements);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    dispatch(fetchAchievements());
  }, [dispatch]);

  const handleSubmit = async (formData) => {
    if (editing) {
      await dispatch(updateAchievement({ id: editing._id, formData }));
    } else {
      await dispatch(createAchievement(formData));
    }
    setModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    await dispatch(deleteAchievement(deleteTarget._id));
    setIsDeleting(false);
    setDeleteTarget(null);
  };

  const columns = [
    {
      label: '',
      render: (item) => (
        <div className="h-10 w-10 rounded-lg overflow-hidden bg-base-surface">
          {item.badgeImage?.url && <img src={item.badgeImage.url} alt="" className="w-full h-full object-cover" />}
        </div>
      ),
    },
    { label: 'Title', render: (item) => <span className="font-medium">{item.title}</span> },
    { label: 'Date', render: (item) => <span className="text-xs text-ink-muted font-mono">{formatDate(item.date)}</span> },
  ];

  return (
    <div>
      <Seo title="Achievements — Admin" />
      <PageHeader
        title="Achievements"
        description={`${items.length} achievement${items.length === 1 ? '' : 's'}`}
        action={
          <button
            onClick={() => {
              setEditing(null);
              setModalOpen(true);
            }}
            className="btn-primary"
          >
            <FiPlus size={14} /> Add Achievement
          </button>
        }
      />

      {status === 'loading' && items.length === 0 ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : items.length === 0 ? (
        <EmptyState icon={FiStar} title="No achievements added yet" />
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

      <AchievementFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} initialData={editing} />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title={`Delete "${deleteTarget?.title}"?`}
        isLoading={isDeleting}
      />
    </div>
  );
}
