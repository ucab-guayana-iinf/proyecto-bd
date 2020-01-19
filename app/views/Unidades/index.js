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
    { title: 'Código Unidad', field: 'codigo_unidad', type: 'numeric', editable: 'never', cellStyle: { width: '170px' } },
    { title: 'Sede', field: 'codigo_sede', cellStyle: { width: '-webkit-fill-available' },
      render: (data) => {
        const sede = sedes.find(({ codigo_sede }) => codigo_sede === data.codigo_sede);
        return (
          <span>
            {(sede && sede.descripcion) || ''}
          </span>
        );
      },
      editComponent: (props) => {
        return (
          <Select
            value={props.value || 'POR ASIGNAR'}
            onChange={(e) => props.onChange(e.target.value)}
          >
            {sedes.map((sede) => (
              <MenuItem key={sede.codigo_sede} value={sede.codigo_sede}>
                {sede.descripcion}
              </MenuItem>
            ))}
          </Select>
        );
      }
    },
    { title: 'Nombre Unidad', field: 'nombre_unidad', cellStyle: { width: '-webkit-fill-available' } },
    { title: 'Jefe', field: 'ci_jefe', cellStyle: { width: '200px' },
      render: (data) => {
        const jefe = empleados.find(({ ci }) => ci === data.ci_jefe);
        return (
          <span>
            {(jefe && `${jefe.ci} - ${jefe.nombre_completo}`) || 'POR ASIGNAR'}
          </span>
        );
      },
      editComponent: (props) => {
      return (
          <Select
            value={props.value || ''}
            placeholder="POR ASIGNAR"
            onChange={(e) => props.onChange(e.target.value)}
          >
            <MenuItem key={'POR ASIGNAR'} value={''}>
              POR ASIGNAR
            </MenuItem>
            {empleados.map((empleado) => (
              <MenuItem key={empleado.ci} value={empleado.ci}>
                {empleado.ci} - {empleado.nombre_completo}
              </MenuItem>
            ))}
          </Select>
        );
      }
    },
    { title: 'Fecha', field: 'fecha_jefe', type: 'date', cellStyle: { width: '200px' } },
  ];

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Table
          title="Unidades"
          headers={headers}
          data={readUnidades}
          onAdd={(data, onError) => {
            if (!data.ci_jefe) {
              delete data.ci_jefe;
            }
            if (!data.fecha_jefe) {
              delete data.fecha_jefe;
            } else {
              data.fecha_jefe = jsDatetimeToMysql(data.fecha_jefe);
            }

            createUnidades({ data }, onError);
          }}
          onUpdate={(data, onError, oldData) => {
            console.log(data);
            if (!data.ci_jefe) {
              delete data.ci_jefe;
            }
            if (!data.fecha_jefe) {
              delete data.fecha_jefe;
            } else {
              data.fecha_jefe = jsDatetimeToMysql(data.fecha_jefe);
            }

            updateUnidades({
              data,
              value: oldData.codigo_unidad,
            }, onError);
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
