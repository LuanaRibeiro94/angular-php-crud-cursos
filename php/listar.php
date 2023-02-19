<?php 

  // Incluir conexão
  include("conexao.php");

  // SQL
  $sql = "SELECT * FROM cursos";

  // Executar 
  $executar = mysqli_query($conexao, $sql);

  // Vetor 
  $cursos = [];

  // Índice
  $indice = 0;

  // Laço
  while($linha = mysqli_fetch_assoc($executar)) {
    $cursos[$indice]['idCurso'] = $linha['idCurso'];
    $cursos[$indice]['nomeCurso'] = $linha['nomeCurso'];
    $cursos[$indice]['valorCurso'] = $linha['valorCurso'];

    $indice++;
  }

  // JSON - transformar vetor de 'cursos' em JSON
  echo json_encode(['cursos' => $cursos]);
?>