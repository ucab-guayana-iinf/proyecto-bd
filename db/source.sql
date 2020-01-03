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

CREATE TABLE `sedes` (
  `codigo_sede` CODIGO,
  `descripcion` varchar(255),
  `direccion` varchar(255),
  PRIMARY KEY (`codigo_sede`)
);

CREATE TABLE `ubicaciones` (
  `direccion` varchar(255),
  `nombre_ciudad` varchar(255),
  PRIMARY KEY (`direccion`)
);

CREATE TABLE `unidades` (
  `codigo_unidad` CODIGO,
  `codigo_sede` CODIGO,
  `nombre_unidad` varchar(255),
  `fecha_jefe` datetime,
  `ci_jefe` int,
  PRIMARY KEY (`codigo_unidad`)
);

CREATE TABLE `empleados` (
  `ci` int,
  `nombre_completo` varchar(255),
  `codigo_unidad` CODIGO,
  PRIMARY KEY (`ci`)
);

CREATE TABLE `bienes` (
  `codigo_bien` CODIGO,
  `descripcion` varchar(255),
  `fecha_incorporacion` datetime,
  `fecha_desincorporacion` datetime,
  `origen` varchar(255),
  `codigo_unidad` CODIGO,
  `tipo` varchar(255),
  PRIMARY KEY (`codigo_bien`)
);

CREATE TABLE `activos_tangibles` (
  `codigo_bien` CODIGO,
  `proveedor` varchar(255),
  `numero_factura` int,
  `precio` float,
  `plazo_garantia` int,
  `status` STATUS_ACTIVO_TANGIBLE,
  PRIMARY KEY (`codigo_bien`)
);

CREATE TABLE `facturas_activos_tangibles` (
  `numero_factura` int,
  `numero_orden` int,
  PRIMARY KEY (`numero_factura`)
);

CREATE TABLE `activos_intangibles` (
  `codigo_bien` CODIGO,
  `fecha_caducidad` datetime,
  `es_compartido` boolean,
  `status` STATUS_ACTIVO_INTANGIBLE,
  PRIMARY KEY (`codigo_bien`)
);

CREATE TABLE `edificaciones` (
  `codigo_bien` CODIGO,
  `ubicacion` varchar(255),
  `superficie` float,
  `tipo_propiedad` TIPOS_DE_PROPIEDADES,
  `status` STATUS_EDIFICACIONES,
  PRIMARY KEY (`codigo_bien`)
);

CREATE TABLE `bienes_naturales` (
  `codigo_bien` CODIGO,
  `nombre_cientifico` varchar(255),
  `nombre_vulgar` varchar(255),
  `es_frutal` boolean,
  `periodo_floral` ESTACIONES,
  `origen` varchar(255),
  `ubicacion` varchar(255),
  `status` STATUS_BIENES_NATURALES,
  PRIMARY KEY (`codigo_bien`)
);

CREATE TABLE `fotografias_bienes_naturales` (
  `codigo_bien_natural` CODIGO,
  `fotografia` base64image,
  PRIMARY KEY (`codigo_bien_natural`)
);

CREATE TABLE `componentes` (
  `codigo_bien` CODIGO,
  `codigo_componente` CODIGO NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`codigo_bien`, `codigo_componente`)
);

CREATE TABLE `nombres_componentes` (
  `codigo_componente` CODIGO,
  `nombre_componente` varchar(255),
  PRIMARY KEY (`codigo_componente`)
);

CREATE TABLE `componentes_x_componentes` (
  `codigo_componente` CODIGO,
  `codigo_componente_padre` CODIGO,
  PRIMARY KEY (`codigo_componente`, `codigo_componente_padre`)
);

CREATE TABLE `componentes_x_activos_tangibles` (
  `codigo_componente` CODIGO,
  `codigo_bien_tangible` CODIGO,
  PRIMARY KEY (`codigo_componente`, `codigo_bien_tangible`)
);

CREATE TABLE `formatos` (
  `numero_formato` int NOT NULL AUTO_INCREMENT,
  `unidad_emisora` varchar(255) /*CODIGO*/,
  `unidad_receptora` varchar(255) /*CODIGO*/,
  `ficha_responsable_cedente` int,
  `ficha_responsable_receptor` int,
  `aprobacion_emisor` boolean,
  `aprobacion_receptor` boolean,
  `fecha_formato` datetime,
  PRIMARY KEY (`numero_formato`)
);

CREATE TABLE `movilizaciones_tangibles` (
  `numero_formato` int,
  `codigo_bien_tangible` CODIGO,
  PRIMARY KEY (`numero_formato`, `codigo_bien_tangible`)
);

CREATE TABLE `movilizaciones_intangibles` (
  `numero_formato` int,
  `codigo_bien_intangible` CODIGO,
  PRIMARY KEY (`numero_formato`, `codigo_bien_intangible`)
);

CREATE TABLE `historial_reponsables_de_uso` (
  `ci` int,
  `codigo_bien` CODIGO,
  PRIMARY KEY (`ci`, `codigo_bien`)
);

CREATE TABLE `historial_responsables_primarios` (
  `ci` int,
  `codigo_unidad` CODIGO,
  PRIMARY KEY (`ci`, `codigo_unidad`)
);

CREATE TABLE `inventarios` (
  `anio` int,
  `semestre` varchar(255),
  `fecha_inicio` datetime,
  `fecha_fin` datetime,
  `status` STATUS_INVENTARIO,
  PRIMARY KEY (`anio`, `semestre`)
);

CREATE TABLE `inventarios_x_sedes` (
  `anio` int,
  `semestre` varchar(255),
  `codigo_sede` CODIGO,
  PRIMARY KEY (`anio`, `semestre`, `codigo_sede`)
);

CREATE TABLE `inventarios_x_empleados` (
  `anio` int,
  `semestre` varchar(255),
  `ci_empleado` int,
  PRIMARY KEY (`anio`, `semestre`, `ci_empleado`)
);

CREATE TABLE `inventarios_x_bienes` (
  `anio` int,
  `semestre` int,
  `codigo_bien` CODIGO,
  `ci_empleado` int,
  `fecha_realizacion` datetime,
  PRIMARY KEY (`anio`, `semestre`,'codigo_bien')
);

/* VERIFICAR SI EXISTE ESTA TABLA
CREATE TABLE `reportes_x_bienes` (
  `anio` int,
  `semestre` int,
  `codigo_reporte` int,
  `numero_bien_tangible` int,
  `numero_bien_intangible` int,
  `numero_bien_natural` int,
  `detalle_bien` varchar(255),
  PRIMARY KEY (`anio`, `semestre`, `codigo_reporte`, `numero_bien_tangible`, `numero_bien_intangible`, `numero_bien_natural`, `detalle_bien`)
);*/

ALTER TABLE `ubicaciones` ADD FOREIGN KEY (`direccion`) REFERENCES `sedes` (`direccion`);

ALTER TABLE `empleados` ADD FOREIGN KEY (`ci`) REFERENCES `unidades` (`ci_jefe`);

ALTER TABLE `unidades` ADD FOREIGN KEY (`codigo_unidad`) REFERENCES `empleados` (`codigo_unidad`);

ALTER TABLE `unidades` ADD FOREIGN KEY (`codigo_unidad`) REFERENCES `bienes` (`codigo_unidad`);

ALTER TABLE `bienes` ADD FOREIGN KEY (`codigo_bien`) REFERENCES `activos_tangibles` (`codigo_bien`);

ALTER TABLE `facturas_activos_tangibles` ADD FOREIGN KEY (`numero_factura`) REFERENCES `activos_tangibles` (`numero_factura`);

ALTER TABLE `bienes` ADD FOREIGN KEY (`codigo_bien`) REFERENCES `activos_intangibles` (`codigo_bien`);

ALTER TABLE `bienes` ADD FOREIGN KEY (`codigo_bien`) REFERENCES `edificaciones` (`codigo_bien`);

ALTER TABLE `bienes` ADD FOREIGN KEY (`codigo_bien`) REFERENCES `bienes_naturales` (`codigo_bien`);

ALTER TABLE `bienes_naturales` ADD FOREIGN KEY (`codigo_bien`) REFERENCES `fotografias_bienes_naturales` (`numero_bien_natural`);

ALTER TABLE `bienes` ADD FOREIGN KEY (`codigo_bien`) REFERENCES `componentes` (`codigo_bien`);

ALTER TABLE `componentes` ADD FOREIGN KEY (`codigo_componente`) REFERENCES `nombres_componentes` (`codigo_componente`);

ALTER TABLE `componentes` ADD FOREIGN KEY (`codigo_componente`) REFERENCES `componentes_x_componentes` (`codigo_componente`);

ALTER TABLE `componentes` ADD FOREIGN KEY (`codigo_componente`) REFERENCES `componentes_x_componentes` (`codigo_componente_padre`);

ALTER TABLE `componentes` ADD FOREIGN KEY (`codigo_componente`) REFERENCES `componentes_x_activos_tangibles` (`codigo_componente`);

ALTER TABLE `activos_tangibles` ADD FOREIGN KEY (`codigo_bien`) REFERENCES `componentes_x_activos_tangibles` (`numero_bien_tangible`);

ALTER TABLE `unidades` ADD FOREIGN KEY (`codigo_unidad`) REFERENCES `formatos` (`unidad_emisora`);

ALTER TABLE `unidades` ADD FOREIGN KEY (`codigo_unidad`) REFERENCES `formatos` (`unidad_receptora`);

ALTER TABLE `empleados` ADD FOREIGN KEY (`ci`) REFERENCES `formatos` (`ficha_responsable_cedente`);

ALTER TABLE `empleados` ADD FOREIGN KEY (`ci`) REFERENCES `formatos` (`ficha_responsable_receptor`);

ALTER TABLE `formatos` ADD FOREIGN KEY (`numero_formato`) REFERENCES `movilizaciones_tangibles` (`numero_formato`);

ALTER TABLE `activos_tangibles` ADD FOREIGN KEY (`codigo_bien`) REFERENCES `movilizaciones_tangibles` (`numero_bien_tangible`);

ALTER TABLE `formatos` ADD FOREIGN KEY (`numero_formato`) REFERENCES `movilizaciones_intangibles` (`numero_formato`);

ALTER TABLE `activos_intangibles` ADD FOREIGN KEY (`codigo_bien`) REFERENCES `movilizaciones_intangibles` (`numero_bien_intangible`);

ALTER TABLE `empleados` ADD FOREIGN KEY (`ci`) REFERENCES `historial_reponsables_de_uso` (`ci`);

ALTER TABLE `bienes` ADD FOREIGN KEY (`codigo_bien`) REFERENCES `historial_reponsables_de_uso` (`codigo_bien`);

ALTER TABLE `unidades` ADD FOREIGN KEY (`ci_jefe`) REFERENCES `historial_responsables_primarios` (`ci`);

ALTER TABLE `unidades` ADD FOREIGN KEY (`codigo_unidad`) REFERENCES `historial_responsables_primarios` (`codigo_unidad`);

ALTER TABLE `inventarios` ADD FOREIGN KEY (`anio`) REFERENCES `inventarios_x_sedes` (`anio`);

ALTER TABLE `inventarios` ADD FOREIGN KEY (`semestre`) REFERENCES `inventarios_x_sedes` (`semestre`);

ALTER TABLE `sedes` ADD FOREIGN KEY (`codigo_sede`) REFERENCES `inventarios_x_sedes` (`codigo_sede`);

ALTER TABLE `inventarios` ADD FOREIGN KEY (`anio`) REFERENCES `inventarios_x_empleados` (`anio`);

ALTER TABLE `inventarios` ADD FOREIGN KEY (`semestre`) REFERENCES `inventarios_x_empleados` (`semestre`);

ALTER TABLE `empleados` ADD FOREIGN KEY (`ci`) REFERENCES `inventarios_x_empleados` (`ci_empleado`);

ALTER TABLE `inventarios` ADD FOREIGN KEY (`anio`) REFERENCES `inventarios_x_bienes` (`anio`);

ALTER TABLE `inventarios` ADD FOREIGN KEY (`semestre`) REFERENCES `inventarios_x_bienes` (`semestre`);

ALTER TABLE `bienes` ADD FOREIGN KEY (`codigo_bien`) REFERENCES `inventarios_x_bienes` (`codigo_bien`);

ALTER TABLE `sedes` ADD FOREIGN KEY (`codigo_sede`) REFERENCES `unidades` (`codigo_sede`);
