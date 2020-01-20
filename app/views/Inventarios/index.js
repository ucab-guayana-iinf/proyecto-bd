import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Table } from '../../components';
import {
  createInventarios,
  readInventarios,
  updateInventarios,
  deleteInventarios,
  createInventariosxSedes,
  readInventariosxSedes,
  updateInventariosxSedes,
  deleteInventariosxSedes,
  readSedes,
  readEmpleados,
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

const Inventarios = (props) => {
  const classes = useStyles();
  const [empleados, setEmpleados] = useState([]);
  const [sedes, setSedes] = useState([]);
  const { enqueueSnackbar } = props;
  const status = [
    'EN EJECUCIÓN',
    'EN CONCILIACIÓN',
    'CERRADO'
  ];

  useEffect(() => {
    (async() => {
      const _empleados = await readEmpleados();
      const _sedes = await readSedes();
      setEmpleados(_empleados);
      setSedes(_sedes);
    })()
  }, []);

  const headers = [
    { title: 'Año', field: 'anio', type: 'numeric', editable: 'onAdd', cellStyle: { width: '150px'} },
    { title: 'Semestre', field: 'semestre', type: 'numeric', editable: 'onAdd', cellStyle: { width: '150px'} },
    { title: 'Fecha de Inicio', field: 'fecha_inicio', type: 'date' },
    { title: 'Fecha Final', field: 'fecha_fin', type: 'date' },
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
    { title: 'Lider de Inventario', field: 'ci_lider_inventario', cellStyle: { width: '-webkit-fill-available' },
      render: (data) => {
        const row = empleados.find(({ ci }) => ci === data.ci_lider_inventario);
        if (!row) return (<span>Por asignar</span>);
        return (
          <span>
            {row.ci} - {row.nombre_completo}
          </span>
        );
      },
      editComponent: (props) => {
        return (
          <Select
            value={props.value || ''}
            onChange={(e) => props.onChange(e.target.value)}
          >
            {empleados.map((empleado) => (
              <MenuItem key={empleado.ci} value={empleado.ci}>
                {empleado.ci} {empleado.nombre_completo}
              </MenuItem>
            ))}
          </Select>
        );
      }
    },
    { title: 'Sede', field: 'codigo_sede', cellStyle: { width: '-webkit-fill-available' },
      render: (data) => {
        const row = sedes.find(({ codigo_sede }) => codigo_sede === data.codigo_sede);
        return (
          <span>
            {(row && `${row.codigo_sede} - ${row.descripcion}`) || ''}
          </span>
        );
      },
      editComponent: (props) => {
      return (
        <Select
          value={props.value || ''}
          onChange={(e) => props.onChange(e.target.value)}
        >
          {sedes.map((sede) => (
            <MenuItem key={sede.codigo_sede} value={sede.codigo_sede}>
              {sede.codigo_sede} {sede.descripcion}
            </MenuItem>
          ))}
        </Select>
      );
    }},
  ];

  const getData = async () => {
    const _inventarios = await readInventarios();
    const _children = await readInventariosxSedes();

    const data = _inventarios.map((inventario) => {
      if (_children) {
        const parent = _children.find((sede) => (sede.anio === inventario.anio && sede.semestre === inventario.semestre));

        if (parent) {
          inventario.codigo_sede = parent.codigo_sede;
        }
      }

      return inventario;
    });

    console.log('data');
    console.table(data);

    return data;
  };

///TODO: Add redirection to table InventariosxBienes
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Table
          title="Inventarios"
          headers={headers}
          data={getData}
          selection
          onRowClick={(e,data) => console.log(`data: ${data}`)}
          onAdd={(data, onError) => {
            createInventarios({
              data: {
                ...data,
                fecha_inicio: jsDatetimeToMysql(data.fecha_inicio) || null,
                fecha_fin: jsDatetimeToMysql(data.fecha_fin) || null,
                ci_lider_inventario: data.ci_lider_inventario || ''
              },
            }, onError);
            createInventariosxSedes({
              data: {
                ...data,
                codigo_sede: data.codigo_sede || ''
              },
            }, onError)
          }}
          onUpdate={(data, onError) => {
            const {
              anio,
              semestre,
              codigo_sede,
            } = data;

            if (!data.fecha_inicio) {
              delete data.fecha_inicio;
            } else {
              data.fecha_inicio = jsDatetimeToMysql(data.fecha_inicio);
            }

            if (!data.fecha_fin) {
              delete data.fecha_fin;
            } else {
              data.fecha_fin = jsDatetimeToMysql(data.fecha_fin);
            }

            updateInventarios({
              data,
              conditions: {
                 anio,
                 semestre
               }
            },
            onError);
            updateInventariosxSedes({
              data,
              conditions: {
                 anio,
                 semestre,
                 codigo_sede,
               }
            },
            onError);
          }}
          onDelete={(data, onError) => {
            const {
              anio,
              semestre,
              codigo_sede,
            } = data;
            deleteInventarios({
              data,
              conditions: {
                 anio,
                 semestre
               }
            }, onError);
            deleteInventariosxSedes({
              data,
              conditions: {
                 anio,
                 semestre,
                 codigo_sede,
               }
            }, onError)
          }}
        />
      </div>
    </div>
  );
};

export default Inventarios;
