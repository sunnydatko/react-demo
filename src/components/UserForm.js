import React from 'react';
import {
  AppBar,
  Button,
  FormControlLabel,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(25, 'Name must be under 25 characters')
    .required('Name is required')
    .matches(/^([^0-9]*)$/, 'Only valid letters allowed'),
  email: Yup.string()
    .email('Email must be a valid format')
    .required('Email is required'),
  gender: Yup.string().required('Gender is required'),
  status: Yup.string().required('Status is required'),
});

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '1.5em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '1em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '0.5em',
    },
  },
}));

const UserForm = ({
  user,
  handleSubmit,
  handleFormClose,
}) => {
  const classes = useStyles();

  const initialValues = {
    name: user ? user.name : '',
    email: user ? user.email : '',
    gender: user ? user.gender : '',
    status: user ? user.status : '',
  };

  return (
    <React.Fragment>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={handleFormClose}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            {user ? 'Add' : 'Edit'} User
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          const { errors, handleChange, values } = formik;
          return (
            <div className='container'>
              <Form>
                <Grid container direction={'column'} spacing={3}>
                  <Grid item>
                    <TextField
                      name='name'
                      label='Name *'
                      error={Boolean(errors.name)}
                      variant='outlined'
                      onChange={handleChange}
                      value={values.name}
                      inputProps={{
                        size: 50,
                      }}
                    />
                    {errors.name && (
                      <div style={{ color: 'red' }}>{errors.name}</div>
                    )}
                  </Grid>
                  <Grid item>
                    <TextField
                      name='email'
                      label='Email *'
                      variant='outlined'
                      error={Boolean(errors.email)}
                      onChange={handleChange}
                      value={values.email}
                      inputProps={{
                        size: 50,
                      }}
                    />
                    {errors.email && (
                      <div style={{ color: 'red' }}>{errors.email}</div>
                    )}
                  </Grid>
                  <Grid item>
                    <FormControl component='fieldset'>
                      <FormLabel component='legend'>Gender *</FormLabel>
                      <RadioGroup
                        row
                        aria-label='gender'
                        name='gender'
                        value={values.gender}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          name='gender'
                          value='Female'
                          control={<Radio />}
                          label='Female'
                        />
                        <FormControlLabel
                          name='gender'
                          value='Male'
                          control={<Radio />}
                          label='Male'
                        />
                      </RadioGroup>
                    </FormControl>
                    {errors.gender && (
                      <div style={{ color: 'red' }}>{errors.gender}</div>
                    )}
                  </Grid>
                  <Grid item>
                    <FormControl component='fieldset'>
                      <FormLabel component='legend'>Active *</FormLabel>
                      <RadioGroup
                        row
                        aria-label='active'
                        name='active'
                        value={values.status}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          name='status'
                          value='Active'
                          control={<Radio />}
                          label='Yes'
                        />
                        <FormControlLabel
                          name='status'
                          value='Inactive'
                          control={<Radio />}
                          label='No'
                        />
                      </RadioGroup>
                    </FormControl>
                    {errors.status && (
                      <div style={{ color: 'red' }}>{errors.status}</div>
                    )}
                  </Grid>
                  <Grid
                    item
                    container
                    style={{ marginTop: '2em' }}
                    alignItems='flex-end'
                  >
                    <Grid item>
                      <Button
                        color='secondary'
                        onClick={() => {
                          handleFormClose();
                        }}
                      >
                        Cancel
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        type='submit'
                        color='primary'
                        variant='contained'
                        className={classes.saveButton}
                      >
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            </div>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

export default UserForm;
