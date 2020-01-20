import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Table } from '../../components';
import {
  createMovilizacionesIntangibles,
  readMovilizacionesIntangibles,
  updateMovilizacionesIntangibles,
  deleteMovilizacionesIntangibles,
  readFormatos,
  readActivosIntangibles,
} from '../../../db/lib/querys';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const MovilizacionesIntangibles = (props) => {
  const classes = useStyles();
  const [formatos, setFormatos] = useState([]);
  const [activosIntangibles, setActivosIntangibles] = useState([]);
  const { enqueueSnackbar } = props;

  useEffect(() => {
    (async() => {
      const _formatos = await readFormatos();
      const _activosIntangibles = await readActivosIntangibles();
      setFormatos(_formatos);
      setActivosIntangibles(_activosIntangibles);
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
    { title: 'Código de Bien Intangible', field: 'codigo_bien_intangible', cellStyle: { width: '-webkit-fill-available' },
      render: (data) => {
        const row = activosIntangibles.find(({ codigo_bien }) => codigo_bien === data.codigo_bien_intangible);
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
          {activosIntangibles.map((activo) => (
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
          title="Movilizaciones Intangibles"
          headers={headers}
          data={readMovilizacionesIntangibles}
          selection
          onAdd={(data, onError) => {
            createMovilizacionesIntangibles({
              data: {
                ...data,
                numero_formato: data.numero_formato || '',
                codigo_bien_intangible: data.codigo_bien_intangible || ''
              },
            }, onError)
          }}
          onUpdate={(data, onError) => {
            const {
               numero_formato,
               codigo_bien_intangible
            } = data;

            updateMovilizacionesIntangibles({
              data,
              conditions: {
                numero_formato,
                codigo_bien_intangible
               }

            }, onError);
          }}
          onDelete={(data, onError) => {
            const {
               numero_formato,
               codigo_bien_intangible
            } = data;

            deleteMovilizacionesIntangibles({
              data,
              conditions: {
                numero_formato,
                codigo_bien_intangible
               }

            }, onError)
          }}
        />
      </div>
    </div>
  );
};

export default MovilizacionesIntangibles;
