import React, { Fragment, useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { makeStyles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
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
  createFotografiasBienesNaturales,
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
  },
  detailPanel: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    height: 150,
  },
  dropZone: {
    width: 100,
    padding: 10,
    border: 'lightgray dotted 2px',
    margin: 6,
    textAlign: 'center',
    height: 140,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      opacity: 0.7,
      cursor: 'pointer',
    },
  },
  pictures: {
    marginLeft: -2,
    marginRight: -2,
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
    whiteSpace: 'nowrap',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    overflowY: 'hidden',
    maxWidth: '67vw',
  },
  picture: {
    '&:hover': {
      opacity: 0.9,
      cursor: 'pointer',
    },
  },
  pictureButton: {
    position: 'absolute',
    display: 'block',
    margin: 5,
    top: 0,
    right: 0,
    padding: 0,
    borderRadius: 15,
    width: 22,
    minWidth: 0,
  },
}));

const BienesNaturales = () => {
  const classes = useStyles();
  const [bienes, setBienes] = useState([]);
  const [bienesPictures, setBienesPictures] = useState([]);
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
  const newData = bienes.filter(({ tipo }) => tipo === 'BIEN NATURAL');

  const init = async () => {
    const _bienes = await readBienes();
    const _pictures = await readFotografiasBienesNaturales();
    setBienes(_bienes);
    setBienesPictures(_pictures);
  }

  useEffect(() => {
    (async() => {
      await init();
    })()
  }, []);

  const headers = [
    { title: 'Código Bien', field: 'codigo_bien', cellStyle: { width: '-webkit-fill-available' },
      render: (data) => {
        const row = newData.find(({ codigo_bien }) => codigo_bien === data.codigo_bien);
        if (row) {
          return (
            <span>
              {row.codigo_bien} - {row.descripcion}
            </span>
          );
        }
        return null;
      },
      editComponent: (props) => {
        return (
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.value || ''}
            onChange={(e) => props.onChange(e.target.value)}
          >
            {newData.map((bien) => (
              <MenuItem key={bien.codigo_bien} value={bien.codigo_bien}>
                {bien.descripcion}
              </MenuItem>
            ))}
          </Select>
        );
    }},
    { title: 'Nombre Científico', field: 'nombre_cientifico', cellStyle: { width: '-webkit-fill-available'} },
    { title: 'Nombre Vulgar', field: 'nombre_vulgar', cellStyle: { width: '-webkit-fill-available'} },
    { title: 'Frutal', field: 'es_frutal', cellStyle: { width: '-webkit-fill-available'},
      render: (data) => {
        return (
          <Switch
            checked={Boolean(data.es_frutal)}
            disabled
          />
        );
      },
      editComponent: (props) => {
        return (
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={Boolean(props.value) || false}
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

  const detailPanel = (rowData) => {
    const { codigo_bien: codigo_bien_natural } = rowData;
    const rowPictures = bienesPictures && bienesPictures.filter(({ codigo_bien_natural: cbn }) => cbn === codigo_bien_natural);
    const onDrop = (files) => {
      const [image] = files;
      const data = { codigo_bien_natural };
      const reader = new FileReader();
      reader.onloadend = async function () {
        data.fotografia = reader.result;
        await createFotografiasBienesNaturales({ data }, () => {
          alert('Ha ocurrido un error cargando la fotografia');
        });
        window.location.reload();
      }
      reader.readAsDataURL(image);
    };
    return (
      <div className={classes.detailPanel}>
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className={classes.dropZone}>
              <input {...getInputProps()} />
              <p>Agregar nueva fotografía</p>
            </div>
          )}
        </Dropzone>
        {
          rowPictures.length && (
            <Fragment>
              <div className={classes.pictures}>
                {rowPictures.map(({ fotografia, codigo_bien_natural }, i) => {
                  const onDelete = async () => {
                    await deleteFotografiasBienesNaturales({
                      condition: 'fotografia=',
                      value: `"${fotografia}"`,
                    }, () => {
                      alert('Ha ocurrido un error al eliminar la fotografía');
                    });
                    await init();
                    window.location.reload();
                  };
                  return (
                    <div
                      key={`${codigo_bien_natural}${fotografia}`}
                      style={{ width: 'fit-content', height: 'fit-content', position: 'relative', margin: 6 }}
                    >
                      <img
                        src={fotografia}
                        width="auto"
                        height="140"
                        className={classes.picture}
                      />
                      <Button
                        color="secondary"
                        variant="contained"
                        size="small"
                        onClick={onDelete}
                        className={classes.pictureButton}
                      >
                        X
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Fragment>
          )
        }
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Table
          selection
          title="Bienes Naturales"
          headers={headers}
          data={readBienesNaturales}
          detailPanel={detailPanel}
          onAdd={(data, onError) => {
            if (!data.codigo_bien_natural) delete data.codigo_bien_natural;
            if (!data.periodo_floral) delete data.periodo_floral;
            if (!data.status) delete data.status;

            createBienesNaturales({ data }, onError);
          }}
          onUpdate={(data, onError) => {
            updateBienesNaturales({
              data,
              value: data.codigo_bien_natural,
            },
            onError);
          }}
          onDelete={(data, onError) => {
            deleteBienesNaturales({
              data,
              value: data.codigo_bien_natural
            }, onError)
          }}
        />
      </div>
    </div>
  );
};

export default BienesNaturales;
