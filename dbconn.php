<?php
// Replace the following with your database credentials
$servername = "localhost:3306";
$username = "root";
$password = "root";
$dbname = "shopping_cart";

// Create a connection to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>
