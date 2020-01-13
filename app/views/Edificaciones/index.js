import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Table } from '../../components';
import {
  createEdificaciones,
  readEdificaciones,
  updateEdificaciones,
  deleteEdificaciones,
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

const Edificaciones = (props) => {
  const classes = useStyles();
  const [bienes, setBienes] = useState([]);
  const { enqueueSnackbar } = props;
  const tiposPropiedades = [ 'PROPIA', 'COMODATO' ];
  const status = [
    'EN PROCESO DE REGISTRO',
    'EN CONSTRUCCIÓN',
    'HABITADA',
    'DESHABITADA',
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
    { title: 'Ubicacion', field: 'ubicacion', cellStyle: { width: '150px'} },
    { title: 'Superficie', field: 'superficie', type: 'numeric', cellStyle: { width: '-webkit-fill-available'} },
    { title: 'Tipo de Propiedad', field: 'tipo_propiedad', editComponent: (props) => {
      return (
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value || ''}
          onChange={(e) => props.onChange(e.target.value)}
        >
          {tiposPropiedades.map((tipoPropiedad) => (
            <MenuItem key={tipoPropiedad} value={tipoPropiedad}>
              {tipoPropiedad}
            </MenuItem>
          ))}
        </Select>
      );
    }},
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
          title="Edificaciones"
          headers={headers}
          data={readEdificaciones}
          selection
          onAdd={(data, onError) => {
            createEdificaciones({
              data: {
                ...data,
                codigo_bien: data.codigo_bien || '',
                tipo_propiedad: data.tipo_propiedad || '',
                status: data.status || ''
              },
            }, onError)
          }}
          onUpdate={(data, onError) => {
            updateEdificaciones({
              data,
              value: data.codigo_bien,
            },
            onError);
          }}
          onDelete={(data, onError) => {
            deleteEdificaciones({
              data,
              value: data.codigo_bien
            }, onError)
          }}
        />
      </div>
    </div>
  );
};

export default Edificaciones;
