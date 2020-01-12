/*  DEFINITIVO */
/*  LISTO 1) CLAVES PRIMARIAS; */
/*  LISTO 2) DOMINIOS Y USO DE ELLOS EN EL SQL; */
/*  LISTO 3) CLAVES FORANEAS; */

-- Creacion de la base de datos
--   la realiza la aplicación

/*
  -- dominios

    -- dominios activos tangibles 
      -- STATUS_ACTIVO_TANGIBLE = ENUM('EN PROCESO DE REGISTRO', 'ACTIVO', 'DAÑADO', 'OBSOLETO', 'EN PREPARACIÓN', 'DESINCORPORADO');

    -- dominios activos intangibles
      -- STATUS_ACTIVO_INTANGIBLE = ENUM('EN PROCESO DE REGISTRO', 'VIGENTE', 'VENCIDA', 'DESINCORPORADO');

    -- dominios edificaciones 
      -- STATUS_EDIFICACIONES = ENUM('EN PROCESO DE REGISTRO', 'EN CONSTRUCCIÓN', 'HABITADA', 'DESHABITADA', 'DESINCORPORADO');
      -- TIPOS_DE_PROPIEDADES = ENUM('PROPIA', 'COMODATO');

    -- dominios bienes naturales
      -- STATUS_BIENES_NATURALES = ENUM('EN PROCESO DE REGISTRO', 'PLANTADO', 'ENFERMO', 'EXTINTO');
      -- ESTACIONES = ENUM('PRIMAVERA', 'VERANO', 'OTOÑO', 'INVIERNO');

    -- dominios inventario
      -- STATUS_INVENTARIO AS ENUM('EN EJECUCIÓN', 'EN CONCILIACIÓN', 'CERRADO');
*/

---- bonito
-- CREATE TABLE IF NOT EXISTS sedes (
--   `codigo_sede` INT NOT NULL AUTO_INCREMENT,
--   `descripcion` VARCHAR(255) UNIQUE NOT NULL,
--   `direccion` VARCHAR(255) UNIQUE NOT NULL,
--   PRIMARY KEY (`codigo_sede`)
-- ) ENGINE = InnoDB;
---- en linea
CREATE TABLE IF NOT EXISTS `sedes` ( `codigo_sede` INT NOT NULL AUTO_INCREMENT, `descripcion` VARCHAR(255) UNIQUE NOT NULL, `direccion` VARCHAR(255) UNIQUE NOT NULL, PRIMARY KEY (`codigo_sede`) ) ENGINE = InnoDB;

---- bonito
-- CREATE TABLE IF NOT EXISTS `ubicaciones` (
--   `direccion` VARCHAR(255) UNIQUE NOT NULL,
--   `nombre_ciudad` VARCHAR(255),
--   PRIMARY KEY (`direccion`),
--   FOREIGN KEY (`direccion`) REFERENCES `sedes` (`direccion`) ON DELETE RESTRICT ON UPDATE CASCADE
-- ) ENGINE = InnoDB;
---- en linea
CREATE TABLE IF NOT EXISTS `ubicaciones` ( `direccion` VARCHAR(255) UNIQUE NOT NULL, `nombre_ciudad` VARCHAR(255), PRIMARY KEY (`direccion`), FOREIGN KEY (`direccion`) REFERENCES `sedes` (`direccion`) ) ENGINE = InnoDB;

---- bonito 
-- CREATE TABLE IF NOT EXISTS `unidades` (
--   `codigo_unidad` INT NOT NULL AUTO_INCREMENT,
--   `codigo_sede` INT NOT NULL,
--   `nombre_unidad` VARCHAR(255),
--   `fecha_jefe` DATETIME DEFAULT NULL,
--   `ci_jefe` INT DEFAULT NULL,
--   PRIMARY KEY (`codigo_unidad`),
--   FOREIGN KEY (`codigo_sede`) REFERENCES `sedes` (`codigo_sede`) ON DELETE RESTRICT ON UPDATE CASCADE,
--   FOREIGN KEY (`ci_jefe`) REFERENCES `empleados` (`ci`) ON DELETE RESTRICT ON UPDATE CASCADE
-- ) ENGINE = InnoDB;
---- en linea
CREATE TABLE IF NOT EXISTS `unidades` ( `codigo_unidad` INT NOT NULL AUTO_INCREMENT, `codigo_sede` INT NOT NULL, `nombre_unidad` VARCHAR(255), `fecha_jefe` DATETIME, `ci_jefe` INT, PRIMARY KEY (`codigo_unidad`), FOREIGN KEY (`codigo_sede`) REFERENCES `sedes` (`codigo_sede`) ON DELETE RESTRICT ON UPDATE CASCADE ) ENGINE = InnoDB;

---- bonito
-- CREATE TABLE IF NOT EXISTS `empleados` (
--   `ci` INT,
--   `nombre_completo` VARCHAR(255),
--   `codigo_unidad` INT,
--   PRIMARY KEY (`ci`),
--   FOREIGN KEY (`codigo_unidad`) REFERENCES `unidades` (`codigo_unidad`) ON DELETE RESTRICT ON UPDATE CASCADE
-- ) ENGINE = InnoDB;
---- en linea
CREATE TABLE IF NOT EXISTS `empleados` ( `ci` INT, `nombre_completo` VARCHAR(255), `codigo_unidad` INT, PRIMARY KEY (`ci`) ) ENGINE = InnoDB;

ALTER TABLE `unidades` ADD FOREIGN KEY (`ci_jefe`) REFERENCES `empleados` (`ci`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `empleados` ADD FOREIGN KEY (`codigo_unidad`) REFERENCES `unidades` (`codigo_unidad`) ON DELETE RESTRICT ON UPDATE CASCADE;

---- bonito
-- CREATE TABLE IF NOT EXISTS `bienes` (
--   `codigo_bien` INT NOT NULL AUTO_INCREMENT,
--   `descripcion` VARCHAR(255),
--   `fecha_incorporacion` DATETIME,
--   `fecha_desincorporacion` DATETIME,
--   `origen` VARCHAR(255),
--   `codigo_unidad` INT,
--   `tipo` VARCHAR(255),
--   PRIMARY KEY (`codigo_bien`),
--   FOREIGN KEY (`codigo_unidad`) REFERENCES `unidades` (`codigo_unidad`) ON DELETE RESTRICT ON UPDATE CASCADE,
--   CHECK (`fecha_desincorporacion` > `fecha_incorporacion`)
-- ) ENGINE = InnoDB;
---- en linea
CREATE TABLE IF NOT EXISTS `bienes` ( `codigo_bien` INT NOT NULL AUTO_INCREMENT, `descripcion` VARCHAR(255), `fecha_incorporacion` DATETIME, `fecha_desincorporacion` DATETIME, `origen` VARCHAR(255), `codigo_unidad` INT, `tipo` VARCHAR(255), PRIMARY KEY (`codigo_bien`), FOREIGN KEY (`codigo_unidad`) REFERENCES `unidades` (`codigo_unidad`) ON DELETE RESTRICT ON UPDATE CASCADE, CHECK (`fecha_desincorporacion` > `fecha_incorporacion`) ) ENGINE = InnoDB;

---- bonito
-- CREATE TABLE IF NOT EXISTS `activos_tangibles` (
--   `codigo_bien` INT NOT NULL,
--   `numero_factura` INT UNIQUE NOT NULL,
--   `status` ENUM('EN PROCESO DE REGISTRO', 'ACTIVO', 'DAÑADO', 'OBSOLETO', 'EN PREPARACIÓN', 'DESINCORPORADO') NOT NULL,
--   PRIMARY KEY (`codigo_bien`),
--   FOREIGN KEY (`codigo_bien`) REFERENCES `bienes` (`codigo_bien`) ON DELETE CASCADE ON UPDATE CASCADE
-- ) ENGINE = InnoDB;
---- en linea
CREATE TABLE IF NOT EXISTS `activos_tangibles` ( `codigo_bien` INT NOT NULL, `numero_factura` INT UNIQUE NOT NULL, `status` ENUM('EN PROCESO DE REGISTRO', 'ACTIVO', 'DAÑADO', 'OBSOLETO', 'EN PREPARACIÓN', 'DESINCORPORADO') NOT NULL, PRIMARY KEY (`codigo_bien`), FOREIGN KEY (`codigo_bien`) REFERENCES `bienes` (`codigo_bien`) ON DELETE CASCADE ON UPDATE CASCADE ) ENGINE = InnoDB;

---- bonito
-- CREATE TABLE IF NOT EXISTS `facturas_activos_tangibles` (
--   `numero_factura` INT UNIQUE NOT NULL,
--   `numero_orden` INT,
--   `proveedor` VARCHAR(255) NOT NULL,
--   `precio` float NOT NULL,
--   `plazo_garantia` INT,
--   PRIMARY KEY (`numero_factura`),
--   KEY (`numero_orden`)
--   FOREIGN KEY (`numero_factura`) REFERENCES `activos_tangibles` (`numero_factura`) ON DELETE RESTRICT ON UPDATE CASCADE
-- ) ENGINE = InnoDB;
---- en linea
CREATE TABLE IF NOT EXISTS `facturas_activos_tangibles` ( `numero_factura` INT NOT NULL, `numero_orden` INT, `proveedor` VARCHAR(255) NOT NULL, `precio` float NOT NULL, `plazo_garantia` INT, PRIMARY KEY (`numero_factura`), FOREIGN KEY (`numero_factura`) REFERENCES `activos_tangibles` (`numero_factura`) ON DELETE RESTRICT ON UPDATE CASCADE ) ENGINE = InnoDB;

---- bonito
-- CREATE TABLE IF NOT EXISTS `activos_intangibles` (
--   `codigo_bien` INT,
--   `fecha_caducidad` DATETIME NOT NULL,
--   `es_compartido` BOOLEAN NOT NULL DEFAULT false,
--   `status` ENUM('EN PROCESO DE REGISTRO', 'VIGENTE', 'VENCIDA', 'DESINCORPORADO') NOT NULL,
--   PRIMARY KEY (`codigo_bien`),
--   FOREIGN KEY (`codigo_bien`) REFERENCES `bienes` (`codigo_bien`) ON DELETE CASCADE ON UPDATE CASCADE
-- ) ENGINE = InnoDB;
---- en linea
CREATE TABLE IF NOT EXISTS `activos_intangibles` ( `codigo_bien` INT, `fecha_caducidad` DATETIME NOT NULL, `es_compartido` BOOLEAN NOT NULL DEFAULT false, `status` ENUM('EN PROCESO DE REGISTRO', 'VIGENTE', 'VENCIDA', 'DESINCORPORADO') NOT NULL, PRIMARY KEY (`codigo_bien`), FOREIGN KEY (`codigo_bien`) REFERENCES `bienes` (`codigo_bien`) ON DELETE CASCADE ON UPDATE CASCADE ) ENGINE = InnoDB;

---- bonito
-- CREATE TABLE IF NOT EXISTS `edificaciones` (
--   `codigo_bien` INT,
--   `ubicacion` VARCHAR(255) NOT NULL,
--   `superficie` float NOT NULL,
--   `tipo_propiedad` ENUM('PROPIA', 'COMODATO') NOT NULL,
--   `status` ENUM('EN PROCESO DE REGISTRO', 'EN CONSTRUCCIÓN', 'HABITADA', 'DESHABITADA', 'DESINCORPORADO') NOT NULL,
--   PRIMARY KEY (`codigo_bien`),
--   FOREIGN KEY (`codigo_bien`) REFERENCES `bienes` (`codigo_bien`) ON DELETE CASCADE ON UPDATE CASCADE
-- ) ENGINE = InnoDB;
---- en linea
CREATE TABLE IF NOT EXISTS `edificaciones` ( `codigo_bien` INT, `ubicacion` VARCHAR(255) NOT NULL, `superficie` float NOT NULL, `tipo_propiedad` ENUM('PROPIA', 'COMODATO') NOT NULL, `status` ENUM('EN PROCESO DE REGISTRO', 'EN CONSTRUCCIÓN', 'HABITADA', 'DESHABITADA', 'DESINCORPORADO') NOT NULL, PRIMARY KEY (`codigo_bien`), FOREIGN KEY (`codigo_bien`) REFERENCES `bienes` (`codigo_bien`) ON DELETE CASCADE ON UPDATE CASCADE ) ENGINE = InnoDB;

---- bonito
-- CREATE TABLE IF NOT EXISTS `bienes_naturales` (
--   `codigo_bien` INT,
--   `nombre_cientifico` VARCHAR(255) NOT NULL,
--   `nombre_vulgar` VARCHAR(255) NOT NULL,
--   `es_frutal` boolean NOT NULL DEFAULT false,
--   `periodo_floral` ENUM('PRIMAVERA', 'VERANO', 'OTOÑO', 'INVIERNO') NOT NULL,
--   `origen` VARCHAR(255) NOT NULL,
--   `ubicacion` VARCHAR(255) NOT NULL,
--   `status` ENUM('EN PROCESO DE REGISTRO', 'PLANTADO', 'ENFERMO', 'EXTINTO') NOT NULL,
--   PRIMARY KEY (`codigo_bien`),
--   FOREIGN KEY (`codigo_bien`) REFERENCES `bienes` (`codigo_bien`) ON DELETE CASCADE ON UPDATE CASCADE
-- ) ENGINE = InnoDB;
---- en linea
CREATE TABLE IF NOT EXISTS `bienes_naturales` ( `codigo_bien` INT, `nombre_cientifico` VARCHAR(255) NOT NULL, `nombre_vulgar` VARCHAR(255) NOT NULL, `es_frutal` boolean NOT NULL DEFAULT false, `periodo_floral` ENUM('PRIMAVERA', 'VERANO', 'OTOÑO', 'INVIERNO') NOT NULL, `origen` VARCHAR(255) NOT NULL, `ubicacion` VARCHAR(255) NOT NULL, `status` ENUM('EN PROCESO DE REGISTRO', 'PLANTADO', 'ENFERMO', 'EXTINTO') NOT NULL, PRIMARY KEY (`codigo_bien`), FOREIGN KEY (`codigo_bien`) REFERENCES `bienes` (`codigo_bien`) ON DELETE CASCADE ON UPDATE CASCADE ) ENGINE = InnoDB;

---- bonito
-- CREATE TABLE IF NOT EXISTS `fotografias_bienes_naturales` (
--   `codigo_bien_natural` INT,
--   `fotografia` BLOB NOT NULL,
--   PRIMARY KEY (`codigo_bien_natural`),
--   FOREIGN KEY (`codigo_bien_natural`) REFERENCES `bienes_naturales` (`codigo_bien`) ON DELETE RESTRICT ON UPDATE CASCADE
-- ) ENGINE = InnoDB;
---- en linea
CREATE TABLE IF NOT EXISTS `fotografias_bienes_naturales` ( `codigo_bien_natural` INT, `fotografia` BLOB NOT NULL, PRIMARY KEY (`codigo_bien_natural`), FOREIGN KEY (`codigo_bien_natural`) REFERENCES `bienes_naturales` (`codigo_bien`) ON DELETE RESTRICT ON UPDATE CASCADE ) ENGINE = InnoDB;

---- bonito
-- CREATE TABLE IF NOT EXISTS `componentes` (
--   `codigo_bien` INT,
--   `codigo_componente` INT UNIQUE NOT NULL AUTO_INCREMENT,
--   `nombre_componente` VARCHAR(255) NOT NULL,
--   PRIMARY KEY (`codigo_bien`, `codigo_componente`),
--   FOREIGN KEY (`codigo_bien`) REFERENCES `bienes` (`codigo_bien`) ON DELETE RESTRICT ON UPDATE CASCADE
-- ) ENGINE = InnoDB;
---- en linea
CREATE TABLE IF NOT EXISTS `componentes` ( `codigo_bien` INT, `codigo_componente` INT UNIQUE NOT NULL AUTO_INCREMENT, `nombre_componente` VARCHAR(255) NOT NULL, PRIMARY KEY (`codigo_bien`, `codigo_componente`), FOREIGN KEY (`codigo_bien`) REFERENCES `bienes` (`codigo_bien`) ON DELETE RESTRICT ON UPDATE CASCADE ) ENGINE = InnoDB;

---- bonito
-- CREATE TABLE IF NOT EXISTS `nombres_componentes` (
--   `codigo_componente` INT NOT NULL,
--   `nombre_componente` VARCHAR(255) NOT NULL,
--   PRIMARY KEY (`codigo_componente`),
--   FOREIGN KEY (`codigo_componente`) REFERENCES `componentes` (`codigo_componente`) ON DELETE RESTRICT ON UPDATE CASCADE
-- ) ENGINE = InnoDB;
---- en linea
--CREATE TABLE IF NOT EXISTS `nombres_componentes` ( `codigo_componente` INT NOT NULL, `nombre_componente` VARCHAR(255) NOT NULL, PRIMARY KEY (`codigo_componente`), FOREIGN KEY (`codigo_componente`) REFERENCES `componentes` (`codigo_componente`) ON DELETE RESTRICT ON UPDATE CASCADE ) ENGINE = InnoDB;

---- bonito
-- CREATE TABLE IF NOT EXISTS `componentes_x_componentes` (
--   `codigo_componente` INT,
--   `codigo_componente_padre` INT NOT NULL,
--   PRIMARY KEY (`codigo_componente`, `codigo_componente_padre`),
--   FOREIGN KEY (`codigo_componente`) REFERENCES `componentes` (`codigo_componente`) ON DELETE RESTRICT ON UPDATE CASCADE,
--   FOREIGN KEY (`codigo_componente_padre`) REFERENCES `componentes` (`codigo_componente`) ON DELETE RESTRICT ON UPDATE CASCADE
-- ) ENGINE = InnoDB;
---- en linea
CREATE TABLE IF NOT EXISTS `componentes_x_componentes` ( `codigo_componente` INT, `codigo_componente_padre` INT NOT NULL, PRIMARY KEY (`codigo_componente`, `codigo_componente_padre`), FOREIGN KEY (`codigo_componente`) REFERENCES `componentes` (`codigo_componente`) ON DELETE RESTRICT ON UPDATE CASCADE, FOREIGN KEY (`codigo_componente_padre`) REFERENCES `componentes` (`codigo_componente`) ON DELETE RESTRICT ON UPDATE CASCADE ) ENGINE = InnoDB;

---- bonito
-- CREATE TABLE IF NOT EXISTS `componentes_x_activos_tangibles` (
--   `codigo_componente` INT,
--   `codigo_bien_tangible` INT NOT NULL,
--   PRIMARY KEY (`codigo_componente`, `codigo_bien_tangible`),
--   FOREIGN KEY (`codigo_bien_tangible`) REFERENCES `activos_tangibles` (`codigo_bien`) ON DELETE RESTRICT ON UPDATE CASCADE,
--   FOREIGN KEY (`codigo_componente`) REFERENCES `componentes` (`codigo_componente`) ON DELETE RESTRICT ON UPDATE CASCADE
-- ) ENGINE = InnoDB;
---- en linea
CREATE TABLE IF NOT EXISTS `componentes_x_activos_tangibles` ( `codigo_componente` INT, `codigo_bien_tangible` INT NOT NULL, PRIMARY KEY (`codigo_componente`, `codigo_bien_tangible`), FOREIGN KEY (`codigo_bien_tangible`) REFERENCES `activos_tangibles` (`codigo_bien`) ON DELETE RESTRICT ON UPDATE CASCADE, FOREIGN KEY (`codigo_componente`) REFERENCES `componentes` (`codigo_componente`) ON DELETE RESTRICT ON UPDATE CASCADE ) ENGINE = InnoDB;

---- bonito
-- CREATE TABLE IF NOT EXISTS `formatos` (
--   `numero_formato` INT NOT NULL AUTO_INCREMENT,
--   `codigo_unidad_emisora` INT NOT NULL,
--   `codigo_unidad_receptora` INT NOT NULL,
--   `ficha_responsable_cedente` INT NOT NULL,
--   `ficha_responsable_receptor` INT NOT NULL,
--   `aprobacion_emisor` boolean NOT NULL DEFAULT false,
--   `aprobacion_receptor` boolean NOT NULL DEFAULT false,
--   `fecha_formato` DATETIME NOT NULL,
--   PRIMARY KEY (`numero_formato`),
--   FOREIGN KEY (`ficha_responsable_cedente`) REFERENCES `empleados` (`ci`) ON DELETE RESTRICT ON UPDATE CASCADE,/*REVISAR*/
--   FOREIGN KEY (`ficha_responsable_receptor`) REFERENCES `empleados` (`ci`) ON DELETE RESTRICT ON UPDATE CASCADE,/*REVISAR*/
--   FOREIGN KEY (`codigo_unidad_emisora`) REFERENCES `unidades` (`codigo_unidad`) ON DELETE RESTRICT ON UPDATE CASCADE,
--   FOREIGN KEY (`codigo_unidad_receptora`) REFERENCES `unidades` (`codigo_unidad`) ON DELETE RESTRICT ON UPDATE CASCADE
-- ) ENGINE = InnoDB;
---- en linea
CREATE TABLE IF NOT EXISTS `formatos` ( `numero_formato` INT NOT NULL AUTO_INCREMENT, `codigo_unidad_emisora` INT NOT NULL, `codigo_unidad_receptora` INT NOT NULL, `ficha_responsable_cedente` INT NOT NULL, `ficha_responsable_receptor` INT NOT NULL, `aprobacion_emisor` boolean NOT NULL DEFAULT false, `aprobacion_receptor` boolean NOT NULL DEFAULT false, `fecha_formato` DATETIME NOT NULL, PRIMARY KEY (`numero_formato`), FOREIGN KEY (`ficha_responsable_cedente`) REFERENCES `empleados` (`ci`) ON DELETE RESTRICT ON UPDATE CASCADE,/*REVISAR*/ FOREIGN KEY (`ficha_responsable_receptor`) REFERENCES `empleados` (`ci`) ON DELETE RESTRICT ON UPDATE CASCADE,/*REVISAR*/ FOREIGN KEY (`codigo_unidad_emisora`) REFERENCES `unidades` (`codigo_unidad`) ON DELETE RESTRICT ON UPDATE CASCADE, FOREIGN KEY (`codigo_unidad_receptora`) REFERENCES `unidades` (`codigo_unidad`) ON DELETE RESTRICT ON UPDATE CASCADE ) ENGINE = InnoDB;

---- bonito
-- CREATE TABLE IF NOT EXISTS `movilizaciones_tangibles` (
--   `numero_formato` INT NOT NULL,
--   `codigo_bien_tangible` INT NOT NULL,
--   PRIMARY KEY (`numero_formato`, `codigo_bien_tangible`),
--   FOREIGN KEY (`codigo_bien_tangible`) REFERENCES `activos_tangibles` (`codigo_bien`) ON DELETE RESTRICT ON UPDATE CASCADE,
--   FOREIGN KEY (`numero_formato`) REFERENCES `formatos` (`numero_formato`) ON DELETE RESTRICT ON UPDATE CASCADE
-- ) ENGINE = InnoDB;
---- en linea
CREATE TABLE IF NOT EXISTS `movilizaciones_tangibles` ( `numero_formato` INT NOT NULL, `codigo_bien_tangible` INT NOT NULL, PRIMARY KEY (`numero_formato`, `codigo_bien_tangible`) ) ENGINE = InnoDB;
ALTER TABLE `movilizaciones_tangibles` ADD FOREIGN KEY (`codigo_bien_tangible`) REFERENCES `activos_tangibles` (`codigo_bien`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `movilizaciones_tangibles` ADD FOREIGN KEY (`numero_formato`) REFERENCES `formatos` (`numero_formato`); -- ON DELETE RESTRICT ON UPDATE CASCADE;

---- bonito
-- CREATE TABLE IF NOT EXISTS `movilizaciones_intangibles` (
--   `numero_formato` INT NOT NULL,
--   `codigo_bien_intangible` INT NOT NULL,
--   PRIMARY KEY (`numero_formato`, `codigo_bien_intangible`),
--   FOREIGN KEY (`codigo_bien_intagible`) REFERENCES `activos_intangibles` (`codigo_bien`) ON DELETE RESTRICT ON UPDATE CASCADE,
--   FOREIGN KEY (`numero_formato`) REFERENCES `formatos` (`numero_formato`) ON DELETE RESTRICT ON UPDATE CASCADE
-- ) ENGINE = InnoDB;
---- en linea
CREATE TABLE IF NOT EXISTS `movilizaciones_intangibles` ( `numero_formato` INT NOT NULL, `codigo_bien_intangible` INT NOT NULL, PRIMARY KEY (`numero_formato`, `codigo_bien_intangible`) ) ENGINE = InnoDB;
ALTER TABLE `movilizaciones_intangibles` ADD FOREIGN KEY (`codigo_bien_intangible`) REFERENCES `activos_intangibles` (`codigo_bien`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `movilizaciones_intangibles` ADD FOREIGN KEY (`numero_formato`) REFERENCES `formatos` (`numero_formato`); -- ON DELETE RESTRICT ON UPDATE CASCADE;

---- bonito
-- CREATE TABLE IF NOT EXISTS `historial_reponsables_de_uso` (
--   `ci` INT,
--   `codigo_bien` INT NOT NULL,
--   PRIMARY KEY (`ci`, `codigo_bien`),
-- ) ENGINE = InnoDB;
---- en linea
CREATE TABLE IF NOT EXISTS `historial_reponsables_de_uso` ( `ci` INT, `codigo_bien` INT NOT NULL, PRIMARY KEY (`ci`, `codigo_bien`)) ENGINE = InnoDB;

---- bonito-- CREATE TABLE IF NOT EXISTS `historial_responsables_primarios` (
--   `ci` INT,
--   `codigo_unidad` INT NOT NULL,
--   PRIMARY KEY (`ci`, `codigo_unidad`),
-- );
---- en linea
CREATE TABLE IF NOT EXISTS `historial_responsables_primarios` ( `ci` INT, `codigo_unidad` INT NOT NULL, PRIMARY KEY (`ci`, `codigo_unidad`) ) ENGINE = InnoDB;

---- bonito
-- CREATE TABLE IF NOT EXISTS `inventarios` (
--   `anio` INT,
--   `semestre` VARCHAR(255),
--   `fecha_inicio` DATETIME NOT NULL,
--   `fecha_fin` DATETIME NOT NULL,
--   `status` ENUM('EN EJECUCIÓN', 'EN CONCILIACIÓN', 'CERRADO') NOT NULL,
--   `ci_lider_inventario` INT,
--   PRIMARY KEY (`anio`, `semestre`),
--   FOREIGN KEY (`ci_lider_inventario`) REFERENCES `empleados` (`ci`) ON DELETE RESTRICT ON UPDATE CASCADE
-- ) ENGINE = InnoDB;
---- en linea
CREATE TABLE IF NOT EXISTS `inventarios` ( `anio` INT, `semestre` VARCHAR(255), `fecha_inicio` DATETIME NOT NULL, `fecha_fin` DATETIME NOT NULL, `status` ENUM('EN EJECUCIÓN', 'EN CONCILIACIÓN', 'CERRADO') NOT NULL, `ci_lider_inventario` INT, PRIMARY KEY (`anio`, `semestre`), FOREIGN KEY (`ci_lider_inventario`) REFERENCES `empleados` (`ci`) ON DELETE RESTRICT ON UPDATE CASCADE ) ENGINE = InnoDB;

---- bonito
-- CREATE TABLE IF NOT EXISTS `inventarios_x_sedes` (
--   `anio` INT,
--   `semestre` VARCHAR(255),
--   `codigo_sede` INT NOT NULL,
--   PRIMARY KEY (`anio`, `semestre`, `codigo_sede`),
--   FOREIGN KEY (`codigo_sede`) REFERENCES `sedes` (`codigo_sede`) ON DELETE RESTRICT ON UPDATE CASCADE,
--   FOREIGN KEY (`anio`, `semestre`) REFERENCES `inventarios` (`anio`, `semestre`) ON DELETE RESTRICT ON UPDATE CASCADE
-- ) ENGINE = InnoDB;
---- en linea
CREATE TABLE IF NOT EXISTS `inventarios_x_sedes` (`anio` INT,`semestre` VARCHAR(255),`codigo_sede` INT NOT NULL,PRIMARY KEY (`anio`, `semestre`, `codigo_sede`),FOREIGN KEY (`codigo_sede`) REFERENCES `sedes` (`codigo_sede`) ON DELETE RESTRICT ON UPDATE CASCADE,FOREIGN KEY (`anio`, `semestre`) REFERENCES `inventarios` (`anio`, `semestre`) ON DELETE RESTRICT ON UPDATE CASCADE ) ENGINE = InnoDB;


---- bonito
-- CREATE TABLE IF NOT EXISTS `inventarios_x_empleados` (
--   `anio` INT,
--   `semestre` VARCHAR(255),
--   `ci_empleado` INT NOT NULL,
--   PRIMARY KEY (`anio`, `semestre`, `ci_empleado`),
--   FOREIGN KEY (`ci_empleado`) REFERENCES `empleados` (`ci`) ON DELETE RESTRICT ON UPDATE CASCADE,
--   FOREIGN KEY (`anio`, `semestre`) REFERENCES `inventarios` (`anio`, `semestre`) ON DELETE RESTRICT ON UPDATE CASCADE
-- ) ENGINE = InnoDB;
---- en linea
CREATE TABLE IF NOT EXISTS `inventarios_x_empleados` (`anio` INT,`semestre` VARCHAR(255),`ci_empleado` INT NOT NULL,PRIMARY KEY (`anio`, `semestre`, `ci_empleado`),FOREIGN KEY (`ci_empleado`) REFERENCES `empleados` (`ci`) ON DELETE RESTRICT ON UPDATE CASCADE,FOREIGN KEY (`anio`, `semestre`) REFERENCES `inventarios` (`anio`, `semestre`) ON DELETE RESTRICT ON UPDATE CASCADE ) ENGINE = InnoDB;

---- bonito
-- CREATE TABLE IF NOT EXISTS `inventarios_x_bienes` (
--   `anio` INT,
--   `semestre` VARCHAR(255),
--   `codigo_bien` INT,
--   `ci_empleado` INT,
--   `fecha_realizacion` DATETIME,
--   PRIMARY KEY (`anio`, `semestre`, `codigo_bien`),
--   FOREIGN KEY (`codigo_bien`) REFERENCES `bienes` (`codigo_bien`) ON DELETE RESTRICT ON UPDATE CASCADE,
--   FOREIGN KEY (`anio`, `semestre`) REFERENCES `inventarios` (`anio`, `semestre`) ON DELETE RESTRICT ON UPDATE CASCADE
-- ) ENGINE = InnoDB;
---- en linea
CREATE TABLE IF NOT EXISTS `inventarios_x_bienes` ( `anio` INT, `semestre` VARCHAR(255), `codigo_bien` INT, `ci_empleado` INT, `fecha_realizacion` DATETIME, PRIMARY KEY (`anio`, `semestre`, `codigo_bien`), FOREIGN KEY (`codigo_bien`) REFERENCES `bienes` (`codigo_bien`) ON DELETE RESTRICT ON UPDATE CASCADE, FOREIGN KEY (`anio`, `semestre`) REFERENCES `inventarios` (`anio`, `semestre`) ON DELETE RESTRICT ON UPDATE CASCADE ) ENGINE = InnoDB;

