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
      render: (data) => {
        const row = formatos.find(({ numero_formato }) => numero_formato === data.numero_formato);
        return (
          <span>
            {(row && row.numero_formato) || ''}
          </span>
        );
      },
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
      render: (data) => {
        const row = activosTangibles.find(({ codigo_bien }) => codigo_bien === data.codigo_bien_tangible);
        return (
          <span>
            {(row && row.codigo_bien) || ''}
          </span>
        );
      },
      editComponent: (props) => {
      return (
        <Select
          value={props.value || ''}
          onChange={(e) => props.onChange(e.target.value)}
        >
          {activosTangibles.map((activo) => (
            <MenuItem key={activo.codigo_bien} value={activo.codigo_bien}>
              {activo.codigo_bien}
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
            const {
               numero_formato,
               codigo_bien_tangible
            } = data;

            updateMovilizacionesTangibles({
              data,
              conditions: {
                 numero_formato,
                 codigo_bien_tangible
               }

            }, onError);
          }}
          onDelete={(data, onError) => {
            const {
               numero_formato,
               codigo_bien_tangible
            } = data;

            deleteMovilizacionesTangibles({
              data,
              conditions: {
                 numero_formato,
                 codigo_bien_tangible
               }

            }, onError);
          }}
        />
      </div>
    </div>
  );
};

export default MovilizacionesTangibles;
