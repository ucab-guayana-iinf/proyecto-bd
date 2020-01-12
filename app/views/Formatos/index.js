import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Table } from '../../components';
import {
  createFormatos,
  readFormatos,
  updateFormatos,
  deleteFormatos,
  readUnidades,
  readEmpleados,
} from '../../../db/lib/querys';

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
  const { enqueueSnackbar } = props;
  
  useEffect(() => {
    (async() => {
      const _unidades = await readUnidades();
      setUnidades(_unidades);
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
            createFormatos({
              data: {
                ...data,
                codigo_unidad_emisora: data.codigo_unidad_emisora || ''
              },
            }, onError)
          }}
          onUpdate={(data, onError) => {
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
