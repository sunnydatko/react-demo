import { Dialog, DialogContent } from '@material-ui/core';

import { useUpdateUser } from '../hooks/users';
import UserForm from './UserForm';

const EditUserDialog = ({ user, isOpen, handleFormSave, handleFormClose }) => {
  const [mutate] = useUpdateUser();

  const handleSubmit = async ({ id, name, email, gender, status }) => {
    try {
      const data = await mutate({ id, name, email, gender, status });
      handleFormSave(data);
    } catch (e) {}
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleFormClose}
        style={{ zIndex: 1302 }}
        fullScreen
      >
        <DialogContent>
          <UserForm
            user={user}
            handleFormClose={handleFormClose}
            handleSubmit={handleSubmit}
            type='Edit'
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditUserDialog;
