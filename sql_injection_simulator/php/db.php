<?php
$host = "localhost";
$user = "root";
$password = "";
$dbname = "sql_simulator";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Błąd połączenia z bazą danych: " . $conn->connect_error);
}
?>

