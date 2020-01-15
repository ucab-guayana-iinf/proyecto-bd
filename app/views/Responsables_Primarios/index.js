import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Table } from '../../components';
import {
  createHistorialResponsablesPrimarios,
  readHistorialResponsablesPrimarios,
  updateHistorialResponsablesPrimarios,
  deleteHistorialResponsablesPrimarios,
  readEmpleados,
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

const HistorialResponsablesPrimarios = (props) => {
  const classes = useStyles();
  const [empleados, setEmpleados] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const { enqueueSnackbar } = props;

  useEffect(() => {
    (async() => {
      const _empleados = await readEmpleados();
      const _unidades = await readUnidades();
      setEmpleados(_empleados);
      setUnidades(_unidades);
    })()
  }, []);

  const headers = [
    { title: 'Empleado', field: 'ci', cellStyle: { width: '-webkit-fill-available' },
      render: (data) => {
        const row = empleados.find(({ ci }) => ci === data.ci);
        return (
          <span>
            {row.ci} - {row.nombre_completo}
          </span>
        );
      },
      editComponent: (props) => {
      return (
        <Select
          value={props.value || ''}
          onChange={(e) => props.onChange(e.target.value)}
        >
          {empleados.map((empleado) => (
            <MenuItem key={empleado.ci} value={empleado.ci}>
              {empleado.ci} {empleado.nombre_completo}
            </MenuItem>
          ))}
        </Select>
      );
    }},
    { title: 'Unidad', field: 'codigo_unidad', cellStyle: { width: '-webkit-fill-available' },
      render: (data) => {
        const row = unidades.find(({ codigo_unidad }) => codigo_unidad === data.codigo_unidad);
        return (
          <span>
            {row.codigo_unidad} - {row.nombre_unidad}
          </span>
        );
      },
      editComponent: (props) => {
      return (
        <Select
          value={props.value || ''}
          onChange={(e) => props.onChange(e.target.value)}
        >
          {unidades.map((ubicacion) => (
            <MenuItem key={ubicacion.codigo_unidad} value={ubicacion.codigo_unidad}>
              {ubicacion.codigo_unidad} {ubicacion.nombre_unidad}
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
          title="Historial Responsables Primarios"
          headers={headers}
          data={readHistorialResponsablesPrimarios}
          selection
          onAdd={(data, onError) => {
            createHistorialResponsablesPrimarios({
              data: {
                ...data,
                ci: data.ci || '',
                codigo_unidad: data.codigo_unidad || '',
              },
            }, onError)
          }}
          onUpdate={(data, onError) => {
            updateHistorialResponsablesPrimarios({
              data,
              conditions: {
                 Pk1: data.ci,
                 Pk2: data.codigo_unidad
               }

            },
            onError);
          }}
          onDelete={(data, onError) => {
            deleteHistorialResponsablesPrimarios({
              data,
              conditions: {
                 Pk1: data.ci,
                 Pk2: data.codigo_unidad
               }

            }, onError)
          }}
        />
      </div>
    </div>
  );
};

export default HistorialResponsablesPrimarios;
