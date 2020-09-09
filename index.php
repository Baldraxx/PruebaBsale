<!DOCTYPE html>
<!-- Created By CodingNepal -->
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Prueba BSALE</title>
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/notify.css">
    <script src="https://kit.fontawesome.com/a076d05399.js"></script>
  </head>
  <body>
      <!-- sidebar -->
      <nav>
        <input type="checkbox" id="check">
        <label for="check" class="checkbtn">
          <i class="fas fa-bars"></i>
        </label>
        <label onclick="cargaLista();" class="logo">BSALE</label>
        <ul>
          <li><a class="active" onclick="cargaLista();">Productos</a></li>
          <li><a onclick="MostrarCarrito();">Carrito </a></li>
          <li><a onclick="AcercaDe();">Acerca de...</a></li>
        </ul>
      </nav>
      <!-- Contenido -->
      <div class="filters" id="filtros">
        
        <select class="css-input" onchange="filtrarBuscar(this,'descuento')" id="descuento">
            
        </select>
        <select class="css-input" onchange="filtrarBuscar(this,'categoria')" id="categoria">
            
        </select>
        <button class="boton" style="float:right;font-size: 18px;margin-left: 5px;" onclick="Buscar()">Buscar</button>
        <input class="css-input" style="float:right" id="textoBuscar" type="text" placeholder="Buscar producto">
        
      </div>
      <div class="container" id="contenedor">
      </div>

<!-- scripts -->
<script src="js/main.js"></script>
<script src="js/notify.js"></script>
</body>
</html>
