<?php

ini_set('error_log','error.log');

///Parametros de configuracion basica
(defined('CURRENT_VERSION'))?false:define('CURRENT_VERSION','0.0.1');
(defined('APP_URL'))?false:define('APP_URL',$_SERVER['SERVER_NAME']);
(defined('ROOT'))?false:define('ROOT',$_SERVER['DOCUMENT_ROOT']);

//Parametros de BASE DE DATOS
(defined('DB_SERVER'))?false:define('DB_SERVER','mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com');
(defined('DB_USER'))?false:define('DB_USER','bsale_test');
(defined('DB_PASS'))?false:define('DB_PASS','bsale_test');
(defined('DB_DATABASE'))?false:define('DB_DATABASE','bsale_test');

//Parametros de Informacion
(defined('APP_NAME'))?false:define('APP_NAME','pruebaBSALE');

//Conectando a Base de datos
$db= new mysqli(DB_SERVER,DB_USER,DB_PASS,DB_DATABASE);

?>