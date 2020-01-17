import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import NatureIcon from '@material-ui/icons/Nature';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AllOutIcon from '@material-ui/icons/AllOut';
import AppsIcon from '@material-ui/icons/Apps';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },

  // ---
  box: {
    
  }
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
        {boxes.map((values) => (
          <Box {...values} />
        ))}
      </div>
    </div>
  );
};

export default Reportes;
