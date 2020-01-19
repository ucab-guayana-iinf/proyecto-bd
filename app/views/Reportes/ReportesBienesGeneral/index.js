import React, {Fragment, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Collapse } from '@material-ui/core';
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

const getReporteGeneral = async (flag = 0) => {
  const bienes = await readBienes();
  const bienesNaturales = await readBienesNaturales();
  const activosTangibles = await readActivosTangibles();
  const activosIntangibles = await readActivosIntangibles();
  const edificaciones = await readEdificaciones();
  const unidades = await readUnidades();
  const empleados = await readEmpleados();

  const _bienes = bienes.map((bien) => {
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
    const responsable = empleados.find(({ci}) => ci === unidad.ci_jefe);

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
    bienes: _bienes,
    count: {
      total: bienes.length,
      totalBienesNaturales: bienesNaturales.length,
      totalActivosTangibles: activosTangibles.length,
      totalActivosIntangibles: activosIntangibles.length,
      totalEdificaciones: edificaciones.length,
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
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [bienesN, toggleBienesN] = useState(false);

  useEffect(() => {
    (async () => {
      setData((await getReporteGeneral()));
    })();
  }, []);

  if (!data) return 'Cargando...';

  const {
    count,
    bienes,
    bienesNaturales,
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

        {total && (
          <Table
            headers={headers}
            data={async () => getReporteGeneral(1)}
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
              Toolbar: () => null,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ReportesBienesGeneral;
