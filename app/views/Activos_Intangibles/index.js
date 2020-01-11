import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Table } from '../../components';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {
  createActivosIntangibles,
  updateActivosIntangibles,
  readActivosIntangibles,
  deleteActivosIntangibles,
  readBienes,
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

const ActivosIntangibles = (props) => {
  const classes = useStyles();
  const [bienes, setBienes] = useState([]);
  const { enqueueSnackbar } = props;
  const status = [
    'EN PROCESO DE REGISTRO',
    'VIGENTE',
    'VENCIDA',
    'DESINCORPORADO'
  ];

  useEffect(() => {
    (async() => {
      const _bienes = await readBienes();
      setBienes(_bienes);
    })()
  }, []);

  const headers = [
    { title: 'Código Bien', field: 'codigo_bien', editComponent: (props) => {
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
    { title: 'Fecha de Caducidad', field: 'fecha_caducidad', type: 'date' },
    { title: 'Compartido', field: 'es_compartido', editComponent: (props) => {
        return (
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={props.value || false}
                  onChange={(e) => props.onChange(!props.value)}
                />
              }
            />
          </FormGroup>
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
          title="Activos Intangibles"
          headers={headers}
          data={readActivosIntangibles}
          selection
          onAdd={(data, onError) => {
            createActivosIntangibles({
              data: {
                ...data,
                es_compartido: data.es_compartido || false,
                fecha_caducidad: jsDatetimeToMysql(data.fecha_caducidad) || null,
                codigo_bien: data.codigo_bien || '',
                status: data.status || ''
              },
            }, onError)

          }}
          onUpdate={(data, onError) => {
            updateActivosIntangibles({
              data,
              value: data.codigo_bien,
            },
            onError);
          }}
          onDelete={(data, onError) => {
            deleteActivosIntangibles({
              data,
              value: data.codigo_bien,
            }, onError)
          }}
        />
      </div>
    </div>
  );
};

export default ActivosIntangibles;
