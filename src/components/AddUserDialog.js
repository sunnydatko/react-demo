import { Dialog, DialogContent } from '@material-ui/core';

import { useCreateUser } from '../hooks/users';
import UserForm from './UserForm';

const AddUserDialog = ({ isOpen, handleFormClose, handleFormSave }) => {
  const [mutate] = useCreateUser();

  const handleSubmit = async ({ name, email, gender, status }) => {
    try {
      const data = await mutate({ name, email, gender, status });
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
            handleFormClose={handleFormClose}
            handleSubmit={handleSubmit}
            type='Add'
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddUserDialog;
