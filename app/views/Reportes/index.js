import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import NatureIcon from '@material-ui/icons/Nature';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AllOutIcon from '@material-ui/icons/AllOut';
import MenuBookIcon from '@material-ui/icons/MenuBook';
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
    maxWidth: 250,
    height: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 6,
    padding: '0 10px',
    boxShadow: '-1px 3px 12px 0px rgba(0,0,0,0.2)',
    transition: 'all .25s ease-in',
    '&:hover': {
      boxShadow: '-1px 3px 25px 0px rgba(0,0,0,0.3)',
    },
    '&:hover > svg': {
      fontSize: 50,
    },
  },
  boxTitle: {
    color: 'black',
  },
  boxDescription: {
    color: 'gray',
  },
  icon: {
    color: 'black',
    fontSize: 40,
    height: 50,
    transition: 'all .35s ease-in',
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
        {Icon}

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
    { to: '/reportes/bienes-general', Icon: <MenuBookIcon size={60} className={classes.icon} />, text: 'Bienes', description: 'Genere reportes sobre los Bienes en general o sobre un Bien en específico' },
  ];

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {boxes.map((values) => (
          <Box key={values.to} {...values} />
        ))}
      </div>
    </div>
  );
};

export default Reportes;
