import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import { withSnackbar } from 'notistack';
import { Table } from '../../components';
import ciudadesVzla from '../../ciudadesVzla';
import {
  readUbicaciones,
  createUbicaciones,
  updateUbicaciones,
  deleteUbicaciones,
} from '../../../db/lib/querys';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));
const headers = [
  { title: 'Código ubicación', field: 'codigo_ubicacion', type: 'numeric', editable: 'never' },
  { title: 'Dirección', field: 'direccion' },
  { title: 'Ciudad', field: 'nombre_ciudad', editComponent: (props) => {
    return (
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.value || ciudadesVzla[0]}
        onChange={(e) => props.onChange(e.target.value)}
      >
        {ciudadesVzla.map(ciudad => (
          <MenuItem key={ciudad} value={ciudad}>
            {ciudad}
          </MenuItem>
        ))}
      </Select>
    );
  }},
];
const Ubicaciones = (props) => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const { enqueueSnackbar } = props;

  const setupData = async () => {
    const data = await readUbicaciones();
    console.log(data);
    setData(data);
  };

  const onError = (error) => {
    enqueueSnackbar(error);
  };

  useEffect(() => {
    (async() => {
      await setupData();
    })();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Table
          title="Ubicaciones"
          data={data}
          headers={headers}
          refreshData={setupData}
          selection
          onAdd={(data) => {
            createUbicaciones({...data, nombre_ciudad: data.ciudad || 'Abejales' }, onError);
          }}
          onUpdate={(data) => {
            updateUbicaciones({ value: data.codigo_ubicacion }, onError);
          }}
          onDelete={(data) => {
            deleteUbicaciones({ value: data.codigo_ubicacion }, onError);
          }}
        />
      </div>
    </div>
  );
};

export default withSnackbar(Ubicaciones);
