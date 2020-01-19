import React, {Fragment, useEffect, useState, useRef} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Select, MenuItem } from '@material-ui/core';
import {Table} from '../../../components';
import {
  readUnidades,
  readSedes,
  readEmpleados,
  readBienes,
  readBienesNaturales,
  readActivosTangibles,
  readActivosIntangibles,
  readEdificaciones,
} from '../../../../db/lib/querys';

const headers = [
  { field: 'codigo_bien', title: 'Bien', },
  { field: 'descripcion', title: 'Nombre', },
  { field: 'fecha_incorporacion', title: 'Incorporacion', },
  { field: 'fecha_desincorporacion', title: 'Desincorporación', },
  { field: 'unidad', title: 'Unidad', },
  { field: 'origen', title: 'Origen', },
  { field: 'tipo', title: 'Tipo', },
  { field: 'ci_jefe', title: 'Responsable Primario', },
  { field: 'ci_responsable', title: 'Responsable', },
]

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  }
}));

const getReporteGeneral = async (flag = 0, codigoSede) => {
  const bienes = await readBienes();
  const bienesNaturales = await readBienesNaturales();
  const activosTangibles = await readActivosTangibles();
  const activosIntangibles = await readActivosIntangibles();
  const edificaciones = await readEdificaciones();
  const unidades = await readUnidades();
  const empleados = await readEmpleados();
  const sedes = await readSedes();

  const filterBySede = (bien) => {
    const unidad = unidades.find(({codigo_unidad}) => codigo_unidad === bien.codigo_unidad);
    return unidad.codigo_sede === codigoSede;
  };

  const _bienes = bienes.filter(filterBySede).map((bien) => {
    const {
      codigo_bien,
      descripcion,
      fecha_incorporacion,
      fecha_desincorporacion,
      origen,
      tipo,
      ci_responsable,
    } = bien;

    const unidad = unidades.find(({codigo_unidad}) => codigo_unidad === bien.codigo_unidad);

    return {
      codigo_bien,
      descripcion,
      fecha_incorporacion: (fecha_incorporacion && fecha_incorporacion.toString()) || 'N/A',
      fecha_desincorporacion: (fecha_desincorporacion && fecha_desincorporacion.toString()) || 'N/A',
      unidad: unidad.nombre_unidad,
      origen,
      tipo: tipo || 'N/A',
      ci_jefe: unidad.ci_jefe || 'N/A',
      ci_responsable: ci_responsable || 'N/A',
    }
  });

  if (flag) return _bienes;

  return {
    sedes,
    bienes: _bienes,
    count: {
      total: (bienes.filter(filterBySede)).length,
      totalBienesNaturales: (bienes.filter(filterBySede).filter(({tipo}) => tipo === 'BIEN NATURAL')).length,
      totalActivosTangibles: (bienes.filter(filterBySede).filter(({tipo}) => tipo === 'ACTIVO TANGIBLE')).length,
      totalActivosIntangibles: (bienes.filter(filterBySede).filter(({tipo}) => tipo === 'ACTIVO INTANGIBLE')).length,
      totalEdificaciones: (bienes.filter(filterBySede).filter(({tipo}) => tipo === 'EDIFICACION')).length,
    }
  };
}

const Value = ({children, amount}) => (
  <Fragment>
    <span>
      {children}{' '}
      <strong>
        {amount}
      </strong>
    </span>
  </Fragment>
);

const ReportesBienesGeneral = () => {
  const tableRef = useRef(null);
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [bienesN, toggleBienesN] = useState(false);
  const [codigoSede, setCodigoSede] = useState(null);

  useEffect(() => {
    (async () => {
      setData((await getReporteGeneral()));
      tableRef.current.onQueryChange();
    })();
  }, []);

  if (!data) return 'Cargando...';

  const {
    count,
    bienes,
    bienesNaturales,
    sedes,
  } = data;
  const {
    total,
    totalBienesNaturales,
    totalActivosTangibles,
    totalActivosIntangibles,
    totalEdificaciones,
  } = count;

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <h1>
          Reporte General de los Bienes
        </h1>
        <br />

        <Value amount={total}>
          Total de bienes
        </Value>

        <Value amount={totalBienesNaturales}>
          Total bienes naturales
        </Value>

        <Value amount={totalActivosTangibles}>
          Total activos tangibles
        </Value>

        <Value amount={totalActivosIntangibles}>
          Total activos intangibles
        </Value>

        <Value amount={totalEdificaciones}>
          Total edificaciones
        </Value>

        {data && (
          <Table
            tableRef={tableRef}
            headers={headers}
            data={async () => {
              const data = await getReporteGeneral(1, codigoSede)
              return data;
            }}
            style={{ marginTop: 20 }}
            localization={{
              header : {
                 actions: ''
              }
            }}
            options={{
              search: false,
              paging: false,
            }}
            components={{
              Actions: () => null,
              Action: () => null,
              Toolbar: () => (
                <div style={{margin: '2em 0 0 2em'}}>
                  <span>
                    Sede:{' '}
                  </span>
                  {data && sedes && (
                    <Select
                      value={codigoSede}
                      onChange={async (e) => {
                        setCodigoSede(e.target.value);
                        setData((await getReporteGeneral(0, e.target.value)));
                        tableRef.current.onQueryChange();
                      }}
                    >
                      {sedes.map((sede) => (
                        <MenuItem key={sede.codigo_sede} value={sede.codigo_sede}>
                          {sede.codigo_sede} - {sede.descripcion}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </div>
              ),
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ReportesBienesGeneral;
