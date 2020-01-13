import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Table } from '../../components';
import {
  createActivosTangibles,
  updateActivosTangibles,
  readActivosTangibles,
  deleteActivosTangibles,
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

const Tangibles = (props) => {
  const classes = useStyles();
  const [bienes, setBienes] = useState([]);
  const { enqueueSnackbar } = props;
  const status = [
    'EN PROCESO DE REGISTRO',
    'ACTIVO',
    'DAÑADO',
    'OBSOLETO',
    'EN PREPARACIÓN',
    'DESINCORPORADO'
  ];

  useEffect(() => {
    (async() => {
      const _bienes = await readBienes();
      setBienes(_bienes);
    })()
  }, []);

  const headers = [
    { title: 'Código Bien', field: 'codigo_bien', cellStyle: { width: '-webkit-fill-available' },
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
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.value || ''}
            onChange={(e) => props.onChange(e.target.value)}
          >
            {bienes.map((bien) => (
              <MenuItem key={bien.codigo_bien} value={bien.codigo_bien}>
                {bien.descripcion}
              </MenuItem>
            ))}
          </Select>
        );
    }},
    { title: 'Número de Factura', field: 'numero_factura', type: 'numeric', editable: 'onAdd' },
    { title: 'Status', field: 'status', editComponent: (props) => {
      return (
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value || ''}
          onChange={(e) => props.onChange(e.target.value)}
        >
          {status.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
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
          title="Activos Tangibles"
          headers={headers}
          data={readActivosTangibles}
          selection
          onAdd={(data, onError) => {
            createActivosTangibles({
              data: {
                ...data,
                codigo_bien: data.codigo_bien || '',
                status: data.status || ''
              },
            }, onError)
          }}
          onUpdate={(data, onError) => {
            updateActivosTangibles({
              data,
              value: data.codigo_bien,
            },
            onError);
          }}
          onDelete={(data, onError) => {
            deleteActivosTangibles({
              data,
              value: data.codigo_bien
            }, onError)
          }}
        />
      </div>
    </div>
  );
};

export default Tangibles;
