import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Table } from '../../components';
import {
  createBienes,
  readBienes,
  updateBienes,
  deleteBienes,
  createHistorialResponsableDeUso,
  readHistorialResponsableDeUso,
  updateHistorialResponsableDeUso,
  deleteHistorialResponsableDeUso,
  readUnidades,
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

const Bienes = (props) => {
  const classes = useStyles();
  const [unidades, setUnidades] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [bienes, setBienes] = useState([]);
  const tiposBienes = [
    'ACTIVO TANGIBLE',
    'ACTIVO INTANGIBLE',
    'EDIFICACION',
    'BIEN NATURAL',
  ];

  const init = async () => {
    const _unidades = await readUnidades();
    const _empleados = await readEmpleados();
    const _bienes = await readBienes();
    setUnidades(_unidades);
    setEmpleados(_empleados);
    setBienes(_bienes);
  }

  useEffect(() => {
    (async() => {
      await init();
    })()
  }, []);

  const headers = [
    { title: 'Código Bien', field: 'codigo_bien', type: 'numeric', editable: 'never' },
    { title: 'Descripción', field: 'descripcion' },
    { title: 'Origen', field: 'origen' },
    { title: 'Unidad', field: 'codigo_unidad', cellStyle: { width: '-webkit-fill-available' },
      render: (data) => {
        const row = unidades.find(({ codigo_unidad }) => codigo_unidad === data.codigo_unidad);
        if (!row) {
          return null;
        }
        return (
          <span>
            {row.codigo_unidad} - {row.nombre_unidad}
          </span>
        );
      }, editComponent: (props) => {
      return (
        <Select
          value={props.value || ''}
          onChange={(e) => props.onChange(e.target.value)}
        >
          {unidades.map((unidad) => (
            <MenuItem key={unidad.codigo_unidad} value={unidad.codigo_unidad}>
              {unidad.codigo_unidad} {unidad.nombre_unidad}
            </MenuItem>
          ))}
        </Select>
      );
    }},
    { title: 'Tipo', field: 'tipo', editComponent: (props) => {
      return (
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value || ''}
          onChange={(e) => props.onChange(e.target.value)}
        >
          {tiposBienes.map((tipoBien) => (
            <MenuItem key={tipoBien} value={tipoBien}>
              {tipoBien}
            </MenuItem>
          ))}
        </Select>
      );
    }},
    { title: 'Responsable', field: 'ci_responsable',
      render: (data) => {
        const row = empleados.find(({ ci }) => ci === data.ci_responsable);
        if (!row) {
          return null;
        }
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
          {empleados.map((empleado) => {
            if (props.rowData.codigo_unidad === empleado.codigo_unidad)
              return (
                <MenuItem key={empleado.ci} value={empleado.ci}>
                  {empleado.ci} - {empleado.nombre_completo}
                </MenuItem>
              );
          })}
        </Select>
      );
    }},
    { title: 'Fecha de Incorporación', field: 'fecha_incorporacion', type: 'date' },
    { title: 'Fecha de Desincorporación', field: 'fecha_desincorporacion', type: 'date' },
  ];

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Table
          title="Bienes"
          headers={headers}
          data={readBienes}
          selection
          onAdd={(data, onError) => {
            if (!data.ci_responsable) {
              delete data.ci_responsable;
            }
            if (data.fecha_desincorporacion) {
              data.fecha_desincorporacion = jsDatetimeToMysql(data.fecha_desincorporacion);
            } else {
              delete data.fecha_desincorporacion;
            }
            if (data.fecha_incorporacion) {
              data.fecha_incorporacion = jsDatetimeToMysql(data.fecha_incorporacion)
            } else {
              delete data.fecha_incorporacion;
            }
            createBienes({ data }, onError);
          }}
          onUpdate={(data, onError, oldData) => {
            const ci = data.ci_responsable;
            const codigo_bien = data.codigo_bien;

            if (data.ci_responsable) {
              if (oldData.ci_responsable) {
                if (oldData.ci_responsable !== data.ci_responsable) {
                  // actualizar el responsable de uso en el historial
                  updateHistorialResponsableDeUso({
                    conditions: {
                       ci,
                       codigo_bien
                     }
                  }, onError);
                }
              } else {
                // crear el ci_responsable en el historial
                createHistorialResponsableDeUso({
                  ci: ci || '',
                  codigo_bien: codigo_bien || ''
                }, onError);
              }
            } else {
              delete data.ci_responsable;
            }

            if (!data.fecha_incorporacion) {
              delete data.fecha_incorporacion;
            } else {
              data.fecha_incorporacion = jsDatetimeToMysql(data.fecha_incorporacion);
            }
            if (!data.fecha_desincorporacion) {
              delete data.fecha_desincorporacion;
            } else {
              data.fecha_desincorporacion = jsDatetimeToMysql(data.fecha_desincorporacion);
            }
            updateBienes({
              data,
              value: data.codigo_bien,
            },
            onError);
          }}
          onDelete={(data, onError) => {
            if (data.ci_responsable){
              const ci = data.ci_responsable;
              const codigo_bien = data.codigo_bien;

              deleteHistorialResponsableDeUso({
                data,
                conditions: {
                   ci,
                   codigo_bien
                 }
              }, onError);
            }
            deleteBienes({
              data,
              value: data.codigo_bien
            }, onError)
          }}
        />
      </div>
    </div>
  );
};

export default Bienes;
