<?php
require_once 'db.php';

$username = $_POST['username'];
$password = $_POST['password'];

// JEDEN ciąg zapytania, ale potencjalnie wstrzyknięcie
$query = "SELECT * FROM users WHERE username = '$username' AND password = '$password';";

// Możliwość uruchamiania wielu zapytań (SELECT + UPDATE poprzez wstrzyknięcie)
if ($conn->multi_query($query)) {
    do {
        if ($result = $conn->store_result()) {
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                echo "<div class='login-result success'>✅ Zalogowano pomyślnie!</div>";
                echo "<div class='login-info'><strong>Użytkownik:</strong> {$row['username']}<br><strong>Hasło:</strong> {$row['password']}</div>";
            } else {
                echo "<div class='login-result error'>❌ Nieprawidłowe dane logowania.</div>";
            }
            $result->free();
        } else {
            // To jest na przykład UDDATE
            if (!$conn->errno) {
                echo "<div class='login-result info'>ℹ️ Wykonano zapytanie SQL (bez wyniku SELECT).</div>";
            } else {
                echo "<div class='login-result error'>❌ Błąd SQL: " . $conn->error . "</div>";
            }
        }
    } while ($conn->next_result());
} else {
    echo "<div class='login-result error'>❌ Błąd zapytania SQL: " . $conn->error . "</div>";
}
?>



