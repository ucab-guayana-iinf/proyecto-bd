/*DEFINITIVO */

/*LISTO 1) CLAVES PRIMARIAS
/*LISTO 2) DOMINIOS Y USO DE ELLOS EN EL SQL
/*LISTO 3) CLAVES FORANEAS


/* Creacion de la base de datos */
CREATE DATABASE proyecto_bd_1

/* Creacion de Dominios */

/* dominios globales */
CREATE DOMAIN CODIGO AS INT;

/* dominios de bienes */
/* -- dominios activos tangibles */
CREATE DOMAIN STATUS_ACTIVO_TANGIBLE AS ENUM(`EN PROCESO DE REGISTRO`, `ACTIVO`, `DAÑADO`, `OBSOLETO`, `EN PREPARACIÓN`, `DESINCORPORADO`);
/* -- dominios activos intangibles */
CREATE DOMAIN STATUS_ACTIVO_INTANGIBLE AS ENUM(`EN PROCESO DE REGISTRO`, `VIGENTE`, `VENCIDA`, `DESINCORPORADO`);
/* -- dominios edificaciones */
CREATE DOMAIN STATUS_EDIFICACIONES AS ENUM(`EN PROCESO DE REGISTRO`, `EN CONSTRUCCIÓN`, `HABITADA`, `DESHABITADA`, `DESINCORPORADO`);
CREATE DOMAIN TIPOS_DE_PROPIEDADES AS ENUM(`PROPIA`, `COMODATO`);
/* -- dominios bienes naturales */
CREATE DOMAIN STATUS_BIENES_NATURALES AS ENUM(`EN PROCESO DE REGISTRO`, `PLANTADO`, `ENFERMO`, `EXTINTO`);
CREATE DOMAIN ESTACIONES AS ENUM(`PRIMAVERA`, `VERANO`, `OTOÑO`, `INVIERNO`);

/* dominios inventario */
CREATE DOMAIN STATUS_INVENTARIO AS ENUM(`EN EJECUCIÓN`, `EN CONCILIACIÓN`, `CERRADO`);

CREATE TABLE IF NOT EXISTS `sedes` (
  `codigo_sede` CODIGO NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) UNIQUE NOT NULL,
  `direccion` varchar(255) NOT NULL,
  PRIMARY KEY (`codigo_sede`)
);

CREATE TABLE IF NOT EXISTS `ubicaciones` (
  `direccion` varchar(255),
  `nombre_ciudad` varchar(255),
  PRIMARY KEY (`direccion`),
  FOREIGN KEY (`direccion`) REFERENCES `sedes` (`direccion`) ON DELETE RESTRICT ON UPDATE CASCADE;
);

CREATE TABLE IF NOT EXISTS `unidades` (
  `codigo_unidad` CODIGO NOT NULL AUTO_INCREMENT,
  `codigo_sede` CODIGO,
  `nombre_unidad` varchar(255),
  `fecha_jefe` datetime,
  `ci_jefe` int,
  PRIMARY KEY (`codigo_unidad`),
  FOREIGN KEY (`codigo_sede`) REFERENCES `sedes` (`codigo_sede`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`ci_jefe`) REFERENCES `empleados` (`ci`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `empleados` (
  `ci` int,
  `nombre_completo` varchar(255),
  `codigo_unidad` CODIGO,
  PRIMARY KEY (`ci`),
  FOREIGN KEY (`codigo_unidad`) REFERENCES `unidades` (`codigo_unidad`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `bienes` (
  `codigo_bien` CODIGO,
  `descripcion` varchar(255),
  `fecha_incorporacion` datetime,
  `fecha_desincorporacion` datetime,
  `origen` varchar(255),
  `codigo_unidad` CODIGO,
  `tipo` varchar(255),
  PRIMARY KEY (`codigo_bien`),
  FOREIGN KEY (`codigo_unidad`) REFERENCES `unidades` (`codigo_unidad`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CHECK (`fecha_desincorporacion` > `fecha_incorporacion`)
);

CREATE TABLE IF NOT EXISTS `activos_tangibles` (
  `codigo_bien` CODIGO,
  `proveedor` varchar(255) NOT NULL,
  `numero_factura` int NOT NULL,
  `precio` float NOT NULL,
  `plazo_garantia` int,
  `status` STATUS_ACTIVO_TANGIBLE,
  PRIMARY KEY (`codigo_bien`),
  FOREIGN KEY (`codigo_bien`) REFERENCES `bienes` (`codigo_bien`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `facturas_activos_tangibles` (
  `numero_factura` int,
  `numero_orden` int,
  PRIMARY KEY (`numero_factura`),
  FOREIGN KEY (`numero_factura`) REFERENCES `activos_tangibles` (`numero_factura`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `activos_intangibles` (
  `codigo_bien` CODIGO,
  `fecha_caducidad` datetime NOT NULL,
  `es_compartido` boolean NOT NULL DEFAULT false,
  `status` STATUS_ACTIVO_INTANGIBLE NOT NULL,
  PRIMARY KEY (`codigo_bien`),
  FOREIGN KEY (`codigo_bien`) REFERENCES `bienes` (`codigo_bien`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `edificaciones` (
  `codigo_bien` CODIGO,
  `ubicacion` varchar(255) NOT NULL,
  `superficie` float NOT NULL,
  `tipo_propiedad` TIPOS_DE_PROPIEDADES NOT NULL,
  `status` STATUS_EDIFICACIONES NOT NULL,
  PRIMARY KEY (`codigo_bien`),
  FOREIGN KEY (`codigo_bien`) REFERENCES `bienes` (`codigo_bien`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `bienes_naturales` (
  `codigo_bien` CODIGO,
  `nombre_cientifico` varchar(255) NOT NULL,
  `nombre_vulgar` varchar(255) NOT NULL,
  `es_frutal` boolean NOT NULL DEFAULT false,
  `periodo_floral` ESTACIONES NOT NULL,
  `origen` varchar(255) NOT NULL,
  `ubicacion` varchar(255) NOT NULL,
  `status` STATUS_BIENES_NATURALES NOT NULL,
  PRIMARY KEY (`codigo_bien`),
  FOREIGN KEY (`codigo_bien`) REFERENCES `bienes` (`codigo_bien`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `fotografias_bienes_naturales` (
  `codigo_bien_natural` CODIGO,
  `fotografia` base64image NOT NULL,
  PRIMARY KEY (`codigo_bien_natural`),
  FOREIGN KEY (`codigo_bien_natural`) REFERENCES `bienes_naturales` (`codigo_bien`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `componentes` (
  `codigo_bien` CODIGO,
  `codigo_componente` CODIGO NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`codigo_bien`, `codigo_componente`),
  FOREIGN KEY (`codigo_bien`) REFERENCES `bienes` (`codigo_bien`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `nombres_componentes` (
  `codigo_componente` CODIGO,
  `nombre_componente` varchar(255) NOT NULL,
  PRIMARY KEY (`codigo_componente`),
  FOREIGN KEY (`codigo_componente`) REFERENCES `componentes` (`codigo_componente`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `componentes_x_componentes` (
  `codigo_componente` CODIGO,
  `codigo_componente_padre` CODIGO NOT NULL,
  PRIMARY KEY (`codigo_componente`, `codigo_componente_padre`),
  FOREIGN KEY (`codigo_componente`) REFERENCES `componentes` (`codigo_componente`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`codigo_componente_padre`) REFERENCES `componentes` (`codigo_componente`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `componentes_x_activos_tangibles` (
  `codigo_componente` CODIGO,
  `codigo_bien_tangible` CODIGO NOT NULL,
  PRIMARY KEY (`codigo_componente`, `codigo_bien_tangible`),
  FOREIGN KEY (`codigo_bien_tangible`) REFERENCES `activos_tangibles` (`codigo_bien`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`codigo_componente`) REFERENCES `componentes` (`codigo_componente`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `formatos` (
  `numero_formato` int NOT NULL AUTO_INCREMENT,
  `codigo_unidad_emisora` CODIGO NOT NULL,
  `codigo_unidad_receptora` CODIGO NOT NULL,
  `ficha_responsable_cedente` int NOT NULL,
  `ficha_responsable_receptor` int NOT NULL,
  `aprobacion_emisor` boolean NOT NULL DEFAULT false,
  `aprobacion_receptor` boolean NOT NULL DEFAULT false,
  `fecha_formato` datetime NOT NULL,
  PRIMARY KEY (`numero_formato`),
  FOREIGN KEY (`ficha_responsable_cedente`) REFERENCES `empleados` (`ci`) ON DELETE RESTRICT ON UPDATE CASCADE,/*REVISAR*/
  FOREIGN KEY (`ficha_responsable_receptor`) REFERENCES `empleados` (`ci`) ON DELETE RESTRICT ON UPDATE CASCADE,/*REVISAR*/
  FOREIGN KEY (`codigo_unidad_emisora`) REFERENCES `unidades` (`codigo_unidad`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`codigo_unidad_receptora`) REFERENCES `unidades` (`codigo_unidad`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `movilizaciones_tangibles` (
  `numero_formato` int,
  `codigo_bien_tangible` CODIGO NOT NULL,
  PRIMARY KEY (`numero_formato`, `codigo_bien_tangible`),
  FOREIGN KEY (`codigo_bien_tangible`) REFERENCES `activos_tangibles` (`codigo_bien`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`numero_formato`) REFERENCES `formatos` (`numero_formato`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `movilizaciones_intangibles` (
  `numero_formato` int,
  `codigo_bien_intangible` CODIGO NOT NULL,
  PRIMARY KEY (`numero_formato`, `codigo_bien_intangible`),
  FOREIGN KEY (`codigo_bien_intagible`) REFERENCES `activos_intangibles` (`codigo_bien`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`numero_formato`) REFERENCES `formatos` (`numero_formato`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `historial_reponsables_de_uso` (
  `ci` int,
  `codigo_bien` CODIGO NOT NULL,
  PRIMARY KEY (`ci`, `codigo_bien`),
);

CREATE TABLE IF NOT EXISTS `historial_responsables_primarios` (
  `ci` int,
  `codigo_unidad` CODIGO NOT NULL,
  PRIMARY KEY (`ci`, `codigo_unidad`),
);

CREATE TABLE IF NOT EXISTS `inventarios` (
  `anio` int,
  `semestre` varchar(255),
  `fecha_inicio` datetime NOT NULL,
  `fecha_fin` datetime NOT NULL,
  `status` STATUS_INVENTARIO NOT NULL,
  `ci_lider_inventario` int,
  PRIMARY KEY (`anio`, `semestre`),
  FOREIGN KEY (`ci_lider_inventario`) REFERENCES `empleados` (`ci`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `inventarios_x_sedes` (
  `anio` int,
  `semestre` varchar(255),
  `codigo_sede` CODIGO NOT NULL,
  PRIMARY KEY (`anio`, `semestre`, `codigo_sede`),
  FOREIGN KEY (`codigo_sede`) REFERENCES `sedes` (`codigo_sede`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`anio`, `semestre`) REFERENCES `inventarios` (`anio`, `semestre`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `inventarios_x_empleados` (
  `anio` int,
  `semestre` varchar(255),
  `ci_empleado` int NOT NULL,
  PRIMARY KEY (`anio`, `semestre`, `ci_empleado`),
  FOREIGN KEY (`ci_empleado`) REFERENCES `empleados` (`ci`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`anio`, `semestre`) REFERENCES `inventarios` (`anio`, `semestre`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `inventarios_x_bienes` (
  `anio` int,
  `semestre` int,
  `codigo_bien` CODIGO,
  `ci_empleado` int,
  `fecha_realizacion` datetime,
  PRIMARY KEY (`anio`, `semestre`, `codigo_bien`),
  FOREIGN KEY (`codigo_bien`) REFERENCES `bienes` (`codigo_bien`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`anio`, `semestre`) REFERENCES `inventarios` (`anio`, `semestre`) ON DELETE RESTRICT ON UPDATE CASCADE
);
