import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Table } from '../../components';
import {
  createFacturasActivosTangibles,
  readFacturasActivosTangibles,
  updateFacturasActivosTangibles,
  deleteFacturasActivosTangibles,
  readActivosTangibles,
} from '../../../db/lib/querys';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Facturas = (props) => {
  const classes = useStyles();
  const [activos, setActivos] = useState([]);
  const { enqueueSnackbar } = props;

  useEffect(() => {
    (async() => {
      const _activos = await readActivosTangibles();
      setActivos(_activos);
    })()
  }, []);

  const headers = [
    { title: 'Número de Factura', field: 'numero_factura', editable: 'onAdd', editComponent: (props) => {
      return (
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value || ''}
          onChange={(e) => props.onChange(e.target.value)}
        >
          {activos.map((activo) => (
            <MenuItem key={activo.numero_factura} value={activo.numero_factura}>
              {activo.numero_factura}
            </MenuItem>
          ))}
        </Select>
      );
    }},
    { title: 'Número de Orden', field: 'numero_orden', type: 'numeric', editable: 'never' },
    { title: 'Proveedor', field: 'proveedor' },
    { title: 'Precio de Compra', field: 'precio_compra', type: 'numeric' },
    { title: 'Plazo de Garantía', field: 'plazo_garantia', type: 'numeric' },
  ];

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Table
          title="Facturas Activos Tangibles"
          headers={headers}
          data={readFacturasActivosTangibles}
          selection
          onAdd={(data, onError) => {
            createFacturasActivosTangibles({
              data: {
                ...data,
                numero_factura: data.numero_factura || ''
              },
            }, onError)
          }}
          onUpdate={(data, onError) => {
            console.log('data: ', data);
            updateFacturasActivosTangibles({
              data,
              value: data.numero_factura,
            },
            onError);
          }}
          onDelete={(data, onError) => {
            deleteFacturasActivosTangibles({
              data,
              value: data.numero_factura
            }, onError)
          }}
        />
      </div>
    </div>
  );
};

export default Facturas;
