import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Button } from '@material-ui/core';

import { Notifications, Password } from './components';

import restartDatabase from '../../../db/lib/restartDatabase';

console.log(restartDatabase);

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const Settings = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Button variant="contained" color="secondary" onClick={restartDatabase}>
          REINICIAR BD
        </Button>
      </Grid>
    </div>
  );
};

export default Settings;
