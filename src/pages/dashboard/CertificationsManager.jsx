import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiPlus, FiAward } from 'react-icons/fi';

import PageHeader from '../../components/dashboard/PageHeader';
import CertificationFormModal from '../../components/dashboard/CertificationFormModal';
import CrudList from '../../components/dashboard/CrudList';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import EmptyState from '../../components/common/EmptyState';
import Spinner from '../../components/common/Spinner';
import Seo from '../../components/common/Seo';

import {
  fetchCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} from '../../features/certifications/certificationsSlice';
import { formatDate } from '../../utils/dateHelpers';

export default function CertificationsManager() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.certifications);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    dispatch(fetchCertifications());
  }, [dispatch]);

  const handleSubmit = async (formData) => {
    if (editing) {
      await dispatch(updateCertification({ id: editing._id, formData }));
    } else {
      await dispatch(createCertification(formData));
    }
    setModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    await dispatch(deleteCertification(deleteTarget._id));
    setIsDeleting(false);
    setDeleteTarget(null);
  };

  const columns = [
    {
      label: '',
      render: (item) => (
        <div className="h-10 w-10 rounded-lg overflow-hidden bg-base-surface">
          {item.image?.url && <img src={item.image.url} alt="" className="w-full h-full object-cover" />}
        </div>
      ),
    },
    { label: 'Name', render: (item) => <span className="font-medium">{item.name}</span> },
    { label: 'Organization', render: (item) => <span className="text-ink-muted">{item.organization}</span> },
    { label: 'Issued', render: (item) => <span className="text-xs text-ink-muted font-mono">{formatDate(item.issueDate)}</span> },
  ];

  return (
    <div>
      <Seo title="Certifications — Admin" />
      <PageHeader
        title="Certifications"
        description={`${items.length} certification${items.length === 1 ? '' : 's'}`}
        action={
          <button
            onClick={() => {
              setEditing(null);
              setModalOpen(true);
            }}
            className="btn-primary"
          >
            <FiPlus size={14} /> Add Certification
          </button>
        }
      />

      {status === 'loading' && items.length === 0 ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : items.length === 0 ? (
        <EmptyState icon={FiAward} title="No certifications added yet" />
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

      <CertificationFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} initialData={editing} />

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
