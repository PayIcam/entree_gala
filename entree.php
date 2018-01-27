<?php

session_start();

require('data/config.php');
require ('include/db_functions.php');

$connexion = connect_to_db();

$id = $_GET["id"];
$arrived = $_GET["arrived"];

set_has_arrived($id, $arrived);

?>