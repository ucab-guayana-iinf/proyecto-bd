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
  readBienes,
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
  const [bienes, setBienes] = useState([]);
  const { enqueueSnackbar } = props;

  useEffect(() => {
    (async() => {
      const _empleados = await readEmpleados();
      const _bienes = await readBienes();
      setEmpleados(_empleados);
      setBienes(_bienes);
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
    { title: 'Bienes', field: 'codigo_bien', cellStyle: { width: '-webkit-fill-available' },
      render: (data) => {
        const row = bienes.find(({ codigo_bien }) => codigo_bien === data.codigo_bien);
        return (
          <span>
            {row.codigo_bien} - {row.descripcion}
          </span>
        );
      },
      editComponent: (props) => {
      return (
        <Select
          value={props.value || ''}
          onChange={(e) => props.onChange(e.target.value)}
        >
          {bienes.map((bien) => (
            <MenuItem key={bien.codigo_bien} value={bien.codigo_bien}>
              {bien.codigo_bien} {bien.descripcion}
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
                codigo_bien: data.codigo_bien || '',
              },
            }, onError)
          }}
          onUpdate={(data, onError) => {
            updateHistorialResponsablesPrimarios({
              conditions: {
                 Pk1: data.ci,
                 Pk2: data.codigo_bien
               }

            },
            onError);
          }}
          onDelete={(data, onError) => {
            deleteHistorialResponsablesPrimarios({
              conditions: {
                 Pk1: data.ci,
                 Pk2: data.codigo_bien
               }

            }, onError)
          }}
        />
      </div>
    </div>
  );
};

export default HistorialResponsablesPrimarios;
