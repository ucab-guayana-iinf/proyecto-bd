import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { UsersToolbar, UsersTable } from './components';
import { Table } from '../../components';
import { readUbicaciones } from '../../../db/lib/querys';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const mock = {
  headers: [
    { title: 'Name', field: 'name' },
    { title: 'Surname', field: 'surname' },
    { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
    {
      title: 'Birth Place',
      field: 'birthCity',
      lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
    },
  ],
  data: [
    { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
    {
      name: 'Zerya Betül',
      surname: 'Baran',
      birthYear: 2017,
      birthCity: 34,
    },
  ],
};

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
        <Table headers={mock.headers} data={mock.data} />
      </div>
    </div>
  );
};

export default Ubicaciones;
