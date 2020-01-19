import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import NatureIcon from '@material-ui/icons/Nature';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AllOutIcon from '@material-ui/icons/AllOut';
import AppsIcon from '@material-ui/icons/Apps';
import {Button} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(2)
  },
}));

const Box = (props) => {
  const classes = useStyles();
  const {
    to,
    Icon,
    text,
    description,
  } = props;

  return (
    <Link to={to}>
      <div className={classes.box}>
        <Icon />

        <h2 className={classes.boxTitle}>
          {text}
        </h2>

        <span className={classes.boxDescription}>
          {description}
        </span>
      </div>
    </Link>
  );
}

const Reportes = () => {
  const classes = useStyles();
  const boxes = [
    { to: '/reportes/bien', Icon: <AllOutIcon />, text: 'Bien', description: 'Genere reportes sobre un Bien en específico' },
  ];

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Link to="/reportes/bienes-general">
          Reporte general de los bienes
        </Link>

        <br />

        <Link to="/reportes/bien">
          Reporte de un bien en específico
        </Link>

        <br />

        <Link to="/reportes/bienes-sede">
          Reporte de Bienes por Sede
        </Link>
      </div>
    </div>
  );
};

export default Reportes;
