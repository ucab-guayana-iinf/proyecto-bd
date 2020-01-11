import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Table } from '../../components';
import {
  createUnidades,
  readUnidades,
  updateUnidades,
  deleteUnidades,
  readSedes,
  readEmpleados,
} from '../../../db/lib/querys';
import { jsDatetimeToMysql } from '../../../db/utils';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Unidades = (props) => {
  const classes = useStyles();
  const [sedes, setSedes] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const { enqueueSnackbar } = props;

  useEffect(() => {
    (async() => {
      const _sedes = await readSedes();
      const _empleados = await readEmpleados();
      setSedes(_sedes);
      setEmpleados(_empleados);
    })()
  }, []);

  const headers = [
    { title: 'Código Unidad', field: 'codigo_unidad', type: 'numeric', editable: 'never' },
    { title: 'Sede', field: 'codigo_sede', editComponent: (props) => {
      return (
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value || ''}
          onChange={(e) => props.onChange(e.target.value)}
        >
          {sedes.map((sede) => (
            <MenuItem key={sede.codigo_sede} value={sede.codigo_sede}>
              {sede.descripcion}
            </MenuItem>
          ))}
        </Select>
      );
    }},
    { title: 'Nombre Unidad', field: 'nombre_unidad' },
    { title: 'Jefe', field: 'ci_jefe', editComponent: (props) => {
      return (
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value || ''}
          onChange={(e) => props.onChange(e.target.value)}
        >
          {empleados.map((empleado) => (
            <MenuItem key={empleado.ci} value={empleado.ci}>
              {empleado.nombre_completo}
            </MenuItem>
          ))}
        </Select>
      );
    }},
    { title: 'Fecha', field: 'fecha_jefe', type: 'date' },
  ];

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Table
          title="Unidades"
          headers={headers}
          data={readUnidades}
          selection
          onAdd={(data, onError) => {
            createUnidades({
              data: {
                ...data,
                fecha_jefe:( data.fecha_jefe && data.ci_jefe ? jsDatetimeToMysql(data.fecha_jefe) : null),
                codigo_sede: data.codigo_sede || '',
                ci_jefe: data.ci_jefe || null
              },
            }, onError)
          }}
          onUpdate={(data, onError) => {
            updateUnidades({
              data,
              value: data.codigo_unidad,
            },
            onError);
          }}
          onDelete={(data, onError) => {
            deleteUnidades({
              data,
              value: data.codigo_unidad
            }, onError)
          }}
        />
      </div>
    </div>
  );
};

export default Unidades;
