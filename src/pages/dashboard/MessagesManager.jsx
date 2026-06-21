import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiMail, FiTrash2, FiCircle, FiCheckCircle } from 'react-icons/fi';

import PageHeader from '../../components/dashboard/PageHeader';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import EmptyState from '../../components/common/EmptyState';
import Spinner from '../../components/common/Spinner';
import Seo from '../../components/common/Seo';

import { fetchContacts, markContactRead, deleteContactMessage } from '../../features/contact/contactSlice';
import { formatDate } from '../../utils/dateHelpers';

export default function MessagesManager() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.contact);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const toggleExpand = (msg) => {
    const next = expandedId === msg._id ? null : msg._id;
    setExpandedId(next);
    if (next && !msg.isRead) {
      dispatch(markContactRead(msg._id));
    }
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    await dispatch(deleteContactMessage(deleteTarget._id));
    setIsDeleting(false);
    setDeleteTarget(null);
  };

  const unreadCount = items.filter((m) => !m.isRead).length;

  return (
    <div>
      <Seo title="Messages — Admin" />
      <PageHeader
        title="Messages"
        description={`${items.length} message${items.length === 1 ? '' : 's'}${unreadCount > 0 ? ` · ${unreadCount} unread` : ''}`}
      />

      {status === 'loading' && items.length === 0 ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : items.length === 0 ? (
        <EmptyState icon={FiMail} title="No messages yet" message="Messages from your contact form will appear here." />
      ) : (
        <div className="flex flex-col gap-2">
          {items.map((msg) => (
            <motion.div
              key={msg._id}
              layout
              className={`glass-card p-4 cursor-pointer ${!msg.isRead ? 'border-accent-indigo/30' : ''}`}
              onClick={() => toggleExpand(msg)}
            >
              <div className="flex items-center gap-3">
                {msg.isRead ? (
                  <FiCheckCircle className="text-ink-faint shrink-0" size={14} />
                ) : (
                  <FiCircle className="text-accent-cyan shrink-0" size={14} fill="currentColor" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-sm truncate ${msg.isRead ? 'text-ink-muted' : 'text-ink font-medium'}`}>
                      {msg.name} <span className="text-ink-faint font-normal">— {msg.email}</span>
                    </p>
                    <span className="text-xs text-ink-faint shrink-0">{formatDate(msg.createdAt)}</span>
                  </div>
                  <p className="text-xs text-ink-muted truncate mt-0.5">{msg.subject || msg.message}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteTarget(msg);
                  }}
                  className="p-2 rounded-lg text-ink-muted hover:text-red-400 hover:bg-white/[0.06] transition-colors shrink-0"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>

              {expandedId === msg._id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 pt-3 border-t border-white/[0.06] text-sm text-ink-muted whitespace-pre-line"
                >
                  {msg.message}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete this message?"
        isLoading={isDeleting}
      />
    </div>
  );
}
