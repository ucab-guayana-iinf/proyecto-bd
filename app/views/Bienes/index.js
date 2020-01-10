import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Table } from '../../components';
import {
  createBienes,
  readBienes,
  updateBienes,
  deleteBienes,
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

const Bienes = (props) => {
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
    { title: 'Código Bien', field: 'codigo_bien', type: 'numeric' },
    { title: 'Descripción', field: 'descripcion' },
    { title: 'Fecha de Incorporación', field: 'fecha_incorporacion', editable: 'never' },
    { title: 'Fecha de Desincorporación', field: 'fecha_desincorporacion', editable: 'never' },
    { title: 'Origen', field: 'origen' },
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
    { title: 'Tipo', field: 'tipo' },
  ];

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Table
          title="Bienes"
          headers={headers}
          data={readBienes}
          selection
          onAdd={(data, onError) => {
            createBienes({
              data: {
                ...data,
                fecha_incorporacion: null,
                fecha_desincorporacion: null,
                codigo_unidad: data.codigo_unidad || 0
              },
            }, onError)
          }}
          onUpdate={(data, onError) => {
            updateBienes({
              data,
              value: data.codigo_bien,
            },
            onError);
          }}
          onDelete={(data, onError) => {
            deleteBienes({
              data,
              value: data.codigo_bien
            }, onError)
          }}
        />
      </div>
    </div>
  );
};

export default Bienes;
