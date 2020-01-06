import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { UsersToolbar, UsersTable } from './components';
import { readUbicaciones } from '../../../db/lib/querys';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Ubicaciones = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    (async() => {
      const data = await readUbicaciones();
      setData(data);
    })();
  }, []);

  return (
    <div className={classes.root}>
      <UsersToolbar />
      <div className={classes.content}>
        <UsersTable data={data} />
      </div>
    </div>
  );
};

export default Ubicaciones;
