import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Settings as SettingsView,
  Ubicaciones as UbicacionesView,
  Sedes as SedesView,
  Unidades as UnidadesView,
  Empleados as EmpleadosView,
  Bienes as BienesView,
  Tangibles as TangiblesView,
  Intangibles as IntangiblesView,
  Facturas as FacturasView,
  Edificaciones as EdificacionesView,
  BienesNaturales as BienesNaturalesView,
  Componentes as ComponentesView,
  Formatos as FormatosView,
  MovilizacionesTangibles as MovilizacionesTangiblesView,
  MovilizacionesIntangibles as MovilizacionesIntangiblesView,
  HistorialResponsablesPrimarios as HistorialResponsablesPrimariosView,
   HistorialResponsableDeUso as HistorialResponsableDeUsoView,
  Inventarios as InventariosView,
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
        component={EmpleadosView}
        exact
        layout={MainLayout}
        path="/empleados"
      />
      <RouteWithLayout
        component={BienesView}
        exact
        layout={MainLayout}
        path="/bienes"
      />
      <RouteWithLayout
        component={TangiblesView}
        exact
        layout={MainLayout}
        path="/activos-tangibles"
      />
      <RouteWithLayout
        component={IntangiblesView}
        exact
        layout={MainLayout}
        path="/activos-intangibles"
      />
      <RouteWithLayout
        component={FacturasView}
        exact
        layout={MainLayout}
        path="/facturas"
      />
      <RouteWithLayout
        component={EdificacionesView}
        exact
        layout={MainLayout}
        path="/edificaciones"
      />
      <RouteWithLayout
        component={BienesNaturalesView}
        exact
        layout={MainLayout}
        path="/bienes-naturales"
      />
      <RouteWithLayout
        component={ComponentesView}
        exact
        layout={MainLayout}
        path="/componentes"
      />
      <RouteWithLayout
        component={FormatosView}
        exact
        layout={MainLayout}
        path="/formatos"
      />
      <RouteWithLayout
        component={MovilizacionesTangiblesView}
        exact
        layout={MainLayout}
        path="/movilizaciones-tangibles"
      />
      <RouteWithLayout
        component={MovilizacionesIntangiblesView}
        exact
        layout={MainLayout}
        path="/movilizaciones-intangibles"
      />
      <RouteWithLayout
        component={HistorialResponsablesPrimariosView}
        exact
        layout={MainLayout}
        path="/responsables-primarios"
      />
      <RouteWithLayout
        component={HistorialResponsableDeUsoView}
        exact
        layout={MainLayout}
        path="/responsables-uso"
      />
      <RouteWithLayout
        component={InventariosView}
        exact
        layout={MainLayout}
        path="/inventario"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/configuracion"
      />
      <Redirect to="/ubicaciones" />
    </Switch>
  );
};

export default Routes;
