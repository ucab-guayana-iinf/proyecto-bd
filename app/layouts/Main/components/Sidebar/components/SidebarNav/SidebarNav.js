import React, { useState, forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Collapse, List, ListItem, ListItemText, Button, colors } from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
    "&:last-child": {
      marginTop: 'auto',
    }
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  }
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

const defaultState = {
  Historial: false,
  Movilizaciones: false,
};

const SidebarNav = props => {
  const { pages, className, ...rest } = props;
  const [state, setState] = useState(defaultState);

  const classes = useStyles();

  const handleClick = (item) => {
    setState({
      ...state,
      [item]: !state[item],
    });
  };

  return (
    <List
      {...rest}
      className={clsx(classes.root, className)}
    >
      {pages.map(page => {
        if (!page.items) {
          return (
            <ListItem
              className={classes.item}
              disableGutters
              key={page.title}
            >
              <Button
                activeClassName={classes.active}
                className={classes.button}
                component={CustomRouterLink}
                to={page.href}
              >
                <div className={classes.icon}>{page.icon}</div>
                {page.title}
              </Button>
            </ListItem>
          );
        }

        return (
          <div key={page.title}>
            <ListItem
              button
              onClick={() => handleClick(page.title)}
            >
              <div className={classes.icon}>{page.icon}</div>
              <ListItemText
                primary={page.title}
              />
              { state[page.title] ?  <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={state[page.title]}
              timeout="auto"
              unmountOnExit
            >
              {page.items.map(_page => (
                <ListItem
                  className={classes.item}
                  disableGutters
                  key={_page.title}
                >
                  <Button
                    activeClassName={classes.active}
                    className={classes.button}
                    component={CustomRouterLink}
                    to={_page.href}
                  >
                    <div className={classes.icon}>{_page.icon}</div>
                    {_page.title}
                  </Button>
                </ListItem>
              ))}
            </Collapse>
          </div>
        );
      })}
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired
};

export default SidebarNav;
