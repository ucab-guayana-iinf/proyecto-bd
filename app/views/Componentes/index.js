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

const Componentes = () => {
  const classes = useStyles();
  const [bienes, setBienes] = useState([]);
  const [components, setComponents] = useState([]);
  const [compXcomp, setCompXComp] = useState([]);

  const init = async () => {
    const _bienes = await readBienes();
    const _components = await readComponentes();
    const _compXcomp = await readComponentesxComponentes();
    setBienes(_bienes);
    setComponents(_components);
    setCompXComp(_compXcomp);
  };

  useEffect(() => {
    (async() => {
      await init();
    })()
  }, []);

  const headers = [
    { title: 'Código Bien', field: 'codigo_bien', cellStyle: { width: '180px' },
      render: (data) => {
        const row = bienes.find(({ codigo_bien }) => codigo_bien === data.codigo_bien);
        if (!row) {
          return null;
        }
        return (
          <span>
            {row.codigo_bien}{' '}-{' '}{row.descripcion}
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
    {
      title: 'Componente Padre', field: 'codigo_componente_padre', cellStyle: { width: '150px' },
      render: ({ codigo_componente_padre }) => (
        <span>
          {codigo_componente_padre || 'N/A'}
        </span>
      ),
      addComponent: (props) => {
        <Select
          value={props.value || 'N/A'}
          onChange={(e) => props.onChange(e.target.value)}
        >
          <MenuItem key="N/A" value="N/A">
            N/A
          </MenuItem>
          {components.map((component) => (
            <MenuItem key={component.codigo_componente} value={component.codigo_componente}>
              {component.codigo_componente} - {component.nombre_componente}
            </MenuItem>
          ))}
        </Select>
      },
      editComponent: (props) => (
        <Select
          value={props.value || 'N/A'}
          onChange={(e) => props.onChange(e.target.value)}
        >
          <MenuItem key="N/A" value="N/A">
            N/A
          </MenuItem>
          {components.filter(({ codigo_componente }) => codigo_componente !== props.rowData.codigo_componente).map((component) => (
            <MenuItem key={component.codigo_componente} value={component.codigo_componente}>
              {component.codigo_componente} - {component.nombre_componente}
            </MenuItem>
          ))}
        </Select>
      ),
    },
  ];

  const getData = async () => {
    const _components = await readComponentes();
    const _children = await readComponentesxComponentes();

    const data = _components.map((component) => {
      if (_children) {
        const parent = _children.find(({ codigo_componente }) => codigo_componente === component.codigo_componente);

        if (parent) {
          component.codigo_componente_padre = parent.codigo_componente_padre;
        }
      }

      return component;
    });

    console.log('data');
    console.table(data);

    return data;
  };

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Table
          title="Componentes"
          headers={headers}
          data={getData}
          onAdd={async (data, onError) => {
            const {
              codigo_componente_padre,
              ...rest
            } = data;

            const { insertId: codigo_componente } = await createComponentes({
              data: {
                ...rest,
                codigo_bien: (data && data.codigo_bien) || ''
              },
            }, onError);
            
            if (codigo_componente_padre && codigo_componente_padre !== 'N/A') {
              await createComponentesxComponentes({
                data: {
                  codigo_componente,
                  codigo_componente_padre,
                },
              }, onError);
            }
            
            await init();
          }}
          onUpdate={async (data, onError, oldData) => {
            const {
              codigo_bien,
              codigo_componente,
              codigo_componente_padre,
              nombre_componente,
            } = data;

            if (codigo_componente_padre === 'N/A' && oldData.codigo_componente_padre === 'N/A') {
              console.log('prev was N/A, new is N/A')
            }

            if (
              (codigo_componente_padre !== 'N/A' && oldData.codigo_componente_padre === 'N/A')
              || (!oldData.codigo_componente_padre && codigo_componente_padre && codigo_componente_padre !== 'N/A')
            ) {
              console.log('prev was N/A, new is a value')
              await createComponentesxComponentes({
                data: {
                  codigo_componente,
                  codigo_componente_padre,
                },
              }, onError);
            }

            if (codigo_componente_padre === 'N/A' && oldData.codigo_componente_padre !== 'N/A') {
              console.log('prev was a value, new is N/A')
              const itExists = compXcomp.find(({ codigo_componente_padre, codigo_componente }) =>
                codigo_componente_padre === oldData.codigo_componente_padre
                && codigo_componente === oldData.codigo_componente
              );
              console.log(itExists);
              if (itExists) {
                console.log('it exists');
                await deleteComponentesxComponentes({
                  data,
                  conditions: {
                    codigo_componente: oldData.codigo_componente,
                    codigo_componente_padre: oldData.codigo_componente_padre,
                  },
                }, onError);
              } else {
                console.log('it is not in compXcomp');
              }
            }

            if (
              codigo_componente_padre && codigo_componente_padre !== 'N/A'
              && oldData.codigo_componente_padre && oldData.codigo_componente_padre !== 'N/A'
            ) {
              console.log('prev was a value, new is a value')
              await updateComponentesxComponentes({
                data,
                conditions: {
                  codigo_componente: oldData.codigo_componente,
                  codigo_componente_padre: oldData.codigo_componente_padre,
                },
              }, onError);
            }

            await updateComponentes({
              data,
              conditions: {
                codigo_componente,
                codigo_bien,
                nombre_componente
              }
            }, onError);

            await init();
          }}
          onDelete={async (data, onError) => {
            const {
              codigo_bien,
              codigo_componente,
              codigo_componente_padre,
            } = data;

            if (codigo_componente_padre && codigo_componente_padre !== 'N/A') {
              await deleteComponentesxComponentes({
                data,
                conditions: {
                  codigo_componente,
                  codigo_componente_padre,
                },
              }, onError);
            }

            await deleteComponentes({
              data,
              conditions: {
                codigo_componente,
                codigo_bien,
              }
            }, onError);

            await init();
          }}
        />
      </div>
    </div>
  );
};

export default Componentes;
