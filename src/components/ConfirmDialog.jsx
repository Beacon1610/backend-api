import { AlertTriangle } from 'lucide-react';
import Button from './ui/Button';
import Modal from './ui/Modal';

export default function ConfirmDialog({
  confirmLabel = 'Delete',
  description = 'This action cannot be undone.',
  loading = false,
  onCancel,
  onConfirm,
  open,
  title = 'Confirm action',
}) {
  return (
    <Modal
      description={description}
      footer={
        <>
          <Button disabled={loading} onClick={onCancel} variant="secondary">
            Cancel
          </Button>
          <Button disabled={loading} onClick={onConfirm} variant="danger">
            {loading ? 'Deleting...' : confirmLabel}
          </Button>
        </>
      }
      onClose={onCancel}
      open={open}
      title={title}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-300">
          <AlertTriangle aria-hidden="true" className="h-5 w-5" />
        </div>
        <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
          Please confirm before continuing.
        </p>
      </div>
    </Modal>
  );
}
