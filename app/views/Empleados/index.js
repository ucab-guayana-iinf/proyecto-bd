import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Table } from '../../components';
import {
  createEmpleados,
  readEmpleados,
  updateEmpleados,
  deleteEmpleados,
  readUnidades,
} from '../../../db/lib/querys';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Empleados = (props) => {
  const classes = useStyles();
  const [unidades, setUnidades] = useState([]);
  const { enqueueSnackbar } = props;

  useEffect(() => {
    (async() => {
      const _unidades = await readUnidades();
      setUnidades(_unidades);
    })()
  }, []);

  const headers = [
    { title: 'CI', field: 'ci', type: 'numeric', editable: 'onAdd' },
    { title: 'Nombre', field: 'nombre_completo' },
    { title: 'Unidad', field: 'codigo_unidad', editComponent: (props) => {
      return (
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value || ''}
          onChange={(e) => props.onChange(e.target.value)}
        >
          {unidades.map((unidad) => (
            <MenuItem key={unidad.codigo_unidad} value={unidad.codigo_unidad}>
              {unidad.nombre_unidad}
            </MenuItem>
          ))}
        </Select>
      );
    }},
  ];

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Table
          title="Empleados"
          headers={headers}
          data={readEmpleados}
          selection
          onAdd={(data, onError) => {
            createEmpleados({
              data: {
                ...data,
                codigo_unidad: data.codigo_unidad || ''
              },
            }, onError)
          }}
          onUpdate={(data, onError) => {
            updateEmpleados({
              data,
              value: data.ci,
            },
            onError);
          }}
          onDelete={(data, onError) => {
            deleteEmpleados({
              data,
              value: data.ci
            }, onError)
          }}
        />
      </div>
    </div>
  );
};

export default Empleados;
