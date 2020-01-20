import React, {Fragment, useEffect, useState, useRef} from 'react';
import { makeStyles } from '@material-ui/styles';
import Pdf from "react-to-pdf";
import PrintIcon from '@material-ui/icons/Print';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';
import {
  readUnidades,
  readSedes,
  readEmpleados,
  readBienes,
  readBienesNaturales,
  readActivosTangibles,
  readActivosIntangibles,
  readHistorialResponsableDeUso,
  readHistorialResponsablesPrimarios,
  readMovilizacionesTangibles,
  readMovilizacionesIntangibles,
  readEdificaciones,
  readFormatos,
} from '../../../../../db/lib/querys';
import {
  mysqlDatetimeToJS,
} from '../../../../../db/utils';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    width: '1300px',
    backgroundColor: '#f4f6f8',
    height: '100vh',
  },
  content: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
}));

const encargadoHeaders = [
  'ci',
  'nombre_completo',
];
const movilizacionesHeaders = [
  'numero_formato',
  'codigo_unidad_emisora',
  'codigo_unidad_receptora',
  'ficha_responsable_cedente',
  'ficha_responsable_receptor',
  'aprobacion_emisor',
  'aprobacion_receptor',
  'fecha_formato',
];

const Historic = ({title, data, headers}) => {
  if (!data || !data.length) return null;

  return (
    <>
      <h2 style={{margin: '20px 0px'}}>
        {title}
      </h2>
      <TableContainer component={Paper} style={{boxShadow: 'none'}}>
       <Table aria-label="simple table">
         <TableRow>
           {headers.map((value) => (
              <TableCell key={value}>
                <strong>
                  {value.split('_').join(' ')}
                </strong>
              </TableCell>
           ))}
         </TableRow>
         <TableBody>
           {data.map((value, i) => (
             <TableRow key={i}>
               {Object.keys(value).map((key) => {
                 console.log(value);
                 return (
                   <TableCell key={key} scope="row">
                     <span>
                       {String(value[key])}
                     </span>
                   </TableCell>
                 );
               })}
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
   </>
 );
};

const Summary = ({data}) => {
  const classes = useStyles();

  if (!data) return null;

  console.log(data);

  return null;

  return (
    <TableContainer component={Paper} style={{boxShadow: 'none'}}>
     <Table size="small" aria-label="simple table">
       <TableBody>
         {Object.keys(data).map((key) => (
           <TableRow key={key}>
             <TableCell component="th" scope="row">
               <strong>
                 {key.split('_').join(' ')}
               </strong>
             </TableCell>
             <TableCell align="right">
               {data[key]}
             </TableCell>
           </TableRow>
         ))}
       </TableBody>
     </Table>
   </TableContainer>
  );
}

const ReporteDetalladoBien = (props) => {
  const pdfRef = useRef(null);
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    general: {},
    encargadosPrimarios: [],
    encargadosUso: [],
    movilizaciones: [],
  });
  const {
    bien,
  } = props;
  const {
    codigo_bien,
    descripcion,
    ci_responsable,
    fecha_incorporacion,
    fecha_desincorporacion,
    codigo_unidad,
    origen,
    tipo,
  } = bien || {};
  const {
    general,
    encargadosPrimarios,
    encargadosUso,
    movilizaciones,
  } = data;

  const getData = async (bien) => {
    const unidades = await readUnidades();
    const empleados = await readEmpleados();
    const formatos = await readFormatos();
    const historialRespUso = await readHistorialResponsableDeUso();
    const historialRespPrimario = await readHistorialResponsablesPrimarios();
    const movilizacionesTang = await readMovilizacionesTangibles();
    const movilizacionesIntang = await readMovilizacionesIntangibles();
    const rest = {};
    let movilizaciones = [];

    const unidad = unidades.find(({codigo_unidad}) => codigo_unidad === bien.codigo_unidad);
    if (unidad) {
      rest.unidad = unidad.nombre_unidad;
    }

    const mapMovilizacion = (mov) => {
      const {
        numero_formato,
        codigo_bien_tangible,
      } = mov;
      const movilizacion = formatos.find((f) => f.numero_formato === numero_formato);
      const {
        codigo_unidad_emisora,
        codigo_unidad_receptora,
        ficha_responsable_cedente,
        ficha_responsable_receptor,
        aprobacion_emisor,
        aprobacion_receptor,
        fecha_formato,
      } = movilizacion;

      return {
        numero_formato,
        codigo_unidad_emisora,
        codigo_unidad_receptora,
        ficha_responsable_cedente,
        ficha_responsable_receptor,
        aprobacion_emisor,
        aprobacion_receptor,
        fecha_formato,
      };
    };

    if (tipo === 'ACTIVO TANGIBLE') {
      movilizaciones = movilizacionesTang.filter(({codigo_bien_tangible}) => codigo_bien_tangible === bien.codigo_bien).map(mapMovilizacion);
    }
    if (tipo === 'ACTIVO INTANGIBLE') {
      movilizaciones = movilizacionesIntang.filter(({codigo_bien_intangible}) => codigo_bien_intangible === bien.codigo_bien).map(mapMovilizacion);
    }

    const mapEncargado = (h) => {
      const {
        ci,
      } = h;
      const empleado = empleados.find((emp) => emp.ci === ci);
      const encargado = {
        ci: empleado.ci,
        nombre: empleado.nombre_completo,
      };
      return encargado
    }

    const encargadosPrimarios = historialRespPrimario.filter((h) => h.codigo_unidad == bien.codigo_unidad).map(mapEncargado);
    const encargadosUso = historialRespUso.filter(({codigo_bien}) => codigo_bien === bien.codigo_bien).map(mapEncargado);

    return {
      general: {
        codigo_bien,
        codigo_unidad,
        descripcion,
        ci_responsable_de_uso: ci_responsable,
        fecha_incorporacion,
        fecha_desincorporacion,
        origen,
        tipo,
        ...rest
      },
      encargadosPrimarios,
      encargadosUso,
      movilizaciones,
    }
  };

  const now = (new Date());
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();

  useEffect(() => {
    (async() => {
      if (bien) {
        const _data = await getData(bien);
        setData(_data);
        setIsLoading(false);
      }
    })();
  }, [bien]);

  if (isLoading) {
    <div className={classes.root}>
      <div className={classes.content}>
        <strong style={{textAlign: 'center'}}>
          Cargando...
        </strong>
      </div>
    </div>
  }

  if (!bien) {
    return null;
  }

  return (
    <div className={classes.root} ref={pdfRef}>
      <div className={classes.content}>
        <div style={{display: 'flex', flexDirection:'row', alignItems: 'space-between'}}>
          <h1>
            {`Bien #${codigo_bien}`}
          </h1>

          <Pdf
            targetRef={pdfRef}
            filename={`reporte-bien-${codigo_bien}-${date}-${month}-${year}-${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}:${(new Date()).getMilliseconds()}:${Math.random()}.pdf`}
            options={{
              orientation: 'landscape',
              units: 'in',
              format: [(650 + (encargadosPrimarios.length + encargadosUso.length + movilizaciones.length) * 35), 900]
            }}
          >
            {({ toPdf }) => (
              <IconButton onClick={toPdf}>
                <PrintIcon />
              </IconButton>
            )}
          </Pdf>
        </div>

        {/* Informacion general de detalle */}
        <Summary data={general} />

        {/* Historial encargados primarios */}
        <Historic
          data={encargadosPrimarios}
          headers={encargadoHeaders}
          title="Historial Encargados Primarios"
        />

        {/* Historial encargados de uso */}
        <Historic
          data={encargadosUso}
          headers={encargadoHeaders}
          title="Historial Encargados de Uso"
        />

        {/* Movilizaciones del bien */}
        <Historic
          data={movilizaciones}
          headers={movilizacionesHeaders}
          title="Movilizaciones"
        />
      </div>
    </div>
  );
}

export default ReporteDetalladoBien;
