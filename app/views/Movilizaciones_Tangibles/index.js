import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Table } from '../../components';
import {
  createMovilizacionesTangibles,
  readMovilizacionesTangibles,
  updateMovilizacionesTangibles,
  deleteMovilizacionesTangibles,
  readFormatos,
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

const MovilizacionesTangibles = (props) => {
  const classes = useStyles();
  const [formatos, setFormatos] = useState([]);
  const [activosTangibles, setActivosTangibles] = useState([]);
  const { enqueueSnackbar } = props;
  
  useEffect(() => {
    (async() => {
      const _formatos = await readFormatos();
      const _activosTangibles = await readActivosTangibles();
      setFormatos(_formatos);
      setActivosTangibles(_activosTangibles);
    })()
  }, []);

  const headers = [
    { title: 'Número de Formato', field: 'numero_formato', cellStyle: { width: '-webkit-fill-available' },
      editComponent: (props) => {
      return (
        <Select
          value={props.value || ''}
          onChange={(e) => props.onChange(e.target.value)}
        >
          {formatos.map((formato) => (
            <MenuItem key={formato.numero_formato} value={formato.numero_formato}>
              {formato.numero_formato}
            </MenuItem>
          ))}
        </Select>
      );
    }},
    { title: 'Código de Bien Tangible', field: 'codigo_bien_tangible', cellStyle: { width: '-webkit-fill-available' },
      editComponent: (props) => {
      return (
        <Select
          value={props.value || ''}
          onChange={(e) => props.onChange(e.target.value)}
        >
          {activosTangibles.map((activo) => (
            <MenuItem key={activo.codigo_bien} value={activo.codigo_bien}>
              {activo.numero_formato}
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
          title="Movilizaciones Tangibles"
          headers={headers}
          data={readMovilizacionesTangibles}
          selection
          onAdd={(data, onError) => {
            createMovilizacionesTangibles({
              data: {
                ...data,
                numero_formato: data.numero_formato || '',
                codigo_bien_tangible: data.codigo_bien_tangible || ''
              },
            }, onError)
          }}
          onUpdate={(data, onError) => {
            updateMovilizacionesTangibles({
              conditions: {
                 Pk1: data.numero_formato,
                 Pk2: data.codigo_bien_tangible
               }

            }, onError);
          }}
          onDelete={(data, onError) => {
            deleteMovilizacionesTangibles({
              conditions: {
                 Pk1: data.numero_formato,
                 Pk2: data.codigo_bien_tangible
               }

            }, onError)
          }}
        />
      </div>
    </div>
  );
};

export default MovilizacionesTangibles;
