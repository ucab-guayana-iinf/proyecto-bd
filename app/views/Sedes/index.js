import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Table } from '../../components';
import {
  createSedes,
  readSedes,
  updateSedes,
  deleteSedes,
  readUbicaciones,
} from '../../../db/lib/querys';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Sedes = (props) => {
  const classes = useStyles();
  const [ubicaciones, setUbicaciones] = useState([]);
  const { enqueueSnackbar } = props;

  useEffect(() => {
    (async() => {
      const _ubicaciones = await readUbicaciones();
      setUbicaciones(_ubicaciones);
    })()
  }, []);

  const headers = [
    { title: 'Código sede', field: 'codigo_sede', type: 'numeric', editable: 'never', cellStyle: { width: '150px'} },
    { title: 'Descripción', field: 'descripcion', cellStyle: { width: '-webkit-fill-available'} },
    { title: 'Dirección', field: 'codigo_ubicacion', cellStyle: { width: '-webkit-fill-available' },
      render: (data) => {
        const row = ubicaciones.find(({ codigo_ubicacion }) => codigo_ubicacion === data.codigo_ubicacion);
        return (
          <span>
            {row.direccion} - {row.nombre_ciudad}
          </span>
        );
      },
      editComponent: (props) => {
      return (
        <Select
          value={props.value || ''}
          onChange={(e) => props.onChange(e.target.value)}
        >
          {ubicaciones.map((ubicacion) => (
            <MenuItem key={ubicacion.codigo_ubicacion} value={ubicacion.codigo_ubicacion}>
              {ubicacion.direccion} {ubicacion.nombre_ciudad}
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
          title="Sedes"
          headers={headers}
          data={readSedes}
          selection
          onAdd={(data, onError) => {
            createSedes({
              data: {
                ...data,
                codigo_ubicacion: data.codigo_ubicacion || ''
              },
            }, onError)
          }}
          onUpdate={(data, onError) => {
            updateSedes({
              data,
              value: data.codigo_sede,
            },
            onError);
          }}
          onDelete={(data, onError) => {
            deleteSedes({
              data,
              value: data.codigo_sede
            }, onError)
          }}
        />
      </div>
    </div>
  );
};

export default Sedes;
