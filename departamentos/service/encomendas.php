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
                                                    <label for="nome">Nome:</label><br>
                                                    <input type="text" id="nome" name="nome" required><br>
                                                    <label for="data">Data:</label><br>
                                                    <input type="date" id="data" name="data" required><br>
                                                    <label for="email">Email:</label><br>
                                                    <input type="email" id="email" name="email" required><br>
                                                    <label for="phone">Telefone:</label><br>
                                                    <input type="text" id="phone" name="phone" required><br>
                                                    <label for="marca">Marca:</label><br>
                                                    <input type="text" id="marca" name="marca" required><br>
                                                    <label for="modelo">Modelo:</label><br>
                                                    <input type="text" id="modelo" name="modelo" required><br>
                                                    <label for="peca">Peça:</label><br>
                                                    <input type="text" id="peca" name="peca" required><br>
                                                    <label for="imei">IMEI:</label><br>
                                                    <input type="text" id="imei" name="imei" required><br><br>
                                                    <input type="submit" name="submit" value="Adicionar">
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <thead>
                                        <tr>
                                            <th>id</th>
                                            <th>nome</th>
                                            <th>data</th>
                                            <th>email</th>
                                            <th>phone</th>
                                            <th>marca</th>
                                            <th>modelo</th>
                                            <th>peça</th>
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
                                                $nome = $_POST['nome'];
                                                $data = $_POST['data'];
                                                $email = $_POST['email'];
                                                $phone = $_POST['phone'];
                                                $marca = $_POST['marca'];
                                                $modelo = $_POST['modelo'];
                                                $peca = $_POST['peca'];
                                                $imei = $_POST['imei'];

                                                $sql_insert = "INSERT INTO encomendas (nome, data, email, phone, marca, modelo, peca, imei)
                                                            VALUES ('$nome', '$data', '$email', '$phone', '$marca', '$modelo', '$peca', '$imei')";

                                                if ($conn->query($sql_insert) === TRUE) {
                                                    echo "Nova encomenda adicionada com sucesso.";
                                                } else {
                                                    echo "Erro: " . $sql_insert . "<br>" . $conn->error;
                                                }
                                            }

                                            // Execute a consulta SQL
                                            $sql = "SELECT id, name, data, email, phone, marca, modelo, peca, imei FROM if0_36783497_mmservice.encomendas";
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
                                                    echo "<td>" . $row['id'] . "</td>";
                                                    echo "<td>" . $row['name'] . "</td>";
                                                    echo "<td>" . $row['data'] . "</td>";
                                                    echo "<td>" . $row['email'] . "</td>";
                                                    echo "<td>" . $row['phone'] . "</td>";
                                                    echo "<td>" . $row['marca'] . "</td>";
                                                    echo "<td>" . $row['modelo'] . "</td>";
                                                    echo "<td>" . $row['peca'] . "</td>";
                                                    echo "<td>" . $row['imei'] . "</td>";
                                                    echo "<td><button>Ação</button></td>"; // Substitua este botão pela ação que você deseja
                                                    echo "</tr>";
                                                }
                                            } else {
                                                echo "<tr><td colspan='10'>Nenhum registro encontrado na tabela encomendas.</td></tr>";
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