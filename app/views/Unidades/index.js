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
  { title: 'Código unidad', field: 'codigo_unidad', type: 'numeric', editable: 'never' },
  { title: 'Código sede', field: 'codigo_sede', type: 'numeric', editable: 'never' },
  { title: 'Nombre Unidad', field: 'nombre_unidad' },
  { title: 'CI', field: 'ci_jefe', type: 'numeric' },
  { title: 'Fecha', field: 'fecha_jefe', type: 'date' },

];
const data = [
      {
        codigo_unidad: 1,
        codigo_sede: 1,
        nombre_unidad: 'Guayana_1',
        ci_jefe: 34,
        fecha_jefe: '',
      },
      {
        codigo_unidad: 2,
        codigo_sede: 2,
        nombre_unidad: 'Guayana_2',
        ci_jefe: 68,
        fecha_jefe: '',
      },
    ];
const Unidades = (props) => {
  const classes = useStyles();
  // const [data, setData] = useState([]);
  const { enqueueSnackbar } = props;

  // const setupData = async () => {
  //   const data = await readUbicaciones();
  //   console.log(data);
  //   setData(data);
  // };

  const onError = (error) => {
    enqueueSnackbar(error);
  };

  // useEffect(() => {
  //   (async() => {
  //     await setupData();
  //   })();
  // }, []);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Table
          data={data}
          headers={headers}
          selection
          onAdd={(data) => {
            // createUbicaciones({...data, nombre_ciudad: data.ciudad || 'Abejales' }, onError);
          }}
          onUpdate={(data) => {
            // alert('data: ' + data[0])
            // updateUbicaciones({ value: data.codigo_ubicacion }, onError);
          }}
          onDelete={(data) => {
            // deleteUbicaciones({ value: data.codigo_ubicacion }, onError);
          }}
        />
      </div>
    </div>
  );
};

export default withSnackbar(Unidades);
