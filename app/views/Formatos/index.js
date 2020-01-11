import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Table } from '../../components';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {
  createFormatos,
  readFormatos,
  updateFormatos,
  deleteFormatos,
  readUnidades,
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

const Formatos = (props) => {
  const classes = useStyles();
  const [unidades, setUnidades] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const { enqueueSnackbar } = props;

  useEffect(() => {
    (async() => {
      const _unidades = await readUnidades();
      const _empleados = await readEmpleados();
      setEmpleados(_unidades);
      setUnidades(_empleados);
    })()
  }, []);

  const headers = [
    { title: 'Número de Formato', field: 'numero_formato', type: 'numeric', editable: 'never', cellStyle: { width: '150px'} },
    { title: 'Unidad Emisora', field: 'codigo_unidad_emisora', cellStyle: { width: '-webkit-fill-available' },
      render: (data) => {
        const row = unidades.find(({ codigo_unidad }) => codigo_unidad === data.codigo_unidad_emisora);
        return (
          <span>
            {row.nombre_unidad}
          </span>
        );
      },
      editComponent: (props) => {
      return (
        <Select
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
    { title: 'Unidad Receptora', field: 'codigo_unidad_receptora', cellStyle: { width: '-webkit-fill-available' },
      render: (data) => {
        const row = unidades.find(({ codigo_unidad }) => codigo_unidad === data.codigo_unidad_receptora);
        return (
          <span>
            {row.nombre_unidad}
          </span>
        );
      },
      editComponent: (props) => {
      return (
        <Select
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
    { title: 'Responsable Cedente', field: 'ficha_responsable_cedente', cellStyle: { width: '-webkit-fill-available' },
      render: (data) => {
        const row = empleados.find(({ ci }) => ci === data.ficha_responsable_cedente);
        return (
          <span>
            {row.nombre_completo}
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
              {empleado.nombre_completo}
            </MenuItem>
          ))}
        </Select>
      );
    }},
    { title: 'Responsable Receptor', field: 'ficha_responsable_receptor', cellStyle: { width: '-webkit-fill-available' },
      render: (data) => {
        const row = empleados.find(({ ci }) => ci === data.ficha_responsable_receptor);
        return (
          <span>
            {row.nombre_completo}
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
              {empleado.nombre_completo}
            </MenuItem>
          ))}
        </Select>
      );
    }},
    { title: 'Aprobación del Emisor', field: 'aprobacion_emisor', cellStyle: { width: '-webkit-fill-available'}, editComponent: (props) => {
        return (
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={props.value || false}
                  onChange={(e) => props.onChange(!props.value)}
                />
              }
            />
          </FormGroup>
        );
      }},
    { title: 'Aprobación del Receptor', field: 'aprobacion_receptor', cellStyle: { width: '-webkit-fill-available'}, editComponent: (props) => {
        return (
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={props.value || false}
                  onChange={(e) => props.onChange(!props.value)}
                />
              }
            />
          </FormGroup>
        );
      }},
    { title: 'Fecha del Formato', field: 'fecha_formato', type: 'date', cellStyle: { width: '200px' } },
  ];

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Table
          title="Formatos"
          headers={headers}
          data={readFormatos}
          selection
          onAdd={(data, onError) => {
            if (!data.fecha_formato) {
              delete data.fecha_formato;
            } else {
              data.fecha_formato = jsDatetimeToMysql(data.fecha_formato);
            }
            createFormatos({
              data: {
                ...data,
                codigo_unidad_emisora: data.codigo_unidad_emisora || '',
                codigo_unidad_receptora: data.codigo_unidad_receptora || '',
                ficha_responsable_cedente: data.ficha_responsable_cedente || '',
                ficha_responsable_receptor: data.ficha_responsable_receptor || '',
              },
            }, onError)
          }}
          onUpdate={(data, onError) => {
            if (!data.fecha_formato) {
              delete data.fecha_formato;
            } else {
              data.fecha_formato = jsDatetimeToMysql(data.fecha_formato);
            }
            updateFormatos({
              data,
              value: data.numero_formato,
            },
            onError);
          }}
          onDelete={(data, onError) => {
            deleteFormatos({
              data,
              value: data.numero_formato
            }, onError)
          }}
        />
      </div>
    </div>
  );
};

export default Formatos;
