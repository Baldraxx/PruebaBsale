var req = new XMLHttpRequest();//Instancia para crear Request
var listado;//variable global para el listado inicial
var contenedor = document.getElementById("contenedor");//Div del contenedor principal
var inputfiltros = document.getElementById("filtros");//Div del los filtros


// funciones
function cargaLista(buscar) {//Funcion principal que se encarga de obtener los productos de base de datos
    req.open("GET", "core/procesos.php?Accion=lista", false);//comienza solicitud
    req.send();//envia solicitud
    listado = JSON.parse(req.responseText);//obtiene la respuesta y la tranforma en json
    //carga Filtros
    loadfilter("descuento");
    loadfilter("categoria");
    //crea el listado e productos
    crearListado(listado);
}
function filtrarBuscar(busqueda, tipo) {//funcion que se encarga mostrar datos acordes al filtro entregado
    tipo = tipo == undefined ? "nombre" : tipo;
    var filtrado = listado.filter((elemento) => elemento[tipo] == busqueda.value);//entregara solo el arreglo que contenga la informacion solicitada
    crearListado(filtrado);//crea un nuevo listado cono la nueva lista de productos
}
function loadfilter(filtro) {//funcion que se encarga de cargar los filtros
    let input = document.getElementById(filtro);//obtiene el select del filtro solicitado
    let filtros = [];//inicializa el arreglo
    listado.forEach((element) => {//revisa el listado de productos
        if (filtros.indexOf(element[filtro]) < 0) {//solo si el elemento del filtro no ha sido cargado aun...
            filtros.push(element[filtro]);//... guardara la opcion acorde
        }
    });
    filtros.sort();//ordena los filtros
    let html = '<option value="">Filtro por ' + filtro + "</option>";//variable string que se encargara de llenar el div
    filtros.forEach((option) => {
        html += "<option value='" + option + "'>" + option + "</option>";//añade nueva opcion al string
    });
    input.innerHTML = html;//añade las opciones al select predefinido
}

function crearListado(lista) {//funcion encargada de crear la lista de productos en funcion del arreglo entregado
    let html = "";//variable string que se encargara de llenar el div
    lista.forEach((element) => {//crea las cartas de productos
        html += "<div class='wrapper'><div class='card front-face'><img src='";
        html += element["url_img"] == "" ? "img/no-image.png" : element["url_img"];
        html += "'></div><div class='card back-face'><img src='";
        html += element["url_img"] == "" ? "img/no-image.png" : element["url_img"];
        html += "'><div class='info'><div class='title'>";
        html += element["nombre"];
        html += "</div><p>";
        if (element["descuento"] == 0) {//si no tiene descuento no aplica calculo...
            html += "$ " + element["precio"];
        } else {//...pero si lo tiene, aplica calculo
            let nuevoprecio =
                parseInt(element["precio"]) -
                parseInt(element["precio"]) * (parseInt(element["descuento"]) / 100);
            html += "<s>$ " + element["precio"] + "</s> $" + nuevoprecio;
        }
        html += "</p></div>Cantidad: <input type='number' class='css-input-num' min='1' max='99' value='1' id='cantidad" + element['id'] + "'>"
        html += "<button onclick='guardarCarrito(" + element['id'] + ")'><i class='fa fa-shopping-cart'></i>Añadir al Carrito</button></div></div>";
    });
    inputfiltros.style.display = 'block';//reestablece el div de filtros (en caso de que este oculto)

    contenedor.innerHTML = html;//añade el listado al contenedor
}

function Buscar() {//funcion encargada de filtrar por texto el listado inicial
    let texto = document.getElementById("textoBuscar");//obtiene la informacion entregada en el input de busqueda
    if (texto.value != "") {//si lo obtenido no esta vacio...
        var filtrado = listado.filter(
            (elemento) =>
                elemento["nombre"].toLowerCase().search(texto.value.toLowerCase()) != -1
        );//solo devolvera los datos coincidentes
        crearListado(filtrado);//actualiza listado con los datos filtrados
    } else {//...si no...
        crearListado(listado);//..actualiza
    }
}
function guardarCarrito(idProducto) {//funcion que memoriza los productos seleccionados
    let cantidad = document.getElementById("cantidad" + idProducto);//obtiene la cantidad seleccionada
    if (localStorage.getItem('id_' + idProducto) == null) {//si el producto no esta guardado en la memoria local...
        localStorage.setItem('id_' + idProducto, cantidad.value);//lo guarda en la memoria local
    } else {//...si no...
        localStorage.removeItem('id_' + idProducto);//...lo remueve..
        localStorage.setItem('id_' + idProducto, cantidad.value);//.. y lo actualiza
    }
    vNotify.success({ text: 'Carrito Actualizado', title: 'Producto Guardado Correctamente' });//envia notificacion visual de que el procesos a tenido exito
}
function MostrarCarrito() {//funcion que muestra el carrito hasta el momento
    if (localStorage.length > 0) {//si la memoria local tiene al menos un producto guardado, muestra el listado de seleccionados
        let totalprecio = 0;//variable para el monto total
        let html = "<div class='subcontainer'>";//variable string que se encargara de llenar el div
        html += '<table><thead><th></th><th>Producto</th><th>Precio</th><th>%</th><th>Cantidad</th><th>SubTotal</th></thead><tbody>';

        listado.forEach(element => {//revisa el listado inicial
            if (localStorage.getItem("id_" + element['id']) != null) {//si el producto seleccionado se encuentra en el listado lo añade
                if (element["descuento"] == 0) {//si no tiene descuento no aplica calculo...
                    var precioreal = parseInt(element["precio"]);
                } else {//...pero si lo tiene, aplica calculo
                    var precioreal =
                        parseInt(element["precio"]) -
                        parseInt(element["precio"]) * (parseInt(element["descuento"]) / 100);
                }
                let subprecio = precioreal * parseInt(localStorage.getItem("id_" + element['id']))//variable para mostrar el subtotal del producto multiplicado por la cantidad
                html += '<tr><th><img src="' + element['url_img'] + '" height="50px" width="40px"></th>';
                html += '<th>' + element['nombre'] + '</th>';
                html += '<th> $ ' + element['precio'] + '</th>';
                html += '<th> ' + element['descuento'] + '%</th>';
                html += '<th> ' + localStorage.getItem("id_" + element['id']) + ' Unidades</th>';
                html += '<th> $ ' + subprecio + ' </th>';
                totalprecio += subprecio;
            }
        });
        html += '<thead><th></th><th></th><th></th><th></th><th>Total:</th><th>$' + totalprecio + '</th>';
        html += '<thead><th></th><th></th><th></th><th></th><th><button class="boton" onclick="LimpiarCarrito();">Limpiar Carrito</button></th><th><button class="boton" onclick="ComprarCarrito();">Comprar</button></th>';
        html += '</tbody></table></div>';
        inputfiltros.style.display = 'none';//oculta el div de filtros (en caso de que este visible)
        contenedor.innerHTML = html;//añade la tabla al contenedor
    } else {//...si no
        vNotify.error({ text: 'Sin productos guardados', title: 'Carrito Vacio!' });//envia notificacion visual de que existe un error
    }

}
function LimpiarCarrito() {//funcion que limpia el carrito de compras
    localStorage.clear();//limpia la memoria local
    vNotify.success({ text: '', title: 'Carrito Limpiado!' });//envia notificacion visual 
    cargaLista();//vuelve a cargar la lista inicial
}
function ComprarCarrito() {
    localStorage.clear();
    vNotify.success({ text: 'Pago Exitoso!', title: 'Productos Comprados' });//envia notificacion visual 
    cargaLista();//vuelve a cargar la lista inicial
}
function AcercaDe() {//funcion que muestra la pagina 'Acerca de...'
    let html = "<div class='content'><div class='header'>Prueba Realizada por Byron Ram&iacute;rez Parada para BSALE</div><p>Deploy:</p><p>GitHub:</p><p>Correo: by.ramirez.91@outlook.com</p></div>";
    inputfiltros.style.display = 'none';//oculta el div de filtros (en caso de que este visible)
    contenedor.innerHTML = html;//añade el contenido al contenedor
}
//Carga inicial al entrar a la pagina web
cargaLista();
