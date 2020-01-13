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
import { jsDatetimeToMysql } from '../../../db/utils';

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
  const tiposBienes = [
    'ACTIVO TANGIBLE',
    'ACTIVO INTANGIBLE',
    'EDIFICACION',
    'BIEN NATURAL',
  ];

  useEffect(() => {
    (async() => {
      const _unidades = await readUnidades();
      setUnidades(_unidades);
    })()
  }, []);

  const headers = [
    { title: 'Código Bien', field: 'codigo_bien', type: 'numeric', editable: 'never' },
    { title: 'Descripción', field: 'descripcion' },
    { title: 'Fecha de Incorporación', field: 'fecha_incorporacion', type: 'date' },
    { title: 'Fecha de Desincorporación', field: 'fecha_desincorporacion', type: 'date' },
    { title: 'Origen', field: 'origen' },
    { title: 'Unidad', field: 'codigo_unidad', cellStyle: { width: '-webkit-fill-available' },
      render: (data) => {
        const row = unidades.find(({ codigo_unidad }) => codigo_unidad === data.codigo_unidad);
        return (
          <span>
            {row.codigo_unidad} - {row.nombre_unidad}
          </span>
        );
      }, editComponent: (props) => {
      return (
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value || ''}
          onChange={(e) => props.onChange(e.target.value)}
        >
          {unidades.map((unidad) => (
            <MenuItem key={unidad.codigo_unidad} value={unidad.codigo_unidad}>
              {row.codigo_unidad} {unidad.nombre_unidad}
            </MenuItem>
          ))}
        </Select>
      );
    }},
    { title: 'Tipo', field: 'tipo', editComponent: (props) => {
      return (
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value || ''}
          onChange={(e) => props.onChange(e.target.value)}
        >
          {tiposBienes.map((tipoBien) => (
            <MenuItem key={tipoBien} value={tipoBien}>
              {tipoBien}
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
          title="Bienes"
          headers={headers}
          data={readBienes}
          selection
          onAdd={(data, onError) => {
            createBienes({
              data: {
                ...data,
                fecha_incorporacion: jsDatetimeToMysql(data.fecha_incorporacion) || null,
                fecha_desincorporacion: jsDatetimeToMysql(data.fecha_desincorporacion) || null,
                codigo_unidad: data.codigo_unidad || 0,
                status: data.tipo || ''
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
