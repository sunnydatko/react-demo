import React from 'react';
import Moment from 'react-moment';
import AddIcon from '@material-ui/icons/Add';
import MaterialTable from 'material-table';
import { Button } from '@material-ui/core';

import { useGetUsers } from '../hooks/users';
import AddUserDialog from './AddUserDialog';
import EditUserDialog from './EditUserDialog';
import DeleteUserDialog from './DeleteUserDialog';

const UsersList = ({ handleSetAlert, handleSnackbarOpen }) => {
  const [addDialogOpen, setAddDialogOpen] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [user, setUser] = React.useState({});

  const { data: users, isLoading } = useGetUsers();

  const columns = [
    {
      title: 'Id',
      field: 'id',
      numeric: true,
    },
    { title: 'Name', field: 'name' },
    { title: 'Email', field: 'email' },
    { title: 'Gender', field: 'gender' },
    { title: 'Status', field: 'status' },
    {
      title: 'Created At',
      render: (rowData) => <Moment date={rowData} format='YYYY-M-D H:m:s' />,
      sortable: false,
    },
    {
      title: 'Updated At',
      render: (rowData) => <Moment date={rowData} format='YYYY-M-D H:m:s' />,
    },
  ];

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditDialogOpen = (user) => {
    setUser(user);
    setEditDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteDialogOpen = (user) => {
    setUser(user);
    setDeleteDialogOpen(true);
  };

  const handleCreateUser = (status) => {
    handleSetAlert({
      message:
        status.code === 201
          ? 'User created successfully'
          : `${status.data.data[0].field} ${status.data.data[0].message}`,
      severity: status.code === 201 ? 'success' : 'error',
    });

    if (status.code === 201) {
      handleAddDialogClose();
    }
    handleSnackbarOpen();
  };

  const handleUpdateUser = (status) => {
    handleSetAlert({
      message:
        status === 200
          ? `${status.data.data.name} updated successfully`
          : 'An error occured',
      severity: status.code === 200 ? 'success' : 'error',
    });

    handleSnackbarOpen();
    if (status === 200) {
      handleEditDialogClose();
    }
  };

  const handleDeleteUser = (status) => {
    handleSetAlert({
      message:
        status === 200 ? `User deleted successfully` : 'An error occured',
      severity: status === 200 ? 'success' : 'error',
    });

    handleDeleteDialogClose();
    handleSnackbarOpen();
  };

  const addUserButton = (
    <Button
      variant='contained'
      color='primary'
      startIcon={<AddIcon />}
      onClick={() => setAddDialogOpen(true)}
    >
      Add User
    </Button>
  );

  return (
    <React.Fragment>
      {/* {error && <div>Something went wrong ...</div>} */}

      {isLoading ? (
        <div>Retrieving User Information ...</div>
      ) : (
        <div>
          {addUserButton}
          <br />
          <br />

          <MaterialTable
            title='User list from API'
            columns={columns}
            data={users.data.data}
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit User',
                onClick: (event, rowData) => handleEditDialogOpen(rowData),
              },
              {
                icon: 'delete',
                tooltip: 'Delete User',
                onClick: (event, rowData) => handleDeleteDialogOpen(rowData),
              },
              {
                icon: 'add',
                tooltip: 'Add User',
                isFreeAction: true,
                onClick: setAddDialogOpen,
              },
            ]}
            options={{
              actionsColumnIndex: -1,
            }}
          />

          <AddUserDialog
            isOpen={addDialogOpen}
            handleFormSave={handleCreateUser}
            handleFormClose={handleAddDialogClose}
          />

          <EditUserDialog
            isOpen={editDialogOpen}
            handleFormSave={handleUpdateUser}
            handleFormClose={handleEditDialogClose}
            user={user}
          />

          <DeleteUserDialog
            isOpen={deleteDialogOpen}
            user={user}
            handleFormClose={handleDeleteDialogClose}
            handleDelete={handleDeleteUser}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default UsersList;
