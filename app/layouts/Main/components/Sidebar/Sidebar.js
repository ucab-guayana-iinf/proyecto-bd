import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ReceiptIcon from '@material-ui/icons/Receipt';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LocationIcon from '@material-ui/icons/LocationOn';
import PinDropIcon from '@material-ui/icons/PinDrop';
import DomainIcon from '@material-ui/icons/Domain';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import ApartmentIcon from '@material-ui/icons/Apartment';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { Profile, SidebarNav } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2),
    paddingTop: '6px',
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  }
}));

// https://material-ui.com/es/components/material-icons/

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Ubicaciones',
      href: '/ubicaciones',
      icon: <PinDropIcon />
    },
    {
      title: 'Sedes',
      href: '/sedes',
      icon: <LocationCityIcon />
    },
    {
      title: 'Unidades',
      href: '/unidades',
      icon: <ApartmentIcon />
    },
    {
      title: 'Empleados',
      href: '/empleados',
      icon: <SupervisedUserCircleIcon />
    },
    {
      title: 'Bienes',
      href: '/bienes',
      icon: <MenuBookIcon />
    },
    {
      title: 'Activos Tangibles',
      href: '/activos-tangibles',
      icon: <AttachFileIcon />
    },
    {
      title: 'Activos Intangibles',
      href: '/activos-intangibles',
      icon: <DashboardIcon />
    },
    {
      title: 'Facturas Activos Tangibles',
      href: '/facturas',
      icon: <ReceiptIcon />
    },
    {
      title: 'Edificaciones',
      href: '/edificaciones',
      icon: <DomainIcon />
    },
    {
      title: 'Bienes Naturales',
      href: '/bienes-naturales',
      icon: <NaturePeopleIcon />
    },
    {
      title: 'Componentes',
      href: '/componentes',
      icon: <NaturePeopleIcon />
    },
    {
      title: 'Configuración',
      href: '/configuracion',
      icon: <SettingsIcon />
    }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Divider className={classes.divider} style={{ marginTop: 0 }} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
