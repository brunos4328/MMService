<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Service</title>
    <link rel="shortcut icon" href="/resources/imagens/branding/logotipo.png" type="image/x-icon">
    <link rel="stylesheet" href="/resources/tools/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="/resources/css/style.css">
    <script src="https://kit.fontawesome.com/e37222f816.js" crossorigin="anonymous"></script>
    <script src="/resources/js/button_funciton.js"></script>
    <script src="/resources/js/modal_button.js"></script>
    <script type="module" src="/resources/js/firebase_auth.js"></script>
    <script type="module" src="https://cdn.skypack.dev/twind/shim"></script>
</head>


<body class="grey">
    <div class="page-wrapper transferencias">

        <div class="main">
        <section>
                <header>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4 align-self-center d-flex justify-content-start">
                                <div class="navbar">
                                    <a href="/index.html">
                                        <span>
                                            <img src="/resources/imagens/branding/logotipo.png" alt="Media Markt">
                                        </span>
                                        <p>
                                            Braga
                                        </p>
                                    </a>
                                </div>
                            </div>
                            <div class="col-md-4 align-self-center d-flex justify-content-center">
                                <div id="sidebar_button" class="sidebar_button">
                                    <button id="openNav" onclick="sidebar()" class="fa fa-solid fa-bars"></button>
                                    <button id="closeNav" onclick="sidebar()" class="fa fa-regular fa-circle-xmark"></button>
                                </div>
                            </div>
                            <div class="col-md-4 align-self-center d-flex justify-content-end">
                                <div class="navbar-content mini-profile">
                                    <div id="user-info">
                                        <div>
                                            <button id="logoutButton">Logout</button>
                                        </div>
                                        <div>
                                            <div>
                                                <p id="user-name"></p>
                                                <p id="user-code"></p>
                                            </div>
                                            <div>
                                                <a href="/account.html">
                                                    <span>
                                                        <img id="user-photo" alt="Foto de Usuário">
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-md-12 header_hr">
                                    <hr id="header_hr">
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </section>

            <section class="sidebar_wrapper">

            </section>
    
            <div id="main">
                <section>
                    <div class="return">
                        <span id="return-btn">
                            <p class="fa fa-solid fa-reply"></p>
                            Voltar
                        </span>
                    </div>
                    
                    <div class="titulos">
                        <h1>Encomendas</h1>
                    </div>
                </section>

                <section class="table-wrapper">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <table class="table">
                                    <div>
                                        <button id="openModal" onclick="encomendasModal()">
                                            <i class="fa-regular fa-square-plus"></i>
                                        </button>
                                    </div>
                                    <div>
                                        <div id="encomendasModal" class="modal">
                                            <div class="modal-content">
                                                <span class="close">&times;</span>
                                                <form action="" method="POST">
                                                    <label for="guia">Guia:</label><br>
                                                    <input type="text" id="guia" name="guia"><br>
                                                    <label for="name">Nome:</label><br>
                                                    <input type="text" id="name" name="name" required><br>
                                                    <label for="email">Email:</label><br>
                                                    <input type="email" id="email" name="email"><br>
                                                    <label for="phone">Telefone:</label><br>
                                                    <input type="text" id="phone" name="phone" required><br>
                                                    <label for="marca">Marca:</label><br>
                                                    <input type="text" id="marca" name="marca" required><br>
                                                    <label for="modelo">Modelo:</label><br>
                                                    <input type="text" id="modelo" name="modelo" required><br>
                                                    <label for="peca">Peça:</label><br>
                                                    <input type="text" id="peca" name="peca" required><br>
                                                    <label for="preco">Preco:</label><br>
                                                    <input type="text" id="preco" name="preco"><br>
                                                    <label for="pvp">PVP:</label><br>
                                                    <input type="text" id="pvp" name="pvp"><br>
                                                    <label for="imei">IMEI:</label><br>
                                                    <input type="text" id="imei" name="imei"><br><br>
                                                    <input type="submit" name="submit" value="Adicionar">
                                                </form>
                                            </div>
                                        </div>
                                        <div>
                                            <!-- Edit Modal -->
                                            <div id="editModal" class="modal">
                                                <div class="modal-content">
                                                    <span class="close" onclick="closeEditModal()">&times;</span>
                                                    <form action="" method="POST">
                                                        <input type="hidden" id="edit-id" name="id"> <!-- Hidden field to store the ID of the record being edited -->
                                                        <label for="edit-guia">Guia:</label><br>
                                                        <input type="text" id="edit-guia" name="guia"><br>
                                                        <label for="edit-name">Nome:</label><br>
                                                        <input type="text" id="edit-name" name="name"><br>
                                                        <label for="edit-email">Email:</label><br>
                                                        <input type="email" id="edit-email" name="email"><br>
                                                        <label for="edit-phone">Telefone:</label><br>
                                                        <input type="text" id="edit-phone" name="phone"><br>
                                                        <label for="edit-marca">Marca:</label><br>
                                                        <input type="text" id="edit-marca" name="marca"><br>
                                                        <label for="edit-modelo">Modelo:</label><br>
                                                        <input type="text" id="edit-modelo" name="modelo"><br>
                                                        <label for="edit-peca">Peça:</label><br>
                                                        <input type="text" id="edit-peca" name="peca"><br>
                                                        <label for="edit-preco">Preco:</label><br>
                                                        <input type="text" id="edit-preco" name="preco"><br>
                                                        <label for="edit-pvp">PVP:</label><br>
                                                        <input type="text" id="edit-pvp" name="pvp"><br>
                                                        <label for="edit-imei">IMEI:</label><br>
                                                        <input type="text" id="edit-imei" name="imei"><br><br>
                                                        <input type="submit" name="update" value="Update">
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <thead>
                                        <tr>
                                            <th>guia</th>
                                            <th>nome</th>
                                            <th>data</th>
                                            <th>email</th>
                                            <th>phone</th>
                                            <th>marca</th>
                                            <th>modelo</th>
                                            <th>peça</th>
                                            <th>preço</th>
                                            <th>pvp</th>
                                            <th>imei</th>
                                            <th>action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php
                                            $servername = "sql305.infinityfree.com";
                                            $username = "if0_36783497";
                                            $password = "Q0o5Dm24";
                                            $dbname = "if0_36783497_mmservice";

                                           
                                            // Crie a conexão
                                            $conn = new mysqli($servername, $username, $password, $dbname);

                                            // Verifique a conexão
                                            if ($conn->connect_error) {
                                                die("Conexão falhou: " . $conn->connect_error);
                                            }

                                            // Inserir dados no banco de dados ao enviar o formulário
                                            if (isset($_POST['submit'])) {
                                                $guia = $_POST['guia'];
                                                $name = $_POST['name'];
                                                $email = $_POST['email'];
                                                $phone = $_POST['phone'];
                                                $marca = $_POST['marca'];
                                                $modelo = $_POST['modelo'];
                                                $peca = $_POST['peca'];
                                                $preco = $_POST['preco'];
                                                $pvp = $_POST['pvp'];
                                                $imei = $_POST['imei'];
                                                $currentDate = date('Y-m-d H:i:s'); // Capturar a data e hora atual

                                                $sql_insert = "INSERT INTO if0_36783497_mmservice.encomendas (guia, name, data, email, phone, marca, modelo, peca, preco, pvp, imei)
                                                            VALUES ('$guia', '$name', '$currentDate', '$email', '$phone', '$marca', '$modelo', '$peca', '$preco', '$pvp', '$imei')";

                                                if ($conn->query($sql_insert) === TRUE) {
                                                    echo "Nova encomenda adicionada com sucesso.";
                                                    echo "<meta http-equiv='refresh' content='0'>";
                                                } else {
                                                    echo "Erro: " . $sql_insert . "<br>" . $conn->error;
                                                }
                                            }

                                            // Execute a consulta SQL
                                            $sql = "SELECT id, guia, name, data, email, phone, marca, modelo, peca, preco, pvp, imei FROM if0_36783497_mmservice.encomendas";
                                            $result = $conn->query($sql);

                                            // Verifique se a consulta foi executada corretamente
                                            if (!$result) {
                                                die("Erro ao executar a consulta: " . $conn->error);
                                            } else {
                                                echo "Número de registros encontrados: " . $result->num_rows . "<br>";
                                            }

                                            // Verifique se há registros retornados e exiba-os
                                            if ($result->num_rows > 0) {
                                                while ($row = $result->fetch_assoc()) {
                                                    echo "<tr>";
                                                    echo "<td>" . $row['guia'] . "</td>";
                                                    echo "<td>" . $row['name'] . "</td>";
                                                    echo "<td>" . $row['data'] . "</td>";
                                                    echo "<td>" . $row['email'] . "</td>";
                                                    echo "<td>" . $row['phone'] . "</td>";
                                                    echo "<td>" . $row['marca'] . "</td>";
                                                    echo "<td>" . $row['modelo'] . "</td>";
                                                    echo "<td>" . $row['peca'] . "</td>";
                                                    echo "<td>" . $row['preco'] . "</td>";
                                                    echo "<td>" . $row['pvp'] . "</td>";
                                                    echo "<td>" . $row['imei'] . "</td>";
                                                    echo "<td>
                                                            <button type='button' class='btn btn-primary' onclick='openEditModal(\"" . $row['id'] . "\", \"" . $row['guia'] . "\", \"" . $row['name'] . "\", \"" . $row['email'] . "\", \"" . $row['phone'] . "\", \"" . $row['marca'] . "\", \"" . $row['modelo'] . "\", \"" . $row['peca'] . "\", \"" . $row['preco'] . "\", \"" . $row['pvp'] . "\", \"" . $row['imei'] . "\")'>Edit</button>
                                                            <form method='post' action='' style='display:inline-block;'>
                                                                <input type='hidden' name='id' value='" . $row['id'] . "'>
                                                                <button type='submit' name='delete' class='btn btn-danger' onclick='return confirm(\"Are you sure you want to delete this record?\");'>Delete</button>
                                                            </form>
                                                        </td>";
                                                    echo "</tr>";
                                                    echo "</tr>";
                                                }
                                            } else {
                                                echo "<tr><td colspan='10'>Nenhum registro encontrado na tabela encomendas.</td></tr>";
                                            }

                                            // Handle delete operation
                                            if (isset($_POST['delete'])) {
                                                $id = $_POST['id']; // Recebe o 'id' em vez de 'guia'
                                                
                                                // Delete o registro do banco de dados usando o 'id'
                                                $sql_delete = "DELETE FROM if0_36783497_mmservice.encomendas WHERE id = ?";
                                                
                                                $stmt = $conn->prepare($sql_delete);
                                                $stmt->bind_param("i", $id); // Tipo de dado 'i' para 'id' inteiro

                                                if ($stmt->execute()) {
                                                    echo "Registro excluído com sucesso.";
                                                    // Opcionalmente, você pode redirecionar para a mesma página para atualizar a tabela
                                                    echo "<meta http-equiv='refresh' content='0'>";
                                                } else {
                                                    echo "Erro ao excluir o registro: " . $conn->error;
                                                }
                                                
                                                $stmt->close();
                                            }


                                            // Handle the update operation
                                            if (isset($_POST['update'])) {
                                                $id = $_POST['id']; // This is the identifier of the record being updated
                                                $guia = $_POST['guia']; 
                                                $name = $_POST['name'];
                                                $email = $_POST['email'];
                                                $phone = $_POST['phone'];
                                                $marca = $_POST['marca'];
                                                $modelo = $_POST['modelo'];
                                                $peca = $_POST['peca'];
                                                $preco = $_POST['preco'];
                                                $pvp = $_POST['pvp'];
                                                $imei = $_POST['imei'];
                                                
                                                // Update the record in the database
                                                $sql_update = "UPDATE if0_36783497_mmservice.encomendas SET guia=?, name=?, email=?, phone=?, marca=?, modelo=?, peca=?, preco=?, pvp=?, imei=? WHERE id=?";
                                                
                                                $stmt = $conn->prepare($sql_update);
                                                $stmt->bind_param("ssssssssssi", $guia, $name, $email, $phone, $marca, $modelo, $peca, $preco, $pvp, $imei, $id);
                                                
                                                if ($stmt->execute()) {
                                                    echo "Registro atualizado com sucesso.";
                                                    // Optionally, refresh the page
                                                    echo "<meta http-equiv='refresh' content='0'>";
                                                } else {
                                                    echo "Erro ao atualizar o registro: " . $conn->error;
                                                }
                                                
                                                $stmt->close();
                                            }

                                            // Feche a conexão
                                            $conn->close();
                                        ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>   
</body>

</html>