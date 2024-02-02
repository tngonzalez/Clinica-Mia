<?php
/* Mostrar errores */
    ini_set('display_errors',1);
    ini_set("log_errors",1);
    ini_set("error_log","C:/xampp/htdocs/ClinicaMia/php_error_log");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");

/* Requerimientos */
require_once "models/MySQLConnect.php";

//Agregar todos los modelos
require_once "models/RolesModels.php";
require_once "models/GenerosModels.php";
require_once "models/TipoSangreModels.php";
require_once "models/TipoAlergiaModels.php";
require_once "models/EnfermedadModels.php";
require_once "models/EspecialidadModels.php";
require_once "models/UsuarioModels.php";
require_once "models/AlergiaModels.php";
require_once "models/CirugiaModels.php";
require_once "models/ConsultModels.php";
require_once "models/ExpedienteModels.php";
require_once "models/MedicamentosModels.php";
require_once "models/CitaModels.php";



//Agregar todos los controladores
require_once "controllers/RolesControllers.php";
require_once "controllers/GenerosControllers.php";
require_once "controllers/SangreControllers.php";
require_once "controllers/TipoAlergiaControllers.php";
require_once "controllers/EnfermedadesControllers.php";
require_once "controllers/EspecialidadControllers.php";
require_once "controllers/UsuarioControllers.php";
require_once "controllers/AlergiaControllers.php";
require_once "controllers/CirugiaControllers.php";
require_once "controllers/ConsultControllers.php";
require_once "controllers/ExpedienteControllers.php";
require_once "controllers/MedicamentoControllers.php";
require_once "controllers/CitaControllers.php";

    
    require_once "controllers/RoutesController.php";
    $index=new RoutesController();
    $index->index();

