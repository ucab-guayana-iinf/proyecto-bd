/*DEFINITIVO */

/*LISTO 1) CLAVES PRIMARIAS
/*LISTO 2) DOMINIOS Y USO DE ELLOS EN EL SQL


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
  `codigo_sede` CODIGO,
  `descripcion` varchar(255),
  `direccion` varchar(255),
  PRIMARY KEY (`codigo_sede`),
  FOREIGN KEY (`codigo_sede`) REFERENCES `unidades` (`codigo_sede`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `ubicaciones` (
  `direccion` varchar(255),
  `nombre_ciudad` varchar(255),
  PRIMARY KEY (`direccion`),
  FOREIGN KEY (`direccion`) REFERENCES `sedes` (`direccion`) ON DELETE RESTRICT ON UPDATE CASCADE;
);

CREATE TABLE IF NOT EXISTS `unidades` (
  `codigo_unidad` CODIGO,
  `codigo_sede` CODIGO,
  `nombre_unidad` varchar(255),
  `fecha_jefe` datetime,
  `ci_jefe` int,
  PRIMARY KEY (`codigo_unidad`),
  FOREIGN KEY (`codigo_unidad`) REFERENCES `empleados` (`codigo_unidad`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`codigo_unidad`) REFERENCES `bienes` (`codigo_unidad`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`codigo_unidad`) REFERENCES `formatos` (`unidad_emisora`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`codigo_unidad`) REFERENCES `formatos` (`unidad_receptora`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`ci_jefe`) REFERENCES `historial_responsables_primarios` (`ci`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`codigo_unidad`) REFERENCES `historial_responsables_primarios` (`codigo_unidad`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `empleados` (
  `ci` int,
  `nombre_completo` varchar(255),
  `codigo_unidad` CODIGO,
  PRIMARY KEY (`ci`),
  FOREIGN KEY (`ci`) REFERENCES `unidades` (`ci_jefe`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`ci`) REFERENCES `formatos` (`ficha_responsable_cedente`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`ci`) REFERENCES `formatos` (`ficha_responsable_receptor`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`ci`) REFERENCES `historial_reponsables_de_uso` (`ci`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`ci`) REFERENCES `inventarios_x_empleados` (`ci_empleado`) ON DELETE RESTRICT ON UPDATE CASCADE
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
  FOREIGN KEY (`codigo_bien`) REFERENCES `componentes` (`codigo_bien`) ON DELETE RESTRICT ON UPDATE CASCADE
  FOREIGN KEY (`codigo_bien`) REFERENCES `historial_reponsables_de_uso` (`codigo_bien`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`codigo_bien`) REFERENCES `inventarios_x_bienes` (`codigo_bien`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CHECK (`fecha_desincorporacion` > `fecha_incorporacion`)
);

CREATE TABLE IF NOT EXISTS `activos_tangibles` (
  `codigo_bien` CODIGO,
  `proveedor` varchar(255),
  `numero_factura` int,
  `precio` float,
  `plazo_garantia` int,
  `status` STATUS_ACTIVO_TANGIBLE,
  PRIMARY KEY (`codigo_bien`),
  FOREIGN KEY (`codigo_bien`) REFERENCES `bienes` (`codigo_bien`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`codigo_bien`) REFERENCES `componentes_x_activos_tangibles` (`numero_bien_tangible`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`codigo_bien`) REFERENCES `movilizaciones_tangibles` (`numero_bien_tangible`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `facturas_activos_tangibles` (
  `numero_factura` int,
  `numero_orden` int,
  PRIMARY KEY (`numero_factura`),
  FOREIGN KEY (`numero_factura`) REFERENCES `activos_tangibles` (`numero_factura`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `activos_intangibles` (
  `codigo_bien` CODIGO,
  `fecha_caducidad` datetime,
  `es_compartido` boolean,
  `status` STATUS_ACTIVO_INTANGIBLE,
  PRIMARY KEY (`codigo_bien`),
  FOREIGN KEY (`codigo_bien`) REFERENCES `bienes` (`codigo_bien`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`codigo_bien`) REFERENCES `movilizaciones_intangibles` (`numero_bien_intangible`)
);

CREATE TABLE IF NOT EXISTS `edificaciones` (
  `codigo_bien` CODIGO,
  `ubicacion` varchar(255),
  `superficie` float,
  `tipo_propiedad` TIPOS_DE_PROPIEDADES,
  `status` STATUS_EDIFICACIONES,
  PRIMARY KEY (`codigo_bien`),
  FOREIGN KEY (`codigo_bien`) REFERENCES `bienes` (`codigo_bien`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `bienes_naturales` (
  `codigo_bien` CODIGO,
  `nombre_cientifico` varchar(255),
  `nombre_vulgar` varchar(255),
  `es_frutal` boolean,
  `periodo_floral` ESTACIONES,
  `origen` varchar(255),
  `ubicacion` varchar(255),
  `status` STATUS_BIENES_NATURALES,
  PRIMARY KEY (`codigo_bien`),
  FOREIGN KEY (`codigo_bien`) REFERENCES `bienes` (`codigo_bien`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`codigo_bien`) REFERENCES `fotografias_bienes_naturales` (`numero_bien_natural`)
);

CREATE TABLE IF NOT EXISTS `fotografias_bienes_naturales` (
  `codigo_bien_natural` CODIGO,
  `fotografia` base64image,
  PRIMARY KEY (`codigo_bien_natural`)
);

CREATE TABLE IF NOT EXISTS `componentes` (
  `codigo_bien` CODIGO,
  `codigo_componente` CODIGO NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`codigo_bien`, `codigo_componente`),
  FOREIGN KEY (`codigo_componente`) REFERENCES `nombres_componentes` (`codigo_componente`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`codigo_componente`) REFERENCES `componentes_x_componentes` (`codigo_componente`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`codigo_componente`) REFERENCES `componentes_x_componentes` (`codigo_componente_padre`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`codigo_componente`) REFERENCES `componentes_x_activos_tangibles` (`codigo_componente`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `nombres_componentes` (
  `codigo_componente` CODIGO,
  `nombre_componente` varchar(255),
  PRIMARY KEY (`codigo_componente`)
);

CREATE TABLE IF NOT EXISTS `componentes_x_componentes` (
  `codigo_componente` CODIGO,
  `codigo_componente_padre` CODIGO,
  PRIMARY KEY (`codigo_componente`, `codigo_componente_padre`)
);

CREATE TABLE IF NOT EXISTS `componentes_x_activos_tangibles` (
  `codigo_componente` CODIGO,
  `codigo_bien_tangible` CODIGO,
  PRIMARY KEY (`codigo_componente`, `codigo_bien_tangible`)
);

CREATE TABLE IF NOT EXISTS `formatos` (
  `numero_formato` int NOT NULL AUTO_INCREMENT,
  `unidad_emisora` varchar(255) /*CODIGO*/,
  `unidad_receptora` varchar(255) /*CODIGO*/,
  `ficha_responsable_cedente` int,
  `ficha_responsable_receptor` int,
  `aprobacion_emisor` boolean,
  `aprobacion_receptor` boolean,
  `fecha_formato` datetime,
  PRIMARY KEY (`numero_formato`),
  FOREIGN KEY (`numero_formato`) REFERENCES `movilizaciones_tangibles` (`numero_formato`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`numero_formato`) REFERENCES `movilizaciones_intangibles` (`numero_formato`) ON DELETE RESTRICT ON UPDATE CASCADE

);

CREATE TABLE IF NOT EXISTS `movilizaciones_tangibles` (
  `numero_formato` int,
  `codigo_bien_tangible` CODIGO,
  PRIMARY KEY (`numero_formato`, `codigo_bien_tangible`)
);

CREATE TABLE IF NOT EXISTS `movilizaciones_intangibles` (
  `numero_formato` int,
  `codigo_bien_intangible` CODIGO,
  PRIMARY KEY (`numero_formato`, `codigo_bien_intangible`)
);

CREATE TABLE IF NOT EXISTS `historial_reponsables_de_uso` (
  `ci` int,
  `codigo_bien` CODIGO,
  PRIMARY KEY (`ci`, `codigo_bien`)
);

CREATE TABLE IF NOT EXISTS `historial_responsables_primarios` (
  `ci` int,
  `codigo_unidad` CODIGO,
  PRIMARY KEY (`ci`, `codigo_unidad`)
);

CREATE TABLE IF NOT EXISTS `inventarios` (
  `anio` int,
  `semestre` varchar(255),
  `fecha_inicio` datetime,
  `fecha_fin` datetime,
  `status` STATUS_INVENTARIO,
  PRIMARY KEY (`anio`, `semestre`),
  FOREIGN KEY (`anio`, `semestre`) REFERENCES `inventarios_x_sedes` (`anio`, `semestre`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`anio`, `semestre`) REFERENCES `inventarios_x_empleados` (`anio`, `semestre`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`anio`, `semestre`) REFERENCES `inventarios_x_bienes` (`anio`, `semestre`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CHECK (`fecha_fin` > `fecha_inicio`)
);

CREATE TABLE IF NOT EXISTS `inventarios_x_sedes` (
  `anio` int,
  `semestre` varchar(255),
  `codigo_sede` CODIGO,
  PRIMARY KEY (`anio`, `semestre`, `codigo_sede`),
  FOREIGN KEY (`codigo_sede`) REFERENCES `sedes` (`codigo_sede`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `inventarios_x_empleados` (
  `anio` int,
  `semestre` varchar(255),
  `ci_empleado` int,
  PRIMARY KEY (`anio`, `semestre`, `ci_empleado`)
);

CREATE TABLE IF NOT EXISTS `inventarios_x_bienes` (
  `anio` int,
  `semestre` int,
  `codigo_bien` CODIGO,
  `ci_empleado` int,
  `fecha_realizacion` datetime,
  PRIMARY KEY (`anio`, `semestre`,'codigo_bien')
);
