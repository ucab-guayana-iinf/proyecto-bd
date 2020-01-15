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
  createComponentesxComponentes,
  readComponentesxComponentes,
  updateComponentesxComponentes,
  deleteComponentesxComponentes,
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
  const [components, setComponents] = useState([]);
  const [compXcomp, setCompXComp] = useState([]);

  useEffect(() => {
    (async() => {
      const _bienes = await readBienes();
      const _components = await readComponentes();
      const _compXcomp = await readComponentesxComponentes();
      setBienes(_bienes);
      setComponents(_components);
      setCompXComp(_compXcomp);
    })()
  }, []);

  const headers = [
    { title: 'Código Bien', field: 'codigo_bien', cellStyle: { width: '180px' },
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
    { title: 'Código Componente', field: 'codigo_componente', type: 'numeric', editable: 'never', cellStyle: { width: '150px'} },
    { title: 'Nombre Componente', field: 'nombre_componente', cellStyle: { width: '150px'} },
  ];

  const getData = async () => {
    const data = [];

    components.forEach((component) => {
      const {
        codigo_componente,
      } = component;

      const childrenComponents = compXcomp.findAll(({ codigo_componente_padre }) => codigo_componente_padre === codigo_componente);

      if (childrenComponents) {
        childrenComponents.forEach((childrenComponent) => {
          const childrenComponentData = components.find(({ codigo_componente }) => codigo_componente === childrenComponent.codigo_componente);
          data.push({
            ...childrenComponentData,
            parent: codigo_componente,
          })
        })
      } else {
        data.push(component);
      }
    });
    console.log(data);

    return data;
  };

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Table
          title="Componentes"
          headers={headers}
          data={getData}
          parentChildData={(row, rows) => rows.find(a => a.codigo_componente === row.parent)}
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
              conditions: {
                 Pk1: data.codigo_componente,
                 Pk2: data.codigo_bien
               }
            },
            onError);
          }}
          onDelete={(data, onError) => {
            deleteComponentes({
              data,
              conditions: {
                 Pk1: data.codigo_componente,
                 Pk2: data.codigo_bien
               }
            }, onError)
          }}
        />
      </div>
    </div>
  );
};

export default Componentes;
