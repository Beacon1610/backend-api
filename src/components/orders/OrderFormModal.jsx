import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';

export default function OrderFormModal({ loading, onClose, onSubmit, open, order }) {
  const [productName, setProductName] = useState('');
  const isEditing = Boolean(order);

  useEffect(() => {
    setProductName(order?.productName || '');
  }, [order, open]);

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({ productName: productName.trim() });
  }

  return (
    <Modal
      description={isEditing ? 'Update product information for this order.' : 'Create a new order record.'}
      footer={
        <>
          <Button disabled={loading} onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button disabled={loading || productName.trim().length < 2} form="order-form" type="submit">
            {loading ? 'Saving...' : isEditing ? 'Save changes' : 'Create order'}
          </Button>
        </>
      }
      onClose={onClose}
      open={open}
      title={isEditing ? 'Edit order' : 'Add order'}
    >
      <form className="space-y-4" id="order-form" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-200" htmlFor="productName">
            Product
          </label>
          <Input
            autoFocus
            id="productName"
            maxLength={100}
            minLength={2}
            onChange={(event) => setProductName(event.target.value)}
            placeholder="Product name"
            required
            value={productName}
          />
        </div>
      </form>
    </Modal>
  );
}
