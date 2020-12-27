import React from 'react';
import { Snackbar } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import MuiAlert from '@material-ui/lab/Alert';

import Header from './Header';
import UsersList from './UsersList';
import theme from './Theme';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function App(props) {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [alert, setAlert] = React.useState({
    severity: '',
    message: '',
  });

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <UsersList handleSetAlert={setAlert} handleSnackbarOpen={handleSnackbarOpen}/>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
export default App;
