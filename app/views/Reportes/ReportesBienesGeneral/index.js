import React, {Fragment, useEffect, useState, useRef} from 'react';
import { makeStyles } from '@material-ui/styles';
import Pdf from "react-to-pdf";
import PrintIcon from '@material-ui/icons/Print';
import { Table } from '../../../components';
import ReporteDetalladoBien from './ReporteDetallado';
import {
  Select,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  Input,
  Drawer
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
} from '../../../../db/lib/querys';

const tiposDeBien = ['BIEN NATURAL', 'ACTIVO TANGIBLE', 'ACTIVO INTANGIBLE', 'EDIFICACION'];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      marginRight: 25,
    },
  },
};

const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
];

const headers = [
  { field: 'codigo_bien', title: 'Bien', filtering: false, },
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

const getReporteGeneral = async (flag = 0, codigoSede, filtroTipos = []) => {
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
  const filterByTipo = (bien) => {
    return filtroTipos.includes(bien.tipo);
  }

  const _bienes = bienes.filter(filterBySede).filter(filterByTipo).map((bien) => {
    const {
      codigo_bien,
      descripcion,
      fecha_incorporacion,
      fecha_desincorporacion,
      origen,
      tipo,
      ci_responsable,
      codigo_unidad,
    } = bien;

    const unidad = unidades.find(({codigo_unidad}) => codigo_unidad === bien.codigo_unidad);

    return {
      codigo_bien,
      codigo_unidad,
      descripcion,
      origen,
      tipo: tipo || 'N/A',
      ci_jefe: unidad.ci_jefe || 'N/A',
      ci_responsable: ci_responsable || 'N/A',
      fecha_incorporacion: (fecha_incorporacion && fecha_incorporacion.toString()) || 'N/A',
      fecha_desincorporacion: (fecha_desincorporacion && fecha_desincorporacion.toString()) || 'N/A',
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
  const pdfRef = useRef(null);
  const tableRef = useRef(null);
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [bienesN, toggleBienesN] = useState(false);
  const [codigoSede, setCodigoSede] = useState(null);
  const [tipoBien, setTipoBien] = useState(tiposDeBien);
  const [detalleBien, setDetalleBien] = useState(null);
  const now = (new Date());
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const prettyNow = `${date} de ${months[month - 1]}, ${year}`;

  useEffect(() => {
    (async () => {
      setData((await getReporteGeneral()));
      tableRef.current.onQueryChange();
    })();
  }, []);

  const toggleDrawer = (bien = null) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDetalleBien(bien);
  };

  if (!data) {
    return (
      <div style={{padding: 16}}>
        Cargando...
      </div>
    );
  }

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
    <div className={classes.root} ref={pdfRef}>
      <div className={classes.content}>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <h1>
              Reporte General de los Bienes
            </h1>
            <span style={{color: 'gray'}}>
              {prettyNow}
            </span>
          </div>
          <Pdf
            targetRef={pdfRef}
            filename={`reporte-general-${date}-${month}-${year}-${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}:${(new Date()).getMilliseconds()}:${Math.random()}.pdf`}
            options={{
              orientation: 'landscape',
              units: 'in',
              format: [400 + (total * 35), 1250]
            }}
          >
            {({ toPdf }) => (
              <IconButton onClick={toPdf}>
                <PrintIcon />
              </IconButton>
            )}
          </Pdf>
        </div>

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
            onRowClick={(e, data) => setDetalleBien(data)}
            data={async () => getReporteGeneral(1, codigoSede, tipoBien)}
            style={{ marginTop: 20, boxShadow: 'none', }}
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
                  {data && sedes && (
                    <Fragment>
                      <FormControl style={{ marginRight: 30, height: 50 }}>
                        <InputLabel id="demo-mutiple-checkbox-label2">
                          Sede
                        </InputLabel>
                        <Select
                          labelId="demo-mutiple-checkbox-label2"
                          id="demo-mutiple-checkbox2"
                          value={codigoSede}
                          style={{ minWidth: 150 }}
                          MenuProps={MenuProps}
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
                      </FormControl>

                      <FormControl>
                        <InputLabel id="demo-mutiple-checkbox-label">
                          Tipo de Bien
                        </InputLabel>
                        <Select
                          labelId="demo-mutiple-checkbox-label"
                          id="demo-mutiple-checkbox"
                          multiple
                          value={tipoBien}
                          onChange={async (e) => {
                            setTipoBien(e.target.value);
                            setData((await getReporteGeneral(0, codigoSede, e.target.value)));
                            tableRef.current.onQueryChange();
                          }}
                          input={<Input />}
                          renderValue={selected => selected.join(', ')}
                          style={{ minWidth: 150 }}
                          MenuProps={MenuProps}
                        >
                          {tiposDeBien.map(name => (
                            <MenuItem key={name} value={name}>
                              <Checkbox checked={tipoBien.indexOf(name) > -1} />
                              <ListItemText primary={name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Fragment>
                  )}
                </div>
              ),
            }}
          />
        )}
        <Drawer
          anchor="right"
          open={!!detalleBien}
          onClose={toggleDrawer(null)}
        >
          <ReporteDetalladoBien bien={detalleBien} />
        </Drawer>
      </div>
    </div>
  );
};

export default ReportesBienesGeneral;
