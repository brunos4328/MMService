<?php
$servername = "sql305.infinityfree.com";
$username = "if0_36783497";
$password = "Q0o5Dm24";
$database = "if0_36783497_mmservice";

// Cria a conexão com o banco de dados
$connection = new mysqli($servername, $username, $password, $database);

// Verifica se houve erro de conexão
if ($connection->connect_error) {
    die("Falha na conexão: " . $connection->connect_error);
}

// Consulta os dados da tabela 'encomendas'
$sql = "SELECT * FROM encomendas";
$result = $connection->query($sql);

// Inicializa um array para armazenar os dados
$rows = array();

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
}

// Retorna os dados em formato JSON
echo json_encode($rows);

// Fecha a conexão
$connection->close();
?>
