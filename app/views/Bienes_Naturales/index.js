import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Table } from '../../components';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {
  createBienesNaturales,
  readBienesNaturales,
  updateBienesNaturales,
  deleteBienesNaturales,
  createFotografiaBienesNaturales,
  updateFotografiasBienesNaturales,
  readFotografiasBienesNaturales,
  deleteFotografiasBienesNaturales,
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

const BienesNaturales = (props) => {
  const classes = useStyles();
  const [bienes, setBienes] = useState([]);
  const { enqueueSnackbar } = props;
  const periodoFloral = [
    'PRIMAVERA',
    'VERANO',
    'OTOÑO',
    'INVIERNO'
  ];
  const status = [
    'EN PROCESO DE REGISTRO',
    'PLANTADO',
    'ENFERMO',
    'EXTINTO'
  ];

  useEffect(() => {
    (async() => {
      const _bienes = await readBienes();
      setBienes(_bienes);
    })()
  }, []);

  const headers = [
    // { title: 'Avatar', field: 'imageUrl',
    //   render: (data) => {
    //     <img src={data.fotografia} style={{width: 40, borderRadius: '50%'}}/>
    // }},
    { title: 'Código Bien', field: 'codigo_bien', cellStyle: { width: '-webkit-fill-available' },
      render: (data) => {
        const row = bienes.find(({ codigo_bien }) => codigo_bien === data.codigo_bien);
        return (
          <span>
            {row.codigo_bien} - {row.descripcion}
          </span>
        );
      },
      editComponent: (props) => {
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
    { title: 'Nombre Científico', field: 'nombre_cientifico', cellStyle: { width: '-webkit-fill-available'} },
    { title: 'Nombre Vulgar', field: 'nombre_vulgar', cellStyle: { width: '-webkit-fill-available'} },
    { title: 'Frutal', field: 'es_frutal', cellStyle: { width: '-webkit-fill-available'}, editComponent: (props) => {
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
      { title: 'Periodo Floral', field: 'periodo_floral', editComponent: (props) => {
        return (
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.value || ''}
            onChange={(e) => props.onChange(e.target.value)}
          >
            {periodoFloral.map((periodo) => (
              <MenuItem key={periodo} value={periodo}>
                {periodo}
              </MenuItem>
            ))}
          </Select>
        );
      }},
      { title: 'Origen', field: 'origen', cellStyle: { width: '-webkit-fill-available'} },
      { title: 'Ubicación', field: 'ubicacion', cellStyle: { width: '-webkit-fill-available'} },
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
          title="Bienes Naturales"
          headers={headers}
          data={readBienesNaturales}
          selection
          onAdd={(data, onError) => {
            createBienesNaturales({
              data: {
                ...data,
                codigo_bien: data.codigo_bien || '',
                periodo_floral: data.periodo_floral || '',
                status: data.status || ''
              },
            }, onError)
          }}
          onUpdate={(data, onError) => {
            updateBienesNaturales({
              data,
              value: data.codigo_bien,
            },
            onError);
          }}
          onDelete={(data, onError) => {
            deleteBienesNaturales({
              data,
              value: data.codigo_bien
            }, onError)
          }}
        />
      </div>
    </div>
  );
};

export default BienesNaturales;
