-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 23, 2023 at 08:08 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `clinicamiadb`
--
CREATE DATABASE IF NOT EXISTS `clinicamiadb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `clinicamiadb`;

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `cancelarCita` (`idCitaC` INT(11))   BEGIN
    UPDATE citas SET estado ='C' WHERE id = idCitaC;
    
    DELETE FROM citausuario WHERE idCita = idCitaC;
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertarCita` (`nombreC` VARCHAR(100), `fechaC` DATE, `horaC` TIME, `estadoC` VARCHAR(20), `idConsultorioC` INT(11))   BEGIN 
	IF NOT EXISTS((SELECT * FROM citas WHERE (fecha = fechaC AND hora = horaC) AND (idConsultorio = idConsultorioC AND fechaC >= CURDATE())))
	THEN
			INSERT INTO citas(nombre,fecha,hora,estado,idConsultorio) 
			VALUES(nombreC,fechaC,horaC,estadoC,idConsultorioC); 
	END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `modificarCU` (`idUsuarioC` INT(11), `idCitaC` INT(11), `observacionC` VARCHAR(100))   BEGIN
	INSERT INTO citausuario(idUsuario,idCita,observacion) 
    VALUES(idUsuarioC,idCitaC,observacionC);
    
    UPDATE citas SET estado ='R' WHERE id = idCitaC;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `mostrarExpeCompar` (`idUsuario` INT(11))   BEGIN 
	IF EXISTS(SELECT * FROM usuario WHERE id = idUsuario)
	THEN
			SELECT e.id, u.nombre, u.apellidos, u.cedula, ce.fecha FROM expediente e, compartirexpe ce, usuario u where (u.id = e.idUsuario AND u.id != idUsuario) AND  (e.id = ce.idExpediente AND ce.idUsuario = idUsuario); 
	END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `selectAlergias` ()   BEGIN
	SELECT a.id, a.nombre, a.reaccion, a.observacion, ta.nombre as tipoalergia
	FROM alergia a, tipoalergia ta
	WHERE a.idTipo = ta.id;
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `selectCirugia` ()   BEGIN
	SELECT  c.id,c.nombre, c.lugar, c.fecha, c.hora, c.idExpediente AS expediente, u.cedula AS usuario
	FROM cirugia c, usuario u, expediente e
	WHERE (u.id = e.idUsuario AND e.id = c.idExpediente);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `selectCirugiaXIDExpe` (`idExpe` INT(11))   BEGIN
	SELECT c.id,c.nombre, c.lugar, c.fecha, c.hora, c.idExpediente AS expediente, u.cedula AS usuario
	FROM cirugia c, usuario u, expediente e
	WHERE (u.id = e.idUsuario AND e.id = c.idExpediente) AND c.idExpediente = idExpe;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `selectCitas` (`idC` INT(11))   BEGIN 
	IF ((SELECT idRol FROM usuario WHERE id = idC) = 1)
	THEN
			SELECT c.id, c.nombre, c.fecha, c.hora, c.idConsultorio,
            con.nombre AS consultorio, con.ubicacion, con.precio
			FROM citas c
			INNER JOIN consultorio con ON c.idConsultorio = con.id
			INNER JOIN usuario u ON con.idUsuario = u.id 
			WHERE (c.estado = 'D' AND c.fecha >= CURDATE()) AND u.id = idC
			ORDER BY fecha DESC;
	ELSE
			SELECT c.id, c.nombre, c.fecha, c.hora, c.idConsultorio,
            con.nombre AS consultorio, con.ubicacion, con.precio
			FROM citas c, consultorio con, usuario u
			WHERE (c.idConsultorio = con.id) AND(c.estado = 'D' AND c.fecha >= CURDATE()) 
			GROUP BY nombre 
			ORDER BY idConsultorio DESC, fecha DESC, hora DESC;

    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `selectCitasCanceladas` (`idC` INT(11))   BEGIN 
	IF ((SELECT idRol FROM usuario WHERE id = idC) = 1)
	THEN
		SELECT c.id,c.nombre, c.fecha, c.hora, c.estado, c.idConsultorio, co.nombre as consultorio, co.ubicacion, co.precio
		FROM citas c
		INNER JOIN consultorio co ON co.id = c.idConsultorio
		INNER JOIN usuario u ON co.idUsuario = u.id
		WHERE (c.fecha >= CURDATE() AND c.estado = 'C') AND u.id = idC;
	ELSE
		SELECT c.id,c.nombre, c.fecha, c.hora, c.estado, c.idConsultorio, co.nombre as consultorio, co.ubicacion, co.precio
		FROM citas c
		INNER JOIN consultorio co ON co.id = c.idConsultorio
		INNER JOIN usuario u ON co.idUsuario = u.id
		WHERE (c.fecha >= CURDATE() AND c.estado = 'C');
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `selectCitasMedicos` ()   BEGIN 
	SELECT u.nombre, u.apellidos, u.cedula, c.fecha, COUNT(c.idConsultorio) AS cantidadCitas
	FROM usuario u, citas c, consultorio con
	WHERE u.id = con.idUsuario AND con.id = c.idConsultorio
	GROUP BY nombre
	ORDER BY cantidadCitas ASC
	LIMIT 10; 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `selectCitasRegistradas` ()   BEGIN 
	SELECT u.nombre, u.apellidos, u.cedula, c.fecha, con.nombre as consultorio, COUNT(c.fecha) AS cantidadCitas
	FROM usuario u, citas c, consultorio con
	WHERE (u.id = con.idUsuario AND con.id = c.idConsultorio) AND fecha >= CURDATE()
	GROUP BY fecha, consultorio
	ORDER BY cantidadCitas ASC; 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `selectCitasReservadas` (`idC` INT(11))   BEGIN 
	IF ((SELECT idRol FROM usuario WHERE id = idC) = 1)
	THEN
		SELECT c.id,c.nombre, c.fecha, c.hora, c.estado, c.idConsultorio, co.nombre as consultorio, co.ubicacion, co.precio
		FROM citas c
		INNER JOIN consultorio co ON co.id = c.idConsultorio
		INNER JOIN usuario u ON co.idUsuario = u.id
		WHERE (c.fecha >= CURDATE() AND c.estado = 'R') AND u.id = idC;
	ELSE
		SELECT c.id,c.nombre, c.fecha, c.hora, c.estado, c.idConsultorio, co.nombre as consultorio, co.ubicacion, co.precio
		FROM citas c
		INNER JOIN consultorio co ON co.id = c.idConsultorio
		INNER JOIN usuario u ON co.idUsuario = u.id
		WHERE (c.fecha >= CURDATE() AND c.estado = 'R');
	END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `selectCitasXID` (`idC` INT(11))   BEGIN 
	IF ((SELECT idRol FROM usuario WHERE id = idC) = 1)
	THEN
			SELECT c.id, c.nombre, c.fecha, c.hora, c.idConsultorio,
            con.nombre AS consultorio, con.ubicacion, con.precio
			FROM citas c
			INNER JOIN consultorio con ON c.idConsultorio = con.id
			INNER JOIN usuario u ON con.idUsuario = u.id 
			WHERE (c.estado = 'D' AND c.fecha >= CURDATE()) AND u.id = idC
			ORDER BY fecha DESC;
	ELSE
			SELECT c.id, c.nombre, c.fecha, c.hora, c.idConsultorio,
            con.nombre AS consultorio, con.ubicacion, con.precio
			FROM citas c, consultorio con, usuario u
			WHERE (c.idConsultorio = con.id) AND(c.estado = 'D' AND c.fecha >= CURDATE()) 
			GROUP BY nombre
			ORDER BY fecha DESC;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `selectCitasXIDCita` (`idCita` INT(11))   BEGIN
	SELECT c.id,c.nombre, c.fecha, c.hora, c.estado, c.idConsultorio, co.nombre AS consultorio, co.precio, co.ubicacion
	FROM citas c, consultorio co 
	WHERE  co.id= c.idConsultorio AND c.id = idCita;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `selectCitasXidConsult` (`fechaC` DATE, `horaC` TIME, `idConsul` INT(11), `nombreC` VARCHAR(100))   BEGIN
	SELECT c.id, c.nombre, c.fecha, c.hora, c.estado, c.idConsultorio, co.nombre AS consultorio
	FROM citas c, consultorio co 
    WHERE (c.fecha = fechaC AND c.hora = horaC)  AND (c.idConsultorio = idConsul AND c.nombre = nombreC);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `selectClientesXRol` ()   BEGIN
    SELECT u.id, u.nombre, u.apellidos, u.cedula,u.correo, u.clave, u.idGenero, g.nombre AS genero, u.idRol, r.nombre as rol
	FROM usuario u, genero g, rol r 
    WHERE (g.id = u.idGenero AND u.idRol = r.id) AND  r.id = 2
    ORDER BY u.cedula DESC; 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `selectConsultorios` ()   BEGIN
       SELECT c.id, c.nombre, c.ubicacion, c.precio, e.nombre AS especialidad, u.nombre AS medico, u.apellidos as apellidos
	 FROM consultorio c, especialidad e, usuario u 
	 WHERE(e.id = c.idEspecialidad AND u.id = c.idUsuario)
     ORDER BY especialidad;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `selectEnfermedades` ()   BEGIN
    SELECT id, nombre 
    FROM enfermedad;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `selectEspecialidad` ()   BEGIN
    SELECT id, nombre
    FROM especialidad;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `selectExpediente` ()   BEGIN
	SELECT e.id, e.idUsuario, u.cedula, u.nombre, u.apellidos, u.correo,
     g.nombre AS genero, e.fechaNac
	 FROM expediente e, usuario u, genero g
     WHERE g.id = u.idGenero AND u.id = e.idUsuario;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `selectGeneros` ()   BEGIN
    SELECT id, nombre 
    FROM genero;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `selectIDAlergia` (`idAlergia` INT(11))   BEGIN
	SELECT a.id, a.nombre, a.reaccion, a.observacion, a.idTipo
	FROM alergia a, tipoalergia ta
	WHERE a.idTipo = ta.id AND a.id = idAlergia;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `selectIDEspecialidad` (`idEsp` INT(11))   BEGIN
    SELECT id, nombre
    FROM especialidad WHERE id= idEsp;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `selectLogin` (`idC` INT(11))   BEGIN
     IF ((SELECT idRol FROM usuario WHERE id = idC) = 1)
	THEN
			 IF EXISTS((SELECT idUsuario FROM consultorio WHERE idUsuario = idC))
			 THEN 
				SELECT u.*, c.id as idCE FROM usuario u, consultorio c 
				WHERE c.idUsuario = u.id AND u.id = idC;
			ELSE
				SELECT u.*, u.id as idCE FROM usuario u
				WHERE u.id = idC;
			END IF;
	ELSEIF ((SELECT idRol FROM usuario WHERE id = idC) = 2)
    THEN
			IF EXISTS((SELECT idUsuario FROM expediente WHERE idUsuario = idC))
			THEN
				SELECT u.*, e.id as idCE FROM usuario u, expediente e 
				WHERE e.idUsuario = u.id AND u.id = idC;
			ELSE 
				SELECT u.*, u.id as idCE FROM usuario u 
				WHERE u.id = idC;
			END IF;
    ELSE
		SELECT u.*, u.id as idCE FROM usuario u
		WHERE  u.id = idC;
	END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `selectMedicamentos` ()   BEGIN
    SELECT id, nombre, prescripcion
	FROM medicamento;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `selectMedicosXRol` ()   BEGIN
     SELECT u.id, u.nombre, u.apellidos, u.cedula,u.correo,  u.clave, g.nombre AS genero
	FROM usuario u, genero g, rol r 
    WHERE (g.id = u.idGenero AND u.idRol = r.id) AND  r.id = 1
    ORDER BY u.cedula DESC; 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `selectRoles` ()   BEGIN
    SELECT id, nombre
    FROM rol;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `selectTipoAlergia` ()   BEGIN
    SELECT id, nombre 
    FROM tipoalergia;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `selectTipoSangre` ()   BEGIN
    SELECT id, nombre
    FROM tiposangre;   
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `selectUsuarios` ()   BEGIN
	SELECT u.id, u.nombre, u.apellidos, u.cedula, u.correo, g.nombre AS genero, r.nombre AS rol
	FROM usuario u, genero g, rol r 
    WHERE (g.id = u.idGenero AND r.id = u.idRol) 
    ORDER BY cedula DESC;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `selectUsuarioXIDUser` (`idUser` INT(11))   BEGIN
 SELECT u.id,u.nombre, u.apellidos, u.cedula,u.correo, u.clave, u.idGenero, g.nombre AS genero, u.idRol, r.nombre AS rol
	FROM usuario u, genero g, rol r
    WHERE (g.id = u.idGenero AND r.id = u.idRol) AND u.id = idUser
    ORDER BY rol; 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `selectXIDMed` (`idMed` INT(11))   BEGIN
    SELECT id, nombre, prescripcion
	FROM medicamento WHERE id = idMed;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateCita` (`idC` INT(11), `nombreC` VARCHAR(100), `fechaC` DATE, `horaC` TIME, `idConsultorioC` INT(11))   BEGIN 
	IF (fechaC >= CURDATE())
	THEN
		UPDATE citas SET nombre = nombreC, fecha = fechaC, hora = horaC, idConsultorio = idConsultorioC
		WHERE id = idC;
    END IF;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `alergia`
--

CREATE TABLE `alergia` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `reaccion` varchar(100) NOT NULL,
  `observacion` varchar(100) NOT NULL,
  `idTipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `alergia`
--

INSERT INTO `alergia` (`id`, `nombre`, `reaccion`, `observacion`, `idTipo`) VALUES
(1, 'Alergía a la radiación ultravioleta.', 'Enrojecimiento de la zona expuesta.', 'Consultr al médico en caso de alguna reacción inusual.', 1),
(2, 'Alergia a los farmacos', 'Convulsiones y desmayos', 'Consultar al médico lo antes posible.', 4),
(3, 'Alergia de las proteínas', 'Dermatitis atópica y anafilacia.', 'Consultar al médico lo antes posible.', 3),
(4, 'Alergia al látex', 'Picazón y enrojecimineto de la piel.', 'Consultar al médico lo antes posible.', 2),
(5, 'Otro', 'No aplica.', 'La alergia no está en la lista.', 5);

-- --------------------------------------------------------

--
-- Table structure for table `cirugia`
--

CREATE TABLE `cirugia` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `lugar` varchar(100) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `idExpediente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `cirugia`
--

INSERT INTO `cirugia` (`id`, `nombre`, `lugar`, `fecha`, `hora`, `idExpediente`) VALUES
(4, '', '', '0000-00-00', '00:00:00', 3),
(5, 'Cirugia de pancreas', 'Heredia', '2020-05-12', '08:30:00', 4),
(11, 'Cirugia de cornea', 'San Pedro', '2003-08-12', '08:03:00', 1),
(12, 'Cirugia de pancreas', 'Heredia', '2015-08-15', '15:00:00', 2);

-- --------------------------------------------------------

--
-- Table structure for table `citas`
--

CREATE TABLE `citas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `estado` varchar(20) NOT NULL,
  `idConsultorio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `citas`
--

INSERT INTO `citas` (`id`, `nombre`, `fecha`, `hora`, `estado`, `idConsultorio`) VALUES
(1, 'Cita de análisis', '2023-04-26', '14:00:00', 'C', 1),
(2, 'Cita Chequeo General', '2023-04-26', '10:00:00', 'R', 1),
(3, 'Cita Diagnostico Cardíaco', '2023-04-26', '11:00:00', 'D', 1),
(4, 'Cita tratamiento', '2023-04-26', '13:00:00', 'D', 1),
(5, 'Cita Implantes', '2023-04-26', '10:00:00', 'D', 2),
(6, 'Cita Estética Dental', '2023-04-26', '11:00:00', 'R', 2),
(7, 'Cita Odontología General', '2023-04-26', '13:00:00', 'C', 2),
(8, 'Cita Cirugía Dental', '2023-04-26', '14:00:00', 'D', 2),
(9, 'Cita Catarata', '2023-04-27', '10:00:00', 'C', 3),
(10, 'Cita Cirugía Refractiva', '2023-04-27', '13:00:00', 'C', 3),
(11, 'Cita Cirugía de Via Lagrimal', '2023-04-27', '15:00:00', 'C', 3),
(12, 'Cita Implantes de Lente', '2023-04-28', '11:00:00', 'R', 3),
(13, 'Cita Ultrasonido', '2023-04-28', '11:00:00', 'R', 4),
(14, 'Cita Revisión ', '2023-06-28', '13:00:00', 'D', 4),
(15, 'Cita Control Pretanal', '2023-04-28', '15:00:00', 'C', 4),
(16, 'Cita General de Oftamología', '2023-04-29', '10:00:00', 'R', 3);

-- --------------------------------------------------------

--
-- Table structure for table `citausuario`
--

CREATE TABLE `citausuario` (
  `idUsuario` int(11) NOT NULL,
  `idCita` int(11) NOT NULL,
  `observacion` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `citausuario`
--

INSERT INTO `citausuario` (`idUsuario`, `idCita`, `observacion`) VALUES
(8, 2, ''),
(7, 6, ''),
(8, 12, ''),
(7, 13, ''),
(3, 16, '');

-- --------------------------------------------------------

--
-- Table structure for table `compartirexpe`
--

CREATE TABLE `compartirexpe` (
  `id` int(11) NOT NULL,
  `idExpediente` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `compartirexpe`
--

INSERT INTO `compartirexpe` (`id`, `idExpediente`, `idUsuario`, `fecha`) VALUES
(1, 1, 1, '2023-04-22'),
(2, 2, 3, '2023-04-22'),
(3, 1, 7, '2023-04-22'),
(4, 3, 4, '2023-04-22'),
(5, 4, 3, '2023-04-22'),
(6, 4, 9, '2023-04-22'),
(7, 3, 8, '2023-04-22'),
(8, 3, 7, '2023-04-22'),
(9, 1, 8, '2023-04-22'),
(10, 2, 5, '2023-04-22'),
(11, 2, 6, '2023-04-22'),
(12, 1, 4, '2023-04-23');

-- --------------------------------------------------------

--
-- Table structure for table `consultorio`
--

CREATE TABLE `consultorio` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `ubicacion` varchar(100) NOT NULL,
  `precio` decimal(19,2) NOT NULL,
  `idEspecialidad` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `consultorio`
--

INSERT INTO `consultorio` (`id`, `nombre`, `ubicacion`, `precio`, `idEspecialidad`, `idUsuario`) VALUES
(1, 'Consultorio de Medicina General', 'Alajuela', '39000.00', 1, 1),
(2, 'Consultorio de Odontología', 'Alajuela', '25000.00', 5, 4),
(3, 'Consultorio de Oftmalogía', 'Alajuela', '35000.00', 4, 5),
(4, 'Consultorio de Obstetricia', 'Alajuela', '45000.00', 3, 6);

-- --------------------------------------------------------

--
-- Table structure for table `enfermedad`
--

CREATE TABLE `enfermedad` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `observacion` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `enfermedad`
--

INSERT INTO `enfermedad` (`id`, `nombre`, `observacion`) VALUES
(1, 'Gastritis', 'Inflamación del estómago.'),
(2, 'Diabetes', 'Niveles elevados de glucosa en la sangre.'),
(3, 'Hipertensión', 'Nivel de presión en las arterias.'),
(4, 'Asma', 'Afectación en los pulmones.'),
(5, 'Otro', 'La enfermedad no está en la lista. ');

-- --------------------------------------------------------

--
-- Table structure for table `especialidad`
--

CREATE TABLE `especialidad` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `especialidad`
--

INSERT INTO `especialidad` (`id`, `nombre`) VALUES
(1, 'Medicina General'),
(2, 'Psicología'),
(3, 'Obstetricia'),
(4, 'Oftamología'),
(5, 'Odontología');

-- --------------------------------------------------------

--
-- Table structure for table `expealergia`
--

CREATE TABLE `expealergia` (
  `idExpediente` int(11) NOT NULL,
  `idAlergia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `expealergia`
--

INSERT INTO `expealergia` (`idExpediente`, `idAlergia`) VALUES
(1, 1),
(2, 5),
(3, 2),
(4, 4),
(4, 5);

-- --------------------------------------------------------

--
-- Table structure for table `expediente`
--

CREATE TABLE `expediente` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idTipoSangre` int(11) NOT NULL,
  `telefono` varchar(100) NOT NULL,
  `fechaNac` date NOT NULL,
  `domicilio` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `expediente`
--

INSERT INTO `expediente` (`id`, `idUsuario`, `idTipoSangre`, `telefono`, `fechaNac`, `domicilio`) VALUES
(1, 3, 3, '87895456', '1970-02-20', 'Villa Bonita, ALajuela.'),
(2, 7, 3, '67543433', '2001-06-12', 'La Ceiba, Alajuela'),
(3, 9, 2, '54326565', '1982-08-07', 'La Ceiba, Alajuela'),
(4, 8, 3, '88779988', '2000-11-12', 'Ciruelas, Alajuela');

-- --------------------------------------------------------

--
-- Table structure for table `expeenfermedad`
--

CREATE TABLE `expeenfermedad` (
  `idExpediente` int(11) NOT NULL,
  `idEnfermedad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `expeenfermedad`
--

INSERT INTO `expeenfermedad` (`idExpediente`, `idEnfermedad`) VALUES
(1, 1),
(2, 4),
(3, 5),
(4, 5);

-- --------------------------------------------------------

--
-- Table structure for table `expemedicamento`
--

CREATE TABLE `expemedicamento` (
  `idExpediente` int(11) NOT NULL,
  `idMedicamento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `expemedicamento`
--

INSERT INTO `expemedicamento` (`idExpediente`, `idMedicamento`) VALUES
(1, 1),
(1, 4),
(2, 4),
(3, 1),
(3, 2),
(4, 4),
(4, 5);

-- --------------------------------------------------------

--
-- Table structure for table `genero`
--

CREATE TABLE `genero` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `genero`
--

INSERT INTO `genero` (`id`, `nombre`) VALUES
(1, 'Femenino'),
(2, 'Masculino');

-- --------------------------------------------------------

--
-- Table structure for table `medicamento`
--

CREATE TABLE `medicamento` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `prescripcion` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `medicamento`
--

INSERT INTO `medicamento` (`id`, `nombre`, `prescripcion`) VALUES
(1, 'Codeina', 'Tomar 1 pastilla cada 2 horas'),
(2, 'Acetaminofén', 'Cada 3 horas por 2 semanas'),
(3, 'Ibuprofeno', 'En caso extremo 2 pastillas cada 8 horas.'),
(4, 'Irbesartán', 'Tomar 1 pastilla cada 12 horas'),
(5, 'Otro', 'El medicamento no está en la lista.');

-- --------------------------------------------------------

--
-- Table structure for table `rol`
--

CREATE TABLE `rol` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `rol`
--

INSERT INTO `rol` (`id`, `nombre`) VALUES
(1, 'Médico'),
(2, 'Cliente'),
(3, 'Administrador');

-- --------------------------------------------------------

--
-- Table structure for table `tipoalergia`
--

CREATE TABLE `tipoalergia` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tipoalergia`
--

INSERT INTO `tipoalergia` (`id`, `nombre`) VALUES
(1, 'Alergia al sol'),
(2, 'Alergia al látex'),
(3, 'Alergia al alimentos'),
(4, 'Alergia al medicamentos'),
(5, 'Otro...');

-- --------------------------------------------------------

--
-- Table structure for table `tiposangre`
--

CREATE TABLE `tiposangre` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tiposangre`
--

INSERT INTO `tiposangre` (`id`, `nombre`) VALUES
(1, 'A'),
(2, 'B'),
(3, 'AB'),
(4, 'O');

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `cedula` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `clave` varchar(250) NOT NULL,
  `idGenero` int(11) NOT NULL,
  `idRol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `apellidos`, `cedula`, `correo`, `clave`, `idGenero`, `idRol`) VALUES
(1, 'Chaol', 'Westfall', '309870567', 'chaolWest@gmail.com', '$2y$10$rAlZQSBqgzTG43q2IA/5.Om2d57LSZ9P1MG8btHlxSHratPx3l4Sy', 2, 1),
(2, 'Aelin', 'Galathynius', '102310123', 'aelinGata@gmail.com', '$2y$10$6llPS4vSD//PCCICT0hj2OdisPgCpWls4Uy6.TlJ2amd3/N3XBbPm', 1, 3),
(3, 'Lysandra', 'Ashyver', '205820369', 'lysham@gmail.com', '$2y$10$5UCfSEWmaM/IBbUQmeRXT.QMwcDP6SkEG1/2dq4MIZl9xIRECHzsi', 1, 2),
(4, 'Dorian', 'Havilliard', '701230654', 'dorhavilliard@gmail.com', '$2y$10$eQlmWLCYMU1LWA9unJ8HNOVKA7jd.bqfCnbXJP.3A2Z.GY3Z5ijPq', 2, 1),
(5, 'Rowan', 'Whitethorn', '201450365', 'rowthorn@yahoo.com', '$2y$10$OS9ZsQd2IKZZyhsyBQasQu547gsJ2JFxSwKJIBVrfH.906Kzl.FS.', 2, 1),
(6, 'Nehemia', 'Ytger', '302150989', 'nehemia@gmail.com', '$2y$10$B4.h8V1rWBoojFZyYRwj7utwEe/cavfbPAR8YSyTrcO4xCKIewwz.', 1, 1),
(7, 'Celaena', 'Sardothien', '205430768', 'celaenaSarth@gmail.com', '$2y$10$cLTFdyz6lfsPVzaHv5xT1OAEgoysIrlkHg1p8KgbXdkGK5OHOWWcq', 1, 2),
(8, 'Kaltain', 'Rompier', '502580852', 'kaltRomp@yahoo.com', '$2y$10$oLZw8smriUqjcD3nWSVVCe5yGTtb/dT82Nhxou8DkFgnS0ZTwdrEO', 1, 2),
(9, 'Manon', 'Blackbeak', '103570159', 'manonblac@gmail.com', '$2y$10$BNPSNb3rn.EJhKZee1S8Y.swTFkyRoP/dLgMGR5cY1h8bIaLQyd8O', 1, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alergia`
--
ALTER TABLE `alergia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idTipo` (`idTipo`);

--
-- Indexes for table `cirugia`
--
ALTER TABLE `cirugia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idExpediente` (`idExpediente`);

--
-- Indexes for table `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idConsultorio` (`idConsultorio`);

--
-- Indexes for table `citausuario`
--
ALTER TABLE `citausuario`
  ADD PRIMARY KEY (`idCita`,`idUsuario`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idCita` (`idCita`);

--
-- Indexes for table `compartirexpe`
--
ALTER TABLE `compartirexpe`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idExpediente` (`idExpediente`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indexes for table `consultorio`
--
ALTER TABLE `consultorio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idEspecialidad` (`idEspecialidad`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indexes for table `enfermedad`
--
ALTER TABLE `enfermedad`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `especialidad`
--
ALTER TABLE `especialidad`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `expealergia`
--
ALTER TABLE `expealergia`
  ADD PRIMARY KEY (`idExpediente`,`idAlergia`),
  ADD KEY `idExpediente` (`idExpediente`),
  ADD KEY `idAlergia` (`idAlergia`);

--
-- Indexes for table `expediente`
--
ALTER TABLE `expediente`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idTipoSangre` (`idTipoSangre`);

--
-- Indexes for table `expeenfermedad`
--
ALTER TABLE `expeenfermedad`
  ADD PRIMARY KEY (`idExpediente`,`idEnfermedad`),
  ADD KEY `idExpediente` (`idExpediente`),
  ADD KEY `idEnfermedad` (`idEnfermedad`);

--
-- Indexes for table `expemedicamento`
--
ALTER TABLE `expemedicamento`
  ADD PRIMARY KEY (`idExpediente`,`idMedicamento`),
  ADD KEY `idExpediente` (`idExpediente`),
  ADD KEY `idMedicamento` (`idMedicamento`);

--
-- Indexes for table `genero`
--
ALTER TABLE `genero`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `medicamento`
--
ALTER TABLE `medicamento`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tipoalergia`
--
ALTER TABLE `tipoalergia`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tiposangre`
--
ALTER TABLE `tiposangre`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idGenero` (`idGenero`),
  ADD KEY `idRol` (`idRol`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alergia`
--
ALTER TABLE `alergia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `cirugia`
--
ALTER TABLE `cirugia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `citas`
--
ALTER TABLE `citas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `compartirexpe`
--
ALTER TABLE `compartirexpe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `consultorio`
--
ALTER TABLE `consultorio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `enfermedad`
--
ALTER TABLE `enfermedad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `especialidad`
--
ALTER TABLE `especialidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `expediente`
--
ALTER TABLE `expediente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `genero`
--
ALTER TABLE `genero`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `medicamento`
--
ALTER TABLE `medicamento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `rol`
--
ALTER TABLE `rol`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tipoalergia`
--
ALTER TABLE `tipoalergia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tiposangre`
--
ALTER TABLE `tiposangre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `alergia`
--
ALTER TABLE `alergia`
  ADD CONSTRAINT `alergia_ibfk_1` FOREIGN KEY (`idTipo`) REFERENCES `tipoalergia` (`id`);

--
-- Constraints for table `cirugia`
--
ALTER TABLE `cirugia`
  ADD CONSTRAINT `cirugia_ibfk_1` FOREIGN KEY (`idExpediente`) REFERENCES `expediente` (`id`);

--
-- Constraints for table `citas`
--
ALTER TABLE `citas`
  ADD CONSTRAINT `citas_ibfk_1` FOREIGN KEY (`idConsultorio`) REFERENCES `consultorio` (`id`);

--
-- Constraints for table `citausuario`
--
ALTER TABLE `citausuario`
  ADD CONSTRAINT `citausuario_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `citausuario_ibfk_2` FOREIGN KEY (`idCita`) REFERENCES `citas` (`id`);

--
-- Constraints for table `compartirexpe`
--
ALTER TABLE `compartirexpe`
  ADD CONSTRAINT `compartirexpe_ibfk_1` FOREIGN KEY (`idExpediente`) REFERENCES `expediente` (`id`),
  ADD CONSTRAINT `compartirexpe_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`);

--
-- Constraints for table `consultorio`
--
ALTER TABLE `consultorio`
  ADD CONSTRAINT `consultorio_ibfk_1` FOREIGN KEY (`idEspecialidad`) REFERENCES `especialidad` (`id`),
  ADD CONSTRAINT `consultorio_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`);

--
-- Constraints for table `expealergia`
--
ALTER TABLE `expealergia`
  ADD CONSTRAINT `expealergia_ibfk_1` FOREIGN KEY (`idExpediente`) REFERENCES `expediente` (`id`),
  ADD CONSTRAINT `expealergia_ibfk_2` FOREIGN KEY (`idAlergia`) REFERENCES `alergia` (`id`);

--
-- Constraints for table `expediente`
--
ALTER TABLE `expediente`
  ADD CONSTRAINT `expediente_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `expediente_ibfk_2` FOREIGN KEY (`idTipoSangre`) REFERENCES `tiposangre` (`id`);

--
-- Constraints for table `expeenfermedad`
--
ALTER TABLE `expeenfermedad`
  ADD CONSTRAINT `expeenfermedad_ibfk_1` FOREIGN KEY (`idExpediente`) REFERENCES `expediente` (`id`),
  ADD CONSTRAINT `expeenfermedad_ibfk_2` FOREIGN KEY (`idEnfermedad`) REFERENCES `enfermedad` (`id`);

--
-- Constraints for table `expemedicamento`
--
ALTER TABLE `expemedicamento`
  ADD CONSTRAINT `expemedicamento_ibfk_1` FOREIGN KEY (`idExpediente`) REFERENCES `expediente` (`id`),
  ADD CONSTRAINT `expemedicamento_ibfk_2` FOREIGN KEY (`idMedicamento`) REFERENCES `medicamento` (`id`);

--
-- Constraints for table `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`idGenero`) REFERENCES `genero` (`id`),
  ADD CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`idRol`) REFERENCES `rol` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
