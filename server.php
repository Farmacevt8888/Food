<?php
$_POST = json_decode(file_get_contents("php://input"), true); //получаем на PHP JSON данные
echo var_dump($_POST);