import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Table } from '../../components';
import {
  createComponentes,
  readComponentes,
  updateComponentes,
  deleteComponentes,
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

const Componentes = (props) => {
  const classes = useStyles();
  const [bienes, setBienes] = useState([]);
  const { enqueueSnackbar } = props;

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
    { title: 'Código Componente', field: 'codigo_componente', type: 'numeric', editable: 'never', cellStyle: { width: '150px'} },
  ];

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Table
          title="Componentes"
          headers={headers}
          data={readComponentes}
          selection
          onAdd={(data, onError) => {
            createComponentes({
              data: {
                ...data,
                codigo_bien: data.codigo_bien || ''
              },
            }, onError)
          }}
          onUpdate={(data, onError) => {
            updateComponentes({
              data,
              value: data.codigo_componente,
            },
            onError);
          }}
          onDelete={(data, onError) => {
            deleteComponentes({
              data,
              value: data.codigo_bien
            }, onError)
          }}
        />
      </div>
    </div>
  );
};

export default Componentes;