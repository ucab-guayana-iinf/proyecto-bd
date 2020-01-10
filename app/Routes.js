import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  Ubicaciones as UbicacionesView,
  Sedes as SedesView,
  Unidades as UnidadesView,
} from './views';

// TODO: o le buscan iconos alusivos al nombre de la vista
//       o se le borran los iconos a todo..

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/ubicaciones" />
      <RouteWithLayout
        component={UbicacionesView}
        exact
        layout={MainLayout}
        path="/ubicaciones"
      />
      <RouteWithLayout
        component={SedesView}
        exact
        layout={MainLayout}
        path="/sedes"
      />
      <RouteWithLayout
        component={UnidadesView}
        exact
        layout={MainLayout}
        path="/unidades"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/products"
      />
      <RouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <RouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/configuracion"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <Redirect to="/ubicaciones" />
    </Switch>
  );
};

export default Routes;
