import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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
  { title: 'Código ubicación', field: 'codigo_ubicacion', type: 'numeric', editable: 'never' },
  { title: 'Dirección', field: 'direccion' },
  { title: 'Ciudad', field: 'nombre_ciudad', editComponent: (props) => {
    return (
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.value || ciudadesVzla[0]}
        onChange={(e) => props.onChange(e.target.value)}
      >
        {ciudadesVzla.map(ciudad => (
          <MenuItem key={ciudad} value={ciudad}>
            {ciudad}
          </MenuItem>
        ))}
      </Select>
    );
  }},
];
const Ubicaciones = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = props;

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Table
          headers={headers}
          data={readUbicaciones}
          onAdd={(data, onError) => {
            createUbicaciones({
              data: {
                ...data,
                nombre_ciudad: data.nombre_ciudad || 'Abejales'
              },
            }, onError);
          }}
          onUpdate={(data, onError) => {
            updateUbicaciones({
              data,
              value: data.codigo_ubicacion,
            },
            onError);
          }}
          onDelete={(data, onError) => {
            deleteUbicaciones({
              data,
              value: data.codigo_ubicacion
            }, onError);
          }}
        />
      </div>
    </div>
  );
};

export default Ubicaciones;
