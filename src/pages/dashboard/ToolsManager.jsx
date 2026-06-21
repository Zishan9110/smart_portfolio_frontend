import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiPlus, FiTool } from 'react-icons/fi';

import PageHeader from '../../components/dashboard/PageHeader';
import ToolFormModal from '../../components/dashboard/ToolFormModal';
import CrudList from '../../components/dashboard/CrudList';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import EmptyState from '../../components/common/EmptyState';
import Spinner from '../../components/common/Spinner';
import Seo from '../../components/common/Seo';

import { fetchTools, createTool, updateTool, deleteTool } from '../../features/tools/toolsSlice';

export default function ToolsManager() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.tools);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    dispatch(fetchTools());
  }, [dispatch]);

  const handleSubmit = async (payload) => {
    if (editing) {
      await dispatch(updateTool({ id: editing._id, payload }));
    } else {
      await dispatch(createTool(payload));
    }
    setModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    await dispatch(deleteTool(deleteTarget._id));
    setIsDeleting(false);
    setDeleteTarget(null);
  };

  const columns = [
    {
      label: '',
      render: (item) => <span className="text-xl">{item.icon && !/^https?:\/\//.test(item.icon) ? item.icon : '🔧'}</span>,
    },
    { label: 'Name', render: (item) => <span className="font-medium">{item.name}</span> },
    { label: 'Category', render: (item) => <span className="text-ink-muted">{item.category}</span> },
  ];

  return (
    <div>
      <Seo title="Tools — Admin" />
      <PageHeader
        title="Tools"
        description={`${items.length} tool${items.length === 1 ? '' : 's'} listed`}
        action={
          <button
            onClick={() => {
              setEditing(null);
              setModalOpen(true);
            }}
            className="btn-primary"
          >
            <FiPlus size={14} /> Add Tool
          </button>
        }
      />

      {status === 'loading' && items.length === 0 ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : items.length === 0 ? (
        <EmptyState icon={FiTool} title="No tools added yet" />
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

      <ToolFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} initialData={editing} />

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
