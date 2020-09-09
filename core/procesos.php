<?php
require_once 'init.php';
switch ($_GET['Accion']) {
    case 'lista':
        $query=$db->query("SELECT
                            p.*,
                            c.name AS Categoria
                        FROM
                            product p
                            INNER JOIN category c ON ( c.id = p.category )");
        
        $arreglo=[];
        while($row=$query->fetch_array()){
            $r = array(
                'id' => $row['id'] ,
                'nombre' => utf8_encode($row['name']),
                'url_img' => $row['url_image'],
                'precio' => $row['price'],
                'descuento' => $row['discount'],
                'categoria' => utf8_encode($row['Categoria'])
             );
            array_push($arreglo,$r);
        }
        echo json_encode($arreglo);
        break;
    
    default:
        # code...
        break;
}