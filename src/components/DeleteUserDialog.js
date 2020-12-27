import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

import { useDeleteUser } from '../hooks/users';

export default function DeleteUserDialog({
  user,
  isOpen,
  handleDelete,
  handleFormClose,
}) {
  const [mutate] = useDeleteUser();

  const handleConfirmDelete = async (id) => {
    const data = await mutate(id);
    handleDelete(data.status);
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleFormClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{`Delete User`}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <b>{`Are you sure you want to delete ${user.name}?`}</b>
          </DialogContentText>
          <DialogContentText id='alert-dialog-description'>
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormClose}>Cancel</Button>
          <Button
            onClick={() => handleConfirmDelete(user.id)}
            color='primary'
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
