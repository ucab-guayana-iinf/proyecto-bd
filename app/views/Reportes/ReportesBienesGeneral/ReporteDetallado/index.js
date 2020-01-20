import React, {Fragment, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/styles';
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
  readEdificaciones,
} from '../../../../../db/lib/querys';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    width: '60vw',
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

const encargadosPrimariosHeaders = [];
const encargadosUsoHeaders = [];
const movilizacionesHeaders = [];

const Historic = ({title, data, headers}) => {
  if (!data) return null;

  return (
    <Fragment>
      <h2 style={{marginTop: 20}}>
        {title}
      </h2>

      {data && (
        <TableContainer component={Paper}>
         <Table aria-label="simple table">
           <TableHead>
             <TableRow>
               {headers.map((value) => (
                <TableCell>
                  {value}
                </TableCell>
               ))}
             </TableRow>
           </TableHead>
           <TableBody>
             {data.map((key) => (
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
      )}
    </Fragment>
  )
};

const Summary = ({data}) => {
  const classes = useStyles();

  if (!data) return null;

  return (
    <TableContainer component={Paper}>
     <Table className={classes.table} size="small" aria-label="simple table">
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
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const {
    bien,
  } = props;
  const {
    codigo_bien,
    descripcion,
    ci_responsable,
    fecha_incorporacion,
    fecha_desincorporacion,
    origen,
    tipo,
  } = bien || {};
  const {
    general,
    encargadosPrimarios,
    encargadosUso,
    movilizaciones,
  } = data;

  const printDetalle = () => {
    // TODO
  };

  const getData = async (bien) => {
    const unidades = await readUnidades();
    const rest = {};

    const unidad = unidades.find(({codigo_unidad}) => codigo_unidad === bien.codigo_unidad);
    if (unidad) {
      rest.unidad = unidad;
    }

    if (tipo ===  'BIEN NATURAL') {

    }
    if (tipo === 'ACTIVO TANGIBLE') {

    }
    if (tipo === 'ACTIVO INTANGIBLE') {

    }
    if (tipo === 'EDIFICACION') {

    }

    return {
      general: {
        codigo_bien,
        descripcion,
        ci_responsable_de_uso: ci_responsable,
        fecha_incorporacion,
        fecha_desincorporacion,
        origen,
        tipo,
        ...rest
      },
      encargadosPrimarios: [

      ],
      encargadosUso: [

      ],
      movilizaciones: [

      ]
    }
  };

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
    <div className={classes.root}>
      <div className={classes.content}>
        <div style={{display: 'flex', flexDirection:'row', alignItems: 'space-between'}}>
          <h1>
            {`Bien #${codigo_bien}`}
          </h1>

          <IconButton onClick={printDetalle}>
            <PrintIcon size={40} />
          </IconButton>
        </div>

        {/* Informacion general de detalle */}
        <Summary data={general} />

        {/* Historial encargados primarios */}
        <Historic
          data={encargadosPrimarios}
          headers={encargadosPrimariosHeaders}
          title="Historial Encargados Primarios"
        />

        {/* Historial encargados de uso */}
        <Historic
          data={encargadosUso}
          headers={encargadosUsoHeaders}
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
