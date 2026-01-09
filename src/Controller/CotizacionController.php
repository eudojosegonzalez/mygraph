<?php

namespace App\Controller;

use App\Entity\Cotizacion;
use App\Entity\DetalleCotizacion;
use App\Form\CotizacionType;
use App\Repository\ClienteRepository;
use App\Repository\CotizacionRepository;
use App\Repository\DetalleCotizacionRepository;
use App\Repository\InventarioRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\DependencyInjection\ParameterBag\ContainerBagInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\RequestStack;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface; 
use Doctrine\DBAL\Connection; // ¡Importante!
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use App\Service\BcvService;
use DateTime;
use Symfony\Component\Validator\Constraints\Date;

use function PHPSTORM_META\type;

use FPDF;
use App\Pdf\CustomPdf;

#[IsGranted("ROLE_ADMIN")]
#[Route('/cotizacion')]
final class CotizacionController extends AbstractController
{
    
    #[Route(name: 'app_cotizacion_index', methods: ['GET'])]
    public function index(
        CotizacionRepository $cotizacionRepository,
        PaginatorInterface $paginator,
        Request $request
        ): Response
    {
        $fontSize= $this->getParameter('fontSize');
        $iconsWidthSize=$this->getParameter('iconsWidthSize');
        $iconsHeightSize=$this->getParameter('iconsHeightSize');
        $sizeSeparador=$this->getParameter('sizeSeparador');
        $colorSeparator=$this->getParameter('colorSeparator');
        $appLogo=$this->getParameter('logo');   
        


        $page=$request->query->getInt('page', 1);
        $limit=$request->query->getInt('limit', 20);

        $searchInput=$request->query->get('searchInput', "");

        if ($searchInput==""){
            // buscamos la cotizaciones 
            $registros=$cotizacionRepository->findAll();
        } else{
            // 1. Iniciar un QueryBuilder
            $registros = $cotizacionRepository->createQueryBuilder('c') // 'c' es el alias para Cotizacion
            ->innerJoin('c.cliente', 'cl')    // Unimos con la propiedad 'cliente' de la entidad Cotización
            ->where('cl.nombre LIKE :val')    // Filtramos por el nombre del cliente
            ->setParameter('val', '%' . $searchInput . '%') // El comodín % permite buscar coincidencias parciales
            ->orderBy('c.id', 'DESC')         // Opcional: ordenar por las más recientes
            ->getQuery()
            ->getResult();
        }        

        $cotizaciones = $paginator->paginate(
            $registros, // Objeto de la consulta a paginar
            $page, // Número de página actual
            $limit // Cantidad de elementos por página
        );        
        return $this->render('cotizacion/index.html.twig', [
            'cotizaciones' => $cotizaciones,
            'logo'=>$appLogo,
            'searchInput'=>$searchInput,
        ]);
    }


   /**
     * Esta funcion permite crear la cotizaciones, se creo para satisfacer 
     * la relacion Cotizacion---<DetallesCotizacion
     * Carga una nueva plantilla
     */
   #[Route('/new_cotizacion/', name: 'app_cotizacion_new2', methods: ['GET','POST'])]
    public function newCotizacion(
        Request $request,
        ClienteRepository $clienteRepository,
        InventarioRepository $inventarioRepository,
        BcvService $bcvService,
        ): Response
    {
        
        $fontSize= $this->getParameter('fontSize');
        $iconsWidthSize=$this->getParameter('iconsWidthSize');
        $iconsHeightSize=$this->getParameter('iconsHeightSize');
        $sizeSeparador=$this->getParameter('sizeSeparador');
        $colorSeparator=$this->getParameter('colorSeparator');
        $appLogo=$this->getParameter('logo'); 
        
        // buscamos los clientes activos 
        $clientes=$clienteRepository->findBy(['estado'=>1]);

        // Obtenemos las tasas desde el servicio
        try {
           $tasas = $bcvService->getTasas();
        } catch (\Exception $e) {
            // Si falla la conexión, definimos valores en 0 o null para evitar errores en Twig
            $tasas = ['USD' => 0, 'EUR' => 0, 'fecha' => 'No disponible'];
            $this->addFlash('error', 'No se pudo obtener la tasa oficial del BCV');
        }        

        // buscamos los materiales o servicios activos
        $materiales=$inventarioRepository->findBy(['estado'=>1]);

        return $this->render('cotizacion/new2.html.twig', [
            'logo'=>$appLogo,
            'clientes'=>$clientes,
            'tasas'=>$tasas,
            'materiales'=>$materiales
        ]);
    }   
    
    /**
     * Esta funcion permite consultar los detalles de un material
     */
    #[Route('/search_material/', name: 'app_search_material', methods: ['POST'])]
    public function searchMaterial(
        Request $request,
        InventarioRepository $inventarioRepository,
        ): Response
    {
        
        try {
            // capturamos el id del material
            $paso=1;
            $params=$request->request->all();

            $paso=2;
            $idMaterial=intval($params['idMaterial']);

            $paso=3;
            $material=$inventarioRepository->findOneBy(['id'=>$idMaterial]);

            $paso=3;
            if ($material){
                $paso=5;

                $elemento=[
                    "existencia"=>$material->getExistencia(),
                    "costo"=>$material->getCosto(),
                    "precio"=>$material->getPrecio(),
                    "porcentaje"=>((($material->getPrecio()-$material->getCosto())/$material->getCosto())*100),
                    "unidad"=>$material->getUnidad()->getSimbolo()
                ];

                $respuesta=[
                    "valor" => "1",
                    "mensaje"=>"Material encontrado",
                    "data"=>$elemento
                ];
            } else {
                $respuesta=[
                    "valor" => "-1",
                    "mensaje"=>"Material no encontrado",
                ];
            }
            return new JsonResponse ($respuesta) ;
        }  catch (\Exception $e) {
                $respuesta=[
                    "valor" => "-2",
                    "mensaje"=>"Ocurrió un error inesperado paso:".$paso." descripción del error:".$e->getMessage(),
                ];            
            return new JsonResponse ($respuesta) ;
        } 
    }     

    /**
    * Esta funcion permite salvar la cotizacion
    */
    #[Route('/salvar_cotizacion/', name: 'app_salvar_cotizacion', methods: ['POST'])]
    public function saveCotizacion(
        Request $request,
        InventarioRepository $inventarioRepository,
        CotizacionRepository $cotizacionRepository,
        DetalleCotizacionRepository $detalleCotizacionRepository,
        ClienteRepository $clienteRepository,
         EntityManagerInterface $entityManager,
        ): Response
    {
        try {
            $paso=1;

            // obtenemos el usuario
            $user=$this->getUser();

            // capturamos los datos
            $paso=2;
            $params=$request->request->all();

            /*
            idcliente:idClienteV,
            tasaEUR:tasaEUR,
            tasaUSD,tasaUSD,
            data:inventario
            */
            // cliente
            $paso=3;
            $idCliente=intval($params['idCliente']);
            // tasa euro
            $paso=4;
            $tasaEUR=floatval($params['tasaEUR']);
            // tasa usd
            $paso=5;
            $tasaUSD=floatval($params['tasaUSD']);
            // porcentaje descuento general
            $paso=6;
            $porDesGen=floatval($params['porDesGen']);            
            // arreglo de datos
            $paso=7;
            $arregloDetalles=json_decode($params['data']);

            $paso=10;

            
            if (is_array($arregloDetalles)){
                $paso=11;
                // recorremos los detalles de cotizacion para determinar el subtotal
                $sTotal=0.00;
                $paso=12;
                $totalSinDes=0.00;
                $paso=13;
                $totalConDes=0.00;
                $paso=14;
                $monDesGen=0.00;
                $paso=15;                
                foreach ($arregloDetalles as $row){
                    $paso=16;
                    $sTotal=$sTotal+floatval($row->subtotal);
                }

                // verificamos si hay descuento general
                $paso=17;
                $totalSinDes=$sTotal;
                $paso=18;
                if ($porDesGen>0.00){
                    $paso=19;
                    $monDesGen=$sTotal*$porDesGen/100;
                    $paso=20;
                    $totalConDes=$sTotal-$monDesGen;
                } else {
                    $paso=21;
                    $totalConDes=$sTotal;
                }

                // buscamos el cliente
                $paso=22;
                $cliente=$clienteRepository->find($idCliente);
                
                //obtenemos la fecha del servidor 
                $paso=23;
                $fecha= new DateTime();
                $paso=24;
                $fecha2 = new \DateTime('1990-01-01');
                
                // creamos la cotizacion
                $paso=25;
                $newCotizacion=new Cotizacion();
                /*
                `id` int(11) NOT NULL AUTO_INCREMENT,
                `fecha_creacion` date NOT NULL,
                `fecha_actualizacion` date NOT NULL,
                `fecha_aprobacion` date NOT NULL,
                `estado` int(11) NOT NULL,
                `monto` decimal(13,2) NOT NULL,
                `por_descuento` decimal(5,2) NOT NULL,
                `monto_descuento` decimal(13,2) NOT NULL,
                `precio` decimal(13,2) NOT NULL,
                `cliente_id` int(11) NOT NULL,
                `usuario_id` int(11) NOT NULL,
                */

                $paso=26;
                $newCotizacion->setFechaCreacion($fecha);
                $paso=27;
                $newCotizacion->setFechaActualizacion($fecha2);
                $paso=28;
                $newCotizacion->setFechaAprobacion($fecha2);
                $paso=29;
                $newCotizacion->setEstado(1);//1 creada 2 aprobada por cliente 3 procesada 4 anulada
                $paso=30;
                $newCotizacion->setMonto($totalSinDes); // esto representa el monto bruto de la cotizacion
                $paso=31;
                $newCotizacion->setPorDescuento($porDesGen); // esto es el porcentaje de descuento aplicado
                $paso=32;
                $newCotizacion->setMontoDescuento($monDesGen); // el monto del descuento aplicado
                $paso=33;
                $newCotizacion->setPrecio($totalConDes); // esto representa el monto a pagar por el cliente
                $paso=34;
                $newCotizacion->setCliente($cliente);
                $paso=35; 
                $newCotizacion->setUsuario($user);
                
                $paso=36;
                $entityManager->persist($newCotizacion);
                $paso=37;
                $entityManager->flush();

                // verificamos si se creo la nueva cotizacion
                $paso=50;
                if ($newCotizacion) {
                    $paso=51;
                    // guardamos losa detalles de la cotizacion
                    // obtenemos el id de la cotizacion
                    $idCotizacion=$newCotizacion->getId();

                    // recorremos el arreglo de los detalles de cotizacion para crear tantos registros como filas hay en el arreglo
                    $paso=52;
                    $orden=1;
                    foreach ($arregloDetalles as $row){
                        $paso=53;
                        /*
                        estructura del arreglo
                        id: 1, 
                        codigo: '', 
                        descripcion: '', 
                        cantidad: 0, 
                        costo:0.00,
                        precio:0.00,
                        porcentaje:0.00,
                        idmaterial:0,
                        porcentajeDescuento:0.00,
                        montoDescuento:0.00,
                        subtotal: 0.00 
                        */
                        $paso=54;
                        $codigo=$row->codigo; // codigo del material a cotizar
                        $paso=55;
                        $descripcion=$row->descripcion; // descripcion del material a cotizar
                        $paso=56;
                        $cantidad=floatval($row->cantidad); // cantidad de material a cotizar
                        $paso=57;
                        $costo=floatval($row->costo); // costo del material a cotizar
                        $paso=58;
                        $precio=floatval($row->precio); // precio de venta del material a cotizar
                        $paso=59;
                        $porcentaje=floatval($row->porcentaje); // porcentaje de ganancia del material a cotizar
                        $paso=60;
                        $idmaterial=intval($row->idmaterial); // ide del material a utilizar en la cotizacion
                        $paso=61;
                        $porcentajeDescuento=floatval($row->porcentajeDescuento); // porcentaje de descuento aplicado al material
                        $paso=62;
                        $montoDescuento=floatval($row->montoDescuento); // monto del descuento aplicado al material a utilizar
                        $paso=63;
                        $subtotal=floatval($row->subtotal); // precio final del material a cotizar con el descuento si aplica

                        /*
                        estructura de la tabla
                        `id` int(11) NOT NULL AUTO_INCREMENT,
                        `cantidad` decimal(13,2) NOT NULL,
                        `costo` decimal(13,2) NOT NULL,
                        `precio` decimal(13,2) NOT NULL,
                        `cliente_id` int(11) NOT NULL,
                        `cotizacion_id` int(11) NOT NULL,
                        `inventario_id` int(11) NOT NULL,
                        `unidad_id` int(11) NOT NULL,
                        `taza_aplicada` int(11) NOT NULL,
                        `taza1` decimal(10,2) DEFAULT NULL,
                        `taza2` decimal(10,2) DEFAULT NULL,
                        `taza3` decimal(10,2) DEFAULT NULL,
                        `factor` decimal(5,2) NOT NULL,
                        `porcentaje_descuento` decimal(5,2) NOT NULL,
                        `monto_descuento` decimal(10,2) NOT NULL,
                        */                        
                        // buscamos el material en la tabla
                        $paso=70;
                        $material=$inventarioRepository->find($idmaterial);
                        // buscamos la unidad involucrada
                        $paso=71;
                        $unidad=$material->getUnidad();

                        $paso=72;
                        $newDetalleCotizacion= new DetalleCotizacion();
                        $paso=73;
                        $newDetalleCotizacion->setCantidad($cantidad);
                        $paso=74;
                        $newDetalleCotizacion->setCosto($costo);
                        $paso=75;
                        $newDetalleCotizacion->setPrecio($precio);
                        $paso=76;
                        $newDetalleCotizacion->setCliente($cliente);
                        $paso=77;
                        $newDetalleCotizacion->setCotizacion($newCotizacion);
                        $paso=78;
                        $newDetalleCotizacion->setInventario($material);
                        $paso=79;
                        $newDetalleCotizacion->setUnidad($unidad);
                        $paso=80;
                        $newDetalleCotizacion->setTazaAplicada(1);
                        $paso=81;
                        $newDetalleCotizacion->setTaza1($tasaEUR);
                        $paso=82;
                        $newDetalleCotizacion->setTaza2($tasaUSD);
                        $paso=83;
                        $newDetalleCotizacion->setTaza3(0.00);
                        $paso=84;
                        $newDetalleCotizacion->setFactor($porcentaje);
                        $paso=85;
                        $newDetalleCotizacion->setPorcentajeDescuento($porcentajeDescuento);
                        $paso=86;
                        $newDetalleCotizacion->setMontoDescuento($montoDescuento);
                        $paso=87;
                        $newDetalleCotizacion->setOrden($orden);
                        $paso=88;
                        $newDetalleCotizacion->setPorcentaje($porcentaje);                        

                        $paso=88;
                        $entityManager->persist($newDetalleCotizacion);
                        $paso=89;
                        $entityManager->flush();
                        $paso=90;
                        $orden++;
                    }                    

                    $paso=100;
                    $respuesta=[
                        "valor" => "1",
                        "mensaje"=>"Cotizacion creada con exito" ,
                    ];            
                    $paso=101;
                    return new JsonResponse ($respuesta) ;                        
                } else {
                    $paso=120;
                    $respuesta=[
                        "valor" => "-3",
                        "mensaje"=>"No se pudo guardar la cotizacion, por favor intentelo" ,
                    ];      
                    $paso=121;      
                    return new JsonResponse ($respuesta) ;                       
                }
              
            } else {
                $paso=130;
                $respuesta=[
                    "valor" => "-3",
                    "mensaje"=>"Se esperaba un arreglo de datos con los detalles de la cotizacion" ,
                ];        
                $paso=131;    
                return new JsonResponse ($respuesta) ;                
            }

            $paso=140;
            $respuesta=[
                'valor'=>'1',
                'mensaje'=>'Se guardó la cotización con exito'
            ];
            $paso=141;
            return new JsonResponse ($respuesta);
        }  catch (\Exception $e) {
                $respuesta=[
                    "valor" => "-3",
                    "mensaje"=>"Ocurrió un error inesperado paso:".$paso." descripción del error:".$e->getMessage(),
                ];            
            return new JsonResponse ($respuesta) ;
        }         
    }
    

/**
    * Esta funcion permite salvar la cotizacion
    */
    #[Route('/actualizar_cotizacion/', name: 'app_actualizar_cotizacion', methods: ['POST'])]
    public function updateCotizacion(
        Request $request,
        InventarioRepository $inventarioRepository,
        CotizacionRepository $cotizacionRepository,
        DetalleCotizacionRepository $detalleCotizacionRepository,
        ClienteRepository $clienteRepository,
        EntityManagerInterface $entityManager,
        ): Response
    {
        try {
            $paso=1;

            // obtenemos el usuario
            $user=$this->getUser();

            // capturamos los datos
            $paso=2;
            $params=$request->request->all();

            /*
            idcliente:idClienteV,
            tasaEUR:tasaEUR,
            tasaUSD,tasaUSD,
            data:inventario
            */
            // cliente
            $paso=3;
            $idCliente=intval($params['idCliente']);
            // tasa euro
            $paso=4;
            $tasaEUR=floatval($params['tasaEUR']);
            // tasa usd
            $paso=5;
            $tasaUSD=floatval($params['tasaUSD']);
            // porcentaje descuento general
            $paso=6;
            $porDesGen=floatval($params['porDesGen']);            
            // arreglo de datos
            $paso=7;
            $arregloDetalles=json_decode($params['data']);
            // id de cotizacion
            $paso=8;
            $idCotizacion=intval($params['idCotizacion']);
            // estadode cotizacion
            $paso=8;
            $estado=intval($params['estado']);            

            $paso=10;

            
            if (is_array($arregloDetalles)){
                $paso=11;
                // recorremos los detalles de cotizacion para determinar el subtotal
                $sTotal=0.00;
                $paso=12;
                $totalSinDes=0.00;
                $paso=13;
                $totalConDes=0.00;
                $paso=14;
                $monDesGen=0.00;
                $paso=15;                
                foreach ($arregloDetalles as $row){
                    $paso=16;
                    $sTotal=$sTotal+floatval($row->subtotal);
                }

                // verificamos si hay descuento general
                $paso=17;
                $totalSinDes=$sTotal;
                $paso=18;
                if ($porDesGen>0.00){
                    $paso=19;
                    $monDesGen=$sTotal*$porDesGen/100;
                    $paso=20;
                    $totalConDes=$sTotal-$monDesGen;
                } else {
                    $paso=21;
                    $totalConDes=$sTotal;
                }

                // buscamos el cliente
                $paso=22;
                $cliente=$clienteRepository->find($idCliente);
                
                //obtenemos la fecha del servidor 
                $paso=23;
                $fecha= new DateTime();
                $paso=24;
                $fecha2 = new \DateTime('1990-01-01');
                
                // creamos la cotizacion
                $paso=25;
                $newCotizacion=$cotizacionRepository->find($idCotizacion);
                /*
                `id` int(11) NOT NULL AUTO_INCREMENT,
                `fecha_creacion` date NOT NULL,
                `fecha_actualizacion` date NOT NULL,
                `fecha_aprobacion` date NOT NULL,
                `estado` int(11) NOT NULL,
                `monto` decimal(13,2) NOT NULL,
                `por_descuento` decimal(5,2) NOT NULL,
                `monto_descuento` decimal(13,2) NOT NULL,
                `precio` decimal(13,2) NOT NULL,
                `cliente_id` int(11) NOT NULL,
                `usuario_id` int(11) NOT NULL,
                */

                $paso=26;
                $newCotizacion->setFechaCreacion($fecha);
                $paso=27;
                $newCotizacion->setFechaActualizacion($fecha2);
                $paso=28;
                $newCotizacion->setFechaAprobacion($fecha2);
                $paso=29;
                $newCotizacion->setEstado(1);//1 creada 2 aprobada por cliente 3 procesada 4 anulada
                $paso=30;
                $newCotizacion->setMonto($totalSinDes); // esto representa el monto bruto de la cotizacion
                $paso=31;
                $newCotizacion->setPorDescuento($porDesGen); // esto es el porcentaje de descuento aplicado
                $paso=32;
                $newCotizacion->setMontoDescuento($monDesGen); // el monto del descuento aplicado
                $paso=33;
                $newCotizacion->setPrecio($totalConDes); // esto representa el monto a pagar por el cliente
                $paso=34;
                $newCotizacion->setCliente($cliente);
                $paso=35; 
                $newCotizacion->setUsuario($user);
                $paso=36;
                $newCotizacion->setEstado($estado);
                
                $paso=37;
                $entityManager->persist($newCotizacion);
                $paso=38;
                $entityManager->flush();

                // verificamos si se creo la nueva cotizacion
                $paso=50;
                if ($newCotizacion) {
                    $paso=51;
                    
                    // eliminamos los registros asociados a la cotizacion
                    $detalles = $entityManager->getRepository(DetalleCotizacion::class)
                        ->findBy(['cotizacion' => $idCotizacion]);

                    foreach ($detalles as $detalle) {
                        $entityManager->remove($detalle);
                    }

                    // Es vital ejecutar flush para que los cambios se apliquen en la DB
                    $entityManager->flush();

                    
                    // guardamos losa detalles de la cotizacion
                    // recorremos el arreglo de los detalles de cotizacion para crear tantos registros como filas hay en el arreglo
                    $paso=52;
                    $orden=1;
                    foreach ($arregloDetalles as $row){
                        $paso=53;
                        /*
                        estructura del arreglo
                        id: 1, 
                        codigo: '', 
                        descripcion: '', 
                        cantidad: 0, 
                        costo:0.00,
                        precio:0.00,
                        porcentaje:0.00,
                        idmaterial:0,
                        porcentajeDescuento:0.00,
                        montoDescuento:0.00,
                        subtotal: 0.00 
                        */
                        $paso=54;
                        $codigo=$row->codigo; // codigo del material a cotizar
                        $paso=55;
                        $descripcion=$row->descripcion; // descripcion del material a cotizar
                        $paso=56;
                        $cantidad=floatval($row->cantidad); // cantidad de material a cotizar
                        $paso=57;
                        $costo=floatval($row->costo); // costo del material a cotizar
                        $paso=58;
                        $precio=floatval($row->precio); // precio de venta del material a cotizar
                        $paso=59;
                        $porcentaje=floatval($row->porcentaje); // porcentaje de ganancia del material a cotizar
                        $paso=60;
                        $idmaterial=intval($row->idmaterial); // ide del material a utilizar en la cotizacion
                        $paso=61;
                        $porcentajeDescuento=floatval($row->porcentajeDescuento); // porcentaje de descuento aplicado al material
                        $paso=62;
                        $montoDescuento=floatval($row->montoDescuento); // monto del descuento aplicado al material a utilizar
                        $paso=63;
                        $subtotal=floatval($row->subtotal); // precio final del material a cotizar con el descuento si aplica

                        /*
                        estructura de la tabla
                        `id` int(11) NOT NULL AUTO_INCREMENT,
                        `cantidad` decimal(13,2) NOT NULL,
                        `costo` decimal(13,2) NOT NULL,
                        `precio` decimal(13,2) NOT NULL,
                        `cliente_id` int(11) NOT NULL,
                        `cotizacion_id` int(11) NOT NULL,
                        `inventario_id` int(11) NOT NULL,
                        `unidad_id` int(11) NOT NULL,
                        `taza_aplicada` int(11) NOT NULL,
                        `taza1` decimal(10,2) DEFAULT NULL,
                        `taza2` decimal(10,2) DEFAULT NULL,
                        `taza3` decimal(10,2) DEFAULT NULL,
                        `factor` decimal(5,2) NOT NULL,
                        `porcentaje_descuento` decimal(5,2) NOT NULL,
                        `monto_descuento` decimal(10,2) NOT NULL,
                        */                        
                        // buscamos el material en la tabla
                        $paso=70;
                        $material=$inventarioRepository->find($idmaterial);
                        // buscamos la unidad involucrada
                        $paso=71;
                        $unidad=$material->getUnidad();

                        $paso=72;
                        $newDetalleCotizacion= new DetalleCotizacion();
                        $paso=73;
                        $newDetalleCotizacion->setCantidad($cantidad);
                        $paso=74;
                        $newDetalleCotizacion->setCosto($costo);
                        $paso=75;
                        $newDetalleCotizacion->setPrecio($precio);
                        $paso=76;
                        $newDetalleCotizacion->setCliente($cliente);
                        $paso=77;
                        $newDetalleCotizacion->setCotizacion($newCotizacion);
                        $paso=78;
                        $newDetalleCotizacion->setInventario($material);
                        $paso=79;
                        $newDetalleCotizacion->setUnidad($unidad);
                        $paso=80;
                        $newDetalleCotizacion->setTazaAplicada(1);
                        $paso=81;
                        $newDetalleCotizacion->setTaza1($tasaEUR);
                        $paso=82;
                        $newDetalleCotizacion->setTaza2($tasaUSD);
                        $paso=83;
                        $newDetalleCotizacion->setTaza3(0.00);
                        $paso=84;
                        $newDetalleCotizacion->setFactor($porcentaje);
                        $paso=85;
                        $newDetalleCotizacion->setPorcentajeDescuento($porcentajeDescuento);
                        $paso=86;
                        $newDetalleCotizacion->setMontoDescuento($montoDescuento);
                        $paso=87;
                        $newDetalleCotizacion->setOrden($orden);
                        $paso=88;
                        $newDetalleCotizacion->setPorcentaje($porcentaje);                        

                        $paso=88;
                        $entityManager->persist($newDetalleCotizacion);
                        $paso=89;
                        $entityManager->flush();
                        $paso=90;
                        $orden++;
                    }                    

                    $paso=100;
                    $respuesta=[
                        "valor" => "1",
                        "mensaje"=>"Cotizacion creada con exito" ,
                    ];            
                    $paso=101;
                    return new JsonResponse ($respuesta) ;                        
                } else {
                    $paso=120;
                    $respuesta=[
                        "valor" => "-3",
                        "mensaje"=>"No se pudo guardar la cotizacion, por favor intentelo" ,
                    ];      
                    $paso=121;      
                    return new JsonResponse ($respuesta) ;                       
                }
              
            } else {
                $paso=130;
                $respuesta=[
                    "valor" => "-3",
                    "mensaje"=>"Se esperaba un arreglo de datos con los detalles de la cotizacion" ,
                ];        
                $paso=131;    
                return new JsonResponse ($respuesta) ;                
            }

            $paso=140;
            $respuesta=[
                'valor'=>'1',
                'mensaje'=>'Se guardó la cotización con exito'
            ];
            $paso=141;
            return new JsonResponse ($respuesta);
        }  catch (\Exception $e) {
                $respuesta=[
                    "valor" => "-3",
                    "mensaje"=>"Ocurrió un error inesperado paso:".$paso." descripción del error:".$e->getMessage(),
                ];            
            return new JsonResponse ($respuesta) ;
        }         
    }    


    /* 
    Esta funcion permite imprimr la cotizacion
    */
    #[Route('/cotizacion_print/', name: 'app_cotizacion_print', methods: ['POST'])]
    public function printCotizacion(
        Request $request,
        InventarioRepository $inventarioRepository,
        CotizacionRepository $cotizacionRepository,
        DetalleCotizacionRepository $detalleCotizacionRepository,
        ClienteRepository $clienteRepository,
        EntityManagerInterface $entityManager,
        ): Response
    {
        try {
            $paso=1;

            $appLogo=$this->getParameter('logo');   
            $wLogo= $this->getParameter('wLogo');
            $hLogo= $this->getParameter('hLogo');            

            $user=$this->getUser();

            $params=$request->request->all();

            $idCotizacion=intval($params['idCotizacion']);
            
            // 2. Formatear la fecha
            $fecha = new \DateTimeImmutable();
            $dateFormatted = $fecha->format('d/m/Y h:i a'); 

            // tomamos el id de la cotiazacion
            $cotizacion=$cotizacionRepository->find($idCotizacion);

            // tomamos el cliente
            $cliente=$cotizacion->getCliente();

            $emailCliente=$cliente->getEmail();

            $idCliente=$cliente->getId();

            // buscamos los detalles de la cotizacion
            /*$detallesCotizacion=$detalleCotizacionRepository->createQueryBuilder('d')
            ->innerJoin('d.cotizacion', 'c')
            ->innerJoin('d.inventario', 'i')
            ->addSelect('c', 'i')
            ->where('d.cotizacion = :val')
            ->setParameter('val', $idCotizacion)             
            ->getQuery()
            ->getResult(); */
            
            $detallesCotizacion=$detalleCotizacionRepository->searchDetallesCotizacion($idCotizacion);

            // creamos el documento
            /*------- segmento de impresion ------------------------------------*/
            /*-------------------------------------------------------------*/
            // 3. INSTANCIAR Y PASAR DATOS al constructor
            $pdf = new CustomPdf(
                'P',        // Orientación
                'mm',       // Unidad
                'Letter',       // Tamaño
                $user->getName(), // <-- Dato del usuario
                $dateFormatted // <-- Dato de la fecha formateada
            );

            $pdf->AliasNbPages();
            $pdf->SetMargins(5,5,5);
            $pdf->SetAuthor("MYGRAPH", true);
            $pdf->SetTitle(mb_convert_encoding('Cotización No. '.$idCotizacion, 'ISO-8859-1', 'UTF-8'));

            $pdf->AddPage();
            $yLine=10;

            $nItem=1;
            $nCantidadItems=count($detallesCotizacion);       

            $TotalFactura=0.00;
            $TotalBrutoFactura=0.00;
            $DescuentoGlobal=0.00;
            $PorcentajeDescuentoGlobal=0.00;
            $TotalIva=0.00;


            foreach ($detallesCotizacion as $row){
                // verificamos is imprimimos el encabezado
                if ($yLine==10){
                    // imprimimos el logo
                    $pdf->Image($appLogo, 7, 8, $wLogo,$hLogo);

                    /*------ seccion del encabezado de la pagina -----*/
                    $rifEmpresa="Prueba";
                    $direccionEmpresa="prueba";
                    $emailEmpresa="prueba@gmail.com";
                    $telefonosEmpresa="prueba";

                    $pdf->setY($yLine);
                    // Set font
                    $pdf->SetFont('Arial', '', 8);
                    // Move to 8 cm to the right
                    $pdf->Cell(50);
                    // Texto centrado en una celda con cuadro 20*10 mm y salto de línea
                    $cadena="R.I.F.:$rifEmpresa";
                    $wStr=$pdf->GetStringWidth($cadena);
                    $pdf->Cell($wStr,0,$cadena,0,'L');
                    
                    $pdf->setX(150);
                    $cadena="Cotizacion Nro:";
                    $wStr=$pdf->GetStringWidth($cadena);
                    $pdf->Cell($wStr,0,$cadena,0,'L');

                    $pdf->setX(180);
                    $cadena=trim($idCotizacion);
                    $wStr=$pdf->GetStringWidth($cadena);
                    $pdf->Cell($wStr,0,$cadena,0,'R'); 

                    // nueva linea
                    $pdf->setY(15);
                    $pdf->Cell(50);
                    $cadena=$direccionEmpresa;
                    $pdf->MultiCell(95,3,$cadena,0,'L');

                    
                    $pdf->setY(15);
                    $pdf->setX(150);
                    $cadena="Fecha Emis:";
                    $wStr=$pdf->GetStringWidth($cadena);
                    $pdf->Cell($wStr,0,$cadena,0,'L');


                    // 1. Tu variable con el dato de entrada
                    //$fechaEntradaStr = $cotizacion->getFechaCreacion(); 
                    // El formato de entrada es: YYYY-mm-dd h:i:s (o H:i:s, la diferencia no importa aquí)
                    //$formatoEntrada = 'Y-m-d H:i:s'; 

                    // 2. Crear un objeto DateTime a partir de la cadena y su formato
                    //$dateTimeObj = \DateTime::createFromFormat($formatoEntrada, $fechaEntradaStr);

                    // 3. Formatear el objeto al formato de salida deseado: d/m/Y
                    $formatoSalida = 'd/m/Y';
                    $fechaSalidaStr = $cotizacion->getFechaCreacion()->format($formatoSalida);

                    $pdf->setY(15);
                    $pdf->setX(180);
                    $cadena=date("d/m/Y",strtotime($fechaSalidaStr));
                    $wStr=$pdf->GetStringWidth($cadena);
                    $pdf->Cell($wStr,0,$cadena,0,'R'); 

                    $pdf->setY(20);
                    $pdf->setX(150);
                    $cadena="Fecha Vencimiento:";
                    $wStr=$pdf->GetStringWidth($cadena);
                    $pdf->Cell($wStr,0,$cadena,0,'L');                        

                    $pdf->setY(20);
                    $pdf->setX(180);
                    $cadena=date("d/m/Y",strtotime($fechaSalidaStr));
                    $wStr=$pdf->GetStringWidth($cadena);
                    $pdf->Cell($wStr,0,$cadena,0,'R');                        

                    // nueva linea
                    $pdf->setY(25);
                    $pdf->Cell(50);
                    $cadena="Email:$emailEmpresa";
                    $wStr=$pdf->GetStringWidth($cadena);
                    $pdf->Cell($wStr,5,$cadena,0,'L');

                    $pdf->setY(30);
                    $pdf->setX(55);
                    $cadena="Telefonos:$telefonosEmpresa";
                    $wStr=$pdf->GetStringWidth($cadena);
                    $pdf->Cell($wStr,5,$cadena,0,'L');

                    // lineas del encabezado
                    $pdf->Rect(5,5,200,35);
                    $pdf->Line(150,5,150,40);

                    /*------- fin seccion del encabezado de la pagina -----*/            
                    /*----- seccion identificacion del cliente ------*/
                    $pdf->setY(45);
                    $pdf->setX(10);   
                    $cadena="Nombre del cliente:".$cliente->getNombre();
                    $wStr=$pdf->GetStringWidth($cadena);
                    $pdf->Cell($wStr,5,$cadena,0,'L');                 

                    $pdf->setY(50);
                    $pdf->setX(10);   
                    $cadena=mb_convert_encoding("RIF/Cédula del cliente:".$cliente->getDocumento(), 'ISO-8859-1', 'UTF-8');
                    $wStr=$pdf->GetStringWidth($cadena);
                    $pdf->Cell($wStr,5,$cadena,0,'L');  

                    $pdf->setY(55);
                    $pdf->setX(10);   
                    $cadena=mb_convert_encoding("Teléfono del cliente:".$cliente->getTelefono(), 'ISO-8859-1', 'UTF-8');
                    $wStr=$pdf->GetStringWidth($cadena);
                    $pdf->Cell($wStr,5,$cadena,0,'L');  

                    $pdf->setY(60);
                    $pdf->setX(10);   
                    $cadena=mb_convert_encoding("Dirección del cliente:".$cliente->getDireccion(), 'ISO-8859-1', 'UTF-8');
                    $wStr=$pdf->GetStringWidth($cadena);
                    $pdf->Cell($wStr,5,$cadena,0,'L');  
                    /*----- fin seccion identificacion del cliente ------*/

                    /*----- área de detalles -----------------*/
                    // vamos a simular que nos devolvieron un rowId nuevo
                    // buscamos si el numero de cotizacione existe


                    $yLine=70;
                    $pdf->setFont("Arial","",32);
                    // imprimimos el numero de item
                    $pdf->setY($yLine);
                    $pdf->setX(5);
                    $cadena=mb_convert_encoding("Cotización", 'ISO-8859-1', 'UTF-8');
                    $wStr=$pdf->GetStringWidth($cadena);
                    $pdf->Cell(0, 10, $cadena, 0, 1, 'C');

                    // 1. Definimos la posición Y donde queremos la línea
                    // Si vienes de escribir "COTIZACIÓN", puedes usar GetY() para obtener la posición actual
                    /*$y = $pdf->GetY() + 2; 

                    // 2. Definimos el grosor de la línea (opcional, por defecto es 0.2mm)
                    $pdf->SetLineWidth(0.5);

                    // 3. Dibujamos la línea
                    // Parámetros: Line(x1, y1, x2, y2)
                    $pdf->Line(5, $y, $pdf->GetPageWidth() - 5, $y);

                    // 4. Restauramos el grosor si es necesario
                    $pdf->SetLineWidth(0.2);*/

                    //$yLine=$pdf->getY();
                    $pdf->setFont("Arial","",7);
                    $nItem=1;

                    $yLine= $pdf->GetY() + 5; 
                    // encabezado de la cotizacion //
                    // imprimimos el numero de item
                    $pdf->setY($yLine);
                    $pdf->setX(5);
                    $cadena="Item";
                    $wStr=$pdf->GetStringWidth($cadena);
                    $pdf->Cell($wStr,5,$cadena,0,'C');   
                    
                    // imprimimos el codigo del item
                    $pdf->setY($yLine);
                    $pdf->setX(20);
                    $cadena=mb_convert_encoding("Código", 'ISO-8859-1', 'UTF-8');
                    $wStr=$pdf->GetStringWidth($cadena);
                    $pdf->Cell($wStr,5,$cadena,0,'C');                   

                    // imprimimos la descricpion
                    $pdf->setY($yLine);
                    $pdf->setX(50);
                    $cadena=mb_convert_encoding("Descricpción", 'ISO-8859-1', 'UTF-8');
                    $wStr=$pdf->GetStringWidth($cadena);
                    $pdf->Cell($wStr,5,$cadena,0,'C');   

                    // imprimimos la modelo
                    $pdf->setY($yLine);
                    $pdf->setX(100);
                    $cadena=mb_convert_encoding("Modelo", 'ISO-8859-1', 'UTF-8');
                    $wStr=$pdf->GetStringWidth($cadena);
                    $pdf->Cell($wStr,5,$cadena,0,'C');                   
                    
                    // imprimimos la cantidad
                    $pdf->setY($yLine);
                    $pdf->setX(120);
                    $cadena=mb_convert_encoding("Cantidad", 'ISO-8859-1', 'UTF-8');
                    $wStr=$pdf->GetStringWidth($cadena);
                    $pdf->Cell(40,5,$cadena,0,0,'R');   

                    // imprimimos el precio
                    $pdf->setY($yLine);
                    $pdf->setX(140);
                    $cadena=mb_convert_encoding("Precio", 'ISO-8859-1', 'UTF-8');
                    $wStr=$pdf->GetStringWidth($cadena);
                    $pdf->Cell(40,5,$cadena,0,0,'R');                   

                    // impromimos el total

                    $pdf->setY($yLine);
                    $pdf->setX(160);
                    $cadena=mb_convert_encoding("SubTotal", 'ISO-8859-1', 'UTF-8');
                    $wStr=$pdf->GetStringWidth($cadena);
                    $pdf->Cell(40,5,$cadena,0,0,'R');   

                    $yLine=$pdf->GetY() + 5;
                    
                    // 2. Definimos el grosor de la línea (opcional, por defecto es 0.2mm)
                    $pdf->SetLineWidth(0.5);

                    // 3. Dibujamos la línea
                    // Parámetros: Line(x1, y1, x2, y2)
                    $pdf->Line(5, $yLine, $pdf->GetPageWidth() -11, $yLine);            
                    
                    $yLine=$pdf->GetY() + 5;
                }
                // fin encabezado
                /*
                cotizacion.id,
                cotizacion.fecha_creacion,
                cotizacion.fecha_aprobacion,
                cotizacion.fecha_actualizacion,
                cotizacion.por_descuento,
                cotizacion.monto_descuento,
                detalle_cotizacion.id as id_detalle,
                detalle_cotizacion.cantidad,
                detalle_cotizacion.costo,
                detalle_cotizacion.precio,
                detalle_cotizacion.unidad_id,
                detalle_cotizacion.taza_aplicada,
                detalle_cotizacion.taza1,
                detalle_cotizacion.taza2,
                detalle_cotizacion.taza3,
                detalle_cotizacion.factor,
                detalle_cotizacion.porcentaje,
                detalle_cotizacion.orden,
                inventario.codigo,
                inventario.nombre,
                inventario.modelo,
                inventario.estado,
                unidad.simbolo
                */
                $codigo=$row["codigo"];
                $nombre=$row["nombre"];
                $cantidad=$row["cantidad"];
                $simbolo=$row['simbolo'];
                $precio=$row['precio'];
                $modelo=$row['modelo'];
                $porDesGeneral=$row['por_descuento'];
                $orden=$row['orden'];

                // imprimimos el numero de item
                $pdf->setY($yLine);
                $pdf->setX(5);
                $cadena=trim(strval($nItem));
                $wStr=$pdf->GetStringWidth($cadena);
                $pdf->Cell($wStr,5,$cadena,0,'C');   
                
                // imprimimos el codigo del item
                $pdf->setY($yLine);
                $pdf->setX(20);
                $cadena=mb_convert_encoding(trim(strval($codigo)), 'ISO-8859-1', 'UTF-8');
                $wStr=$pdf->GetStringWidth($cadena);
                $pdf->Cell($wStr,5,$cadena,0,'C');                   

                // imprimimos la descricpion
                $pdf->setY($yLine);
                $pdf->setX(40);
                $cadena=mb_convert_encoding(trim(strval($nombre)), 'ISO-8859-1', 'UTF-8');
                $wStr=$pdf->GetStringWidth($cadena);
                $pdf->Cell($wStr,5,$cadena,0,'C');   

                // imprimimos la modelo
                $pdf->setY($yLine);
                $pdf->setX(90);
                $cadena=mb_convert_encoding(trim(strval($modelo)), 'ISO-8859-1', 'UTF-8');
                $wStr=$pdf->GetStringWidth($cadena);
                $pdf->Cell($wStr,5,$cadena,0,'C');                   
                
                // imprimimos la cantidad
                $pdf->setY($yLine);
                $pdf->setX(120);
                $cadena=mb_convert_encoding(trim(strval($cantidad)), 'ISO-8859-1', 'UTF-8');
                $wStr=$pdf->GetStringWidth($cadena);
                $pdf->Cell(40,5,$cadena,0,0,'R');   

                // imprimimos el precio
                $pdf->setY($yLine);
                $pdf->setX(140);
                $cadena=mb_convert_encoding(trim(strval($precio)), 'ISO-8859-1', 'UTF-8');
                $wStr=$pdf->GetStringWidth($cadena);
                $pdf->Cell(40,5,$cadena,0,0,'R');                   

                // impromimos el total
                $sTotal=number_format($cantidad*$precio,2,".","");
                $TotalBrutoFactura+=$sTotal;
                $pdf->setY($yLine);
                $pdf->setX(160);
                $cadena=mb_convert_encoding(trim(strval($sTotal)), 'ISO-8859-1', 'UTF-8');
                $wStr=$pdf->GetStringWidth($cadena);
                $pdf->Cell(40,5,$cadena,0,0,'R');                    

                // incremetamos el numero de item
                $nItem++;
                //$yLine=$pdf->getY()+1;

                if ($yLine>=240){
                    // imprimimos el rectangulo de los detalles
                    if ($nItem<$nCantidadItems){
                        $pdf->Rect(5,85,200,200);
                        $yFinalRectangulo=$pdf->getY();
                        // creamos las lineas verticales
                        $pdf->Line(15,85,15,265);
                        $pdf->Line(40,85,40,265);
                        $pdf->Line(90,85,90,265);
                        $pdf->Line(140,85,140,265);
                        $pdf->Line(165,85,165,265);
                        $pdf->Line(185,85,185,265);
                        $pdf->Line(205,85,205,265);                        
                    } 
                    // agregamos una pagina           
                    $pdf->AddPage();
                    // seteamos la coordenada Y
                    $yLine=10;
                } else {
                    // quedan registros o es el ultimo
                    $yLine=$pdf->getY()+5;  
                    if ($nItem>$nCantidadItems){
                        $pdf->Rect(5,85,200,$yLine-85);
                        $yFinalRectangulo=$pdf->getY();
                        // creamos las lineas verticales
                        $pdf->Line(15,85,15,$yLine);
                        $pdf->Line(40,85,40,$yLine);
                        $pdf->Line(90,85,90,$yLine);
                        $pdf->Line(140,85,140,$yLine);
                        $pdf->Line(165,85,165,$yLine);
                        $pdf->Line(185,85,185,$yLine);
                        $pdf->Line(205,85,205,$yLine);

                    }
                } 
            }
            /*----- fin área de detalles -----------------*/
            // imprimimos la informacion de los totales
            $yNLine=$pdf->getY()+5;
            $yLine+=5;
            $pdf->setY($yLine);
            $pdf->setX(140);
            $cadena="Sub-Total:";
            $wStr=$pdf->GetStringWidth($cadena);
            $pdf->Cell($wStr,3,$cadena,0,0,"L");

            $pdf->setY($yLine);
            $pdf->setX(185);
            $cadena=number_format(floatval($TotalBrutoFactura),2,".","");
            $wStr=$pdf->GetStringWidth($cadena);
            $pdf->Cell(20,3,$cadena,0,0,"R");

            $yLine+=5;
            $pdf->setY($yLine);
            $pdf->setX(140);
            $cadena="% Desc:";
            $wStr=$pdf->GetStringWidth($cadena);
            $pdf->Cell($wStr,3,$cadena,0,0,"L");  

            $pdf->setY($yLine);
            $pdf->setX(150);
            $cadena=number_format(floatval($porDesGeneral),2,".","")." %";
            $wStr=$pdf->GetStringWidth($cadena);
            $pdf->Cell(20,3,$cadena,0,0,"R");  
            
            $DescuentoGlobal=(floatval($TotalBrutoFactura)*floatval($porDesGeneral)/100);
            //var_dump("<pre>Descuento ",$DescuentoGlobal,"</pre>");
            $pdf->setY($yLine);
            $pdf->setX(185);
            $cadena=number_format(floatval($DescuentoGlobal),2,".","");
            $wStr=$pdf->GetStringWidth($cadena);
            $pdf->Cell(20,3,$cadena,0,0,"R");                               
   
            $yLine+=5;
            $pdf->setY($yLine);
            $pdf->setX(140);
            $cadena="I.V.A.:";
            $wStr=$pdf->GetStringWidth($cadena);
            $pdf->Cell($wStr,3,$cadena,0,0,"L");  

            $pdf->setY($yLine);
            $pdf->setX(150);
            $cadena="16.00 %";
            $wStr=$pdf->GetStringWidth($cadena);
            $pdf->Cell(20,3,$cadena,0,0,"R"); 
            
            $TotalIva=(floatval($TotalBrutoFactura)-floatval($DescuentoGlobal))*16/100;
            //var_dump("<pre>Iva ",$TotalIva,"</pre>");
            $pdf->setY($yLine);
            $pdf->setX(185);
            $cadena=number_format(floatval($TotalIva),2,".","");
            $wStr=$pdf->GetStringWidth($cadena);
            $pdf->Cell(20,3,$cadena,0,0,"R");                            


            $yLine+=5;
            $pdf->setY($yLine);
            $pdf->setX(140);
            $pdf->SetFont("Arial","B",8);
            $cadena="Total:";
            $wStr=$pdf->GetStringWidth($cadena);
            $pdf->Cell($wStr,3,$cadena,0,0,"L");  

            $TotalFactura=floatval($TotalBrutoFactura)-floatval($DescuentoGlobal)+floatval($TotalIva);
            //dd ($TotalFactura);
            $pdf->setY($yLine);
            $pdf->setX(185);
            $cadena=number_format(floatval($TotalFactura),2,".","");
            $wStr=$pdf->GetStringWidth($cadena);
            $pdf->Cell(20,3,$cadena,0,0,"R"); 
            
            // creamos el rectangulo de los totales
            $pdf->Rect(140,$yNLine,65,25);
            $nYNewRect=$pdf->getY();
            $yNLine+=4;
            $pdf->Line(140,$yNLine,205,$yNLine);
            $yNLine+=5;
            $pdf->Line(140,$yNLine,205,$yNLine);
            $yNLine+=5;
            $pdf->Line(140,$yNLine,205,$yNLine);
            $yNLine+=5;
            $pdf->Line(140,$yNLine,205,$yNLine);

            /*--- generacion del documento de salida -----*/
            // 3. Generar la salida del PDF (importante: el método Output() devuelve el contenido)
            /*
            I: envía el fichero al navegador de forma que se usa la extensión (plug in) si está disponible.
            D: envía el fichero al navegador y fuerza la descarga del fichero con el nombre especificado por name.
            F: guarda el fichero en un fichero local de nombre name.
            S: devuelve el documento como una cadena.
            */

            // verificamos is la carpeta existe
            $permisos = 0775;
            $rutaProyecto = $this->getParameter('kernel.project_dir');
            $rutaPdf=$rutaProyecto."/public/assets/cotizaciones_pdf/".trim($idCliente);
            
            if (!is_dir($rutaPdf)) {
                try {
                    // El tercer argumento 'true' crea directorios anidados si son necesarios
                    if (!mkdir($rutaPdf, $permisos, true)) {
                        throw new FileException('No se pudo crear el directorio.');
                    }
                    
                    // La carpeta ha sido creada con los permisos 0775
                    // Ahora es necesario cambiar el usuario y grupo

                } catch (FileException $e) {
                    // Manejar el error de creación (p. ej., si el usuario PHP no tiene permisos de escritura)
                    // Loggear o lanzar una excepción de aplicación
                    throw new \RuntimeException("Error al crear la carpeta: " . $e->getMessage());
                }
            }                        
            
            $nombreArchivo="assets/cotizaciones_pdf/".trim($cliente->getId())."/cotizacion_".trim($idCotizacion)."_".date("YmdH").".pdf";
            
            $pdf->Output('F', $nombreArchivo);


            // Es crucial que no haya más código HTML o headers después.
            // Como FPDF ya gestionó la salida, solo debes devolver una respuesta vacía o nula.
            $remitente="ventas@goitsolutions.org";
            $respuesta= ['valor'=>"1",'estado'=>'creado','archivo'=>$nombreArchivo,'remitente'=>$remitente,'destinatario'=>$emailCliente];
            return new JsonResponse ($respuesta) ; 
            //return new Response('', 200, ['Content-Type' => 'application/pdf']);        

            // Opcional: Para forzar la descarga en lugar de la visualización en el navegador:
            // $response->headers->set('Content-Disposition', 'attachment; filename="documento.pdf"');

            //return $response;
            /*------- fin del segmento de impresion -------*/


            return new JsonResponse ($respuesta) ; 
        }  catch (\Exception $e) {
                $respuesta=[
                    "valor" => "-3",
                    "mensaje"=>"Ocurrió un error inesperado paso:".$paso." descripción del error:".$e->getMessage(),
                ];            
            return new JsonResponse ($respuesta) ;
        }         
    } 
        

    /**
    * Esta funcion permite crear la cotizacion
    */    
    #[Route('/new', name: 'app_cotizacion_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $cotizacion = new Cotizacion();
        $form = $this->createForm(CotizacionType::class, $cotizacion);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($cotizacion);
            $entityManager->flush();

            return $this->redirectToRoute('app_cotizacion_index', [], Response::HTTP_SEE_OTHER);
        }

        $fontSize= $this->getParameter('fontSize');
        $iconsWidthSize=$this->getParameter('iconsWidthSize');
        $iconsHeightSize=$this->getParameter('iconsHeightSize');
        $sizeSeparador=$this->getParameter('sizeSeparador');
        $colorSeparator=$this->getParameter('colorSeparator');
        $appLogo=$this->getParameter('logo');  
        return $this->render('cotizacion/new.html.twig', [
            'cotizacion' => $cotizacion,
            'form' => $form,
            'logo'=>$appLogo,
        ]);
    }

    /**
    * Esta funcion permite mostrar la cotizacion
    */    
    #[Route('/{id}', name: 'app_cotizacion_show', methods: ['GET'])]
    public function show(
        Request $request, 
        ?Cotizacion $cotizacion, 
        CotizacionRepository $cotizacionRepository,
        DetalleCotizacionRepository $detalleCotizacionRepository,
        InventarioRepository $inventarioRepository 
        ): Response
    {
        $fontSize= $this->getParameter('fontSize');
        $iconsWidthSize=$this->getParameter('iconsWidthSize');
        $iconsHeightSize=$this->getParameter('iconsHeightSize');
        $sizeSeparador=$this->getParameter('sizeSeparador');
        $colorSeparator=$this->getParameter('colorSeparator');
        $appLogo=$this->getParameter('logo'); 
        
        // buscamos los detalles de la cotizacion
        $detallesCotizacion=$detalleCotizacionRepository->findBy(['cotizacion'=>$cotizacion]);

        // buscamos el cliente de la cotizacion
        $clienteCotizacion=$cotizacion->getCliente();

        // buscamos los detalles de la cotizacion
        $arregloTasas=$cotizacionRepository->searchTasaCotizacion($cotizacion->getId());

        $tasaEUR=$arregloTasas['taza1'];
        $tasaUSD=$arregloTasas['taza2'];

        // 1. Obtienes el objeto DateTime
        $fecha = $cotizacion->getFechaCreacion();

        // 2. Configuras el formateador para español
        $formateador = new \IntlDateFormatter(
            'es_ES', // Localización
            \IntlDateFormatter::FULL, // Estilo de fecha
            \IntlDateFormatter::NONE, // Estilo de hora
            'UTC', // Zona horaria (puedes usar la de tu app)
            \IntlDateFormatter::GREGORIAN,
            "EEEE, dd MMMM yyyy" // El patrón exacto que pides
        );

        // 3. Formateas y usas ucfirst para poner la primera en mayúscula
        $fechaCadena = ucfirst($formateador->format($fecha));        

        $tasas = ['USD' => $tasaUSD, 'EUR' => $tasaEUR, 'fecha' => $fechaCadena];


        // buscamos los materiales o servicios activos
        $materiales=$inventarioRepository->findBy(['estado'=>1]);    

        // buscamos los detalles de la cotizacion
        $idCotizacion=$cotizacion->getId();

        $detallesCotizacion=$detalleCotizacionRepository->findBy(['cotizacion'=>$idCotizacion]);
        

        // creamos un areglo para los detalles de cotizacion
        $arregloDetalles=[];
        foreach ($detallesCotizacion as $row){
            /*
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `cantidad` decimal(13,2) NOT NULL,
            `costo` decimal(13,2) NOT NULL,
            `precio` decimal(13,2) NOT NULL,
            `cliente_id` int(11) NOT NULL,
            `cotizacion_id` int(11) NOT NULL,
            `inventario_id` int(11) NOT NULL,
            `unidad_id` int(11) NOT NULL,
            `taza_aplicada` int(11) NOT NULL,
            `taza1` decimal(10,2) DEFAULT NULL,
            `taza2` decimal(10,2) DEFAULT NULL,
            `taza3` decimal(10,2) DEFAULT NULL,
            `factor` decimal(5,2) NOT NULL,
            `porcentaje_descuento` decimal(5,2) NOT NULL,
            `monto_descuento` decimal(10,2) NOT NULL,
            `orden` int(11) NOT NULL,
            */
            $cantidad=$row->getCantidad();
            $costo=$row->getCosto();
            $precio=$row->getPrecio();
            $cliente=$row->getCliente()->getNombre();
            $unidad_id=$row->getUnidad()->getSimbolo();
            $porcentajeDescuento=$row->getPorcentajeDescuento();
            $montoDescuento=$row->getMontoDescuento();
            $orden=$row->getOrden();
            $codigo=$row->getInventario()->getCodigo();
            $descripcion=$row->getInventario()->getNombre();
            $idmaterial=$row->getInventario()->getId();
            $factor=$row->getFactor();

            $sTotal=($precio*$cantidad)-($precio*$cantidad*$porcentajeDescuento/100);

            /*
            { 
                id: 1, 
                codigo: '', 
                descripcion: '', 
                cantidad: 0, 
                costo:0.00,
                precio:0.00,
                porcentaje:0.00,
                idmaterial:0,
                porcentajeDescuento:0.00,
                montoDescuento:0.00,
                subtotal: 0.00 
            }
            */
            // creamos la fila
            $elemento=[
                "id"=>$orden,
                "codigo"=>$codigo,
                "descripcion"=>$descripcion,
                "cantidad"=>$cantidad,
                "costo"=>$costo,
                "precio"=>$precio,
                "idmateiral"=>$idmaterial,
                "porcentaje"=>$factor,
                "porcentajeDescuento"=>$porcentajeDescuento,
                "montoDescuento"=>$montoDescuento,
                "subtotal"=>$sTotal
            ];
            // apilamos la fila
            array_push($arregloDetalles,$elemento);
        }


        // creamos un arreglo para la cotizacion
        /*
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `fecha_creacion` date NOT NULL,
        `fecha_actualizacion` date NOT NULL,
        `fecha_aprobacion` date NOT NULL,
        `estado` int(11) NOT NULL,
        `monto` decimal(13,2) NOT NULL,
        `por_descuento` decimal(5,2) NOT NULL,
        `monto_descuento` decimal(13,2) NOT NULL,
        `precio` decimal(13,2) NOT NULL,
        `cliente_id` int(11) NOT NULL,
        `usuario_id` int(11) NOT NULL,
        */
        $arregloCotizacion=[
            "id"=>$cotizacion->getId(),
            "fecha_creacion"=>$cotizacion->getFechaCreacion(),
            "fecha_actualizacion"=>$cotizacion->getFechaActualizacion(),
            "fecha_aprobcion"=>$cotizacion->getFechaAprobacion(),
            "estado"=>$cotizacion->getEstado(),
            "monto"=>$cotizacion->getMonto(),
            "por_descuento"=>$cotizacion->getPorDescuento(),
            "monto_descuento"=>$cotizacion->getMontoDescuento(),
            "precio"=>$cotizacion->getPrecio(),
            "nombre_cliente"=>$cotizacion->getCliente()->getNombre()
        ];


        return $this->render('cotizacion/show2.html.twig', [
            'cotizacion' => $arregloCotizacion,
            'logo'=>$appLogo,
            'cliente'=>$clienteCotizacion,
            'tasas'=>$tasas,
            'materiales'=>$materiales,
            'detallesCotizacion'=>$arregloDetalles
        ]);
    }

    /**
    * Esta funcion permite editar la cotizacion
    */    
    #[Route('/{id}/edit', name: 'app_cotizacion_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Cotizacion $cotizacion, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(CotizacionType::class, $cotizacion);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_cotizacion_index', [], Response::HTTP_SEE_OTHER);
        }
        $fontSize= $this->getParameter('fontSize');
        $iconsWidthSize=$this->getParameter('iconsWidthSize');
        $iconsHeightSize=$this->getParameter('iconsHeightSize');
        $sizeSeparador=$this->getParameter('sizeSeparador');
        $colorSeparator=$this->getParameter('colorSeparator');
        $appLogo=$this->getParameter('logo');  
        return $this->render('cotizacion/edit.html.twig', [
            'cotizacion' => $cotizacion,
            'form' => $form,
            'logo'=>$appLogo,
        ]);
    }

    /**
    * Esta funcion permite editar la cotizacion
    */    
    #[Route('/{id}/edit2', name: 'app_cotizacion_edit2', methods: ['GET'])]
    public function editCotizacion(
        Request $request, 
        ?Cotizacion $cotizacion, 
        CotizacionRepository $cotizacionRepository,
        DetalleCotizacionRepository $detalleCotizacionRepository,
        InventarioRepository $inventarioRepository,
        ClienteRepository $clienteRepository,
      ): Response
    {
        $fontSize= $this->getParameter('fontSize');
        $iconsWidthSize=$this->getParameter('iconsWidthSize');
        $iconsHeightSize=$this->getParameter('iconsHeightSize');
        $sizeSeparador=$this->getParameter('sizeSeparador');
        $colorSeparator=$this->getParameter('colorSeparator');
        $appLogo=$this->getParameter('logo'); 
        
        // buscamos los detalles de la cotizacion
        $detallesCotizacion=$detalleCotizacionRepository->findBy(['cotizacion'=>$cotizacion]);

        // buscamos el cliente de la cotizacion
        $clienteCotizacion=$cotizacion->getCliente();

        // buscamos los detalles de la cotizacion
        $arregloTasas=$cotizacionRepository->searchTasaCotizacion($cotizacion->getId());

        $tasaEUR=$arregloTasas['taza1'];
        $tasaUSD=$arregloTasas['taza2'];

        // 1. Obtienes el objeto DateTime
        $fecha = $cotizacion->getFechaCreacion();

        // 2. Configuras el formateador para español
        $formateador = new \IntlDateFormatter(
            'es_ES', // Localización
            \IntlDateFormatter::FULL, // Estilo de fecha
            \IntlDateFormatter::NONE, // Estilo de hora
            'UTC', // Zona horaria (puedes usar la de tu app)
            \IntlDateFormatter::GREGORIAN,
            "EEEE, dd MMMM yyyy" // El patrón exacto que pides
        );

        // 3. Formateas y usas ucfirst para poner la primera en mayúscula
        $fechaCadena = ucfirst($formateador->format($fecha));        

        $tasas = ['USD' => $tasaUSD, 'EUR' => $tasaEUR, 'fecha' => $fechaCadena];


        // buscamos los clientes
        $clientes=$clienteRepository->findAll();

        // buscamos los materiales o servicios activos
        $materiales=$inventarioRepository->findBy(['estado'=>1]);    

        // buscamos los detalles de la cotizacion
        $idCotizacion=$cotizacion->getId();
        $detallesCotizacion=$detalleCotizacionRepository->findBy(['cotizacion'=>$idCotizacion]);

        // creamos un areglo para los detalles de cotizacion
        $arregloDetalles=[];
        foreach ($detallesCotizacion as $row){
            /*
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `cantidad` decimal(13,2) NOT NULL,
            `costo` decimal(13,2) NOT NULL,
            `precio` decimal(13,2) NOT NULL,
            `cliente_id` int(11) NOT NULL,
            `cotizacion_id` int(11) NOT NULL,
            `inventario_id` int(11) NOT NULL,
            `unidad_id` int(11) NOT NULL,
            `taza_aplicada` int(11) NOT NULL,
            `taza1` decimal(10,2) DEFAULT NULL,
            `taza2` decimal(10,2) DEFAULT NULL,
            `taza3` decimal(10,2) DEFAULT NULL,
            `factor` decimal(5,2) NOT NULL,
            `porcentaje_descuento` decimal(5,2) NOT NULL,
            `monto_descuento` decimal(10,2) NOT NULL,
            `orden` int(11) NOT NULL,
            */
            $cantidad=$row->getCantidad();
            $costo=$row->getCosto();
            $precio=$row->getPrecio();
            $cliente=$row->getCliente()->getNombre();
            $unidad_id=$row->getUnidad()->getSimbolo();
            $porcentajeDescuento=$row->getPorcentajeDescuento();
            $montoDescuento=$row->getMontoDescuento();
            $orden=$row->getOrden();
            $codigo=$row->getInventario()->getCodigo();
            $descripcion=$row->getInventario()->getNombre();
            $idmaterial=$row->getInventario()->getId();
            $factor=$row->getFactor();

            $sTotal=($precio*$cantidad)-($precio*$cantidad*$porcentajeDescuento/100);

            /*
            { 
                id: 1, 
                codigo: '', 
                descripcion: '', 
                cantidad: 0, 
                costo:0.00,
                precio:0.00,
                porcentaje:0.00,
                idmaterial:0,
                porcentajeDescuento:0.00,
                montoDescuento:0.00,
                subtotal: 0.00 
            }
            */
            // creamos la fila
            $elemento=[
                "id"=>$orden,
                "codigo"=>$codigo,
                "descripcion"=>$descripcion,
                "cantidad"=>$cantidad,
                "costo"=>$costo,
                "precio"=>$precio,
                "idmaterial"=>$idmaterial,
                "porcentaje"=>$factor,
                "porcentajeDescuento"=>$porcentajeDescuento,
                "montoDescuento"=>$montoDescuento,
                "subtotal"=>$sTotal
            ];
            // apilamos la fila
            array_push($arregloDetalles,$elemento);
        }


        // creamos un arreglo para la cotizacion
        /*
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `fecha_creacion` date NOT NULL,
        `fecha_actualizacion` date NOT NULL,
        `fecha_aprobacion` date NOT NULL,
        `estado` int(11) NOT NULL,
        `monto` decimal(13,2) NOT NULL,
        `por_descuento` decimal(5,2) NOT NULL,
        `monto_descuento` decimal(13,2) NOT NULL,
        `precio` decimal(13,2) NOT NULL,
        `cliente_id` int(11) NOT NULL,
        `usuario_id` int(11) NOT NULL,
        */
        $arregloCotizacion=[
            "id"=>$cotizacion->getId(),
            "fecha_creacion"=>$cotizacion->getFechaCreacion(),
            "fecha_actualizacion"=>$cotizacion->getFechaActualizacion(),
            "fecha_aprobcion"=>$cotizacion->getFechaAprobacion(),
            "estado"=>$cotizacion->getEstado(),
            "monto"=>$cotizacion->getMonto(),
            "por_descuento"=>$cotizacion->getPorDescuento(),
            "monto_descuento"=>$cotizacion->getMontoDescuento(),
            "precio"=>$cotizacion->getPrecio(),
            "nombre_cliente"=>$cotizacion->getCliente()->getNombre()
        ];


        return $this->render('cotizacion/edit2.html.twig', [
            'cotizacion' => $arregloCotizacion,
            'logo'=>$appLogo,
            'clienteCotizacion'=>$clienteCotizacion,
            'clientes'=>$clientes,
            'tasas'=>$tasas,
            'materiales'=>$materiales,
            'detallesCotizacion'=>$arregloDetalles
        ]);
    }    

    /**
    * Esta funcion permite eliminar la cotizacion
    */    
    #[Route('/{id}', name: 'app_cotizacion_delete', methods: ['POST'])]
    public function delete(Request $request, Cotizacion $cotizacion, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$cotizacion->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($cotizacion);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_cotizacion_index', [], Response::HTTP_SEE_OTHER);
    }


    /* 
    Esta funcion permite enviar la cotizacion por correo 
    */
    #[Route('/{id}/app_cotizacion_send', name: 'app_cotizacion_send', methods: ['GET'])]
    public function sendCotizacion(
        Request $request,
        InventarioRepository $inventarioRepository,
        CotizacionRepository $cotizacionRepository,
        DetalleCotizacionRepository $detalleCotizacionRepository,
        ClienteRepository $clienteRepository,
         EntityManagerInterface $entityManager,
        ): Response
    {
        try {
            $paso=1;

            $respuesta=[
                'valor'=>'1',
                'mensaje'=>'Se envió la cotización con exito'
            ];
            $paso=141;
            return new JsonResponse ($respuesta);
        }  catch (\Exception $e) {
                $respuesta=[
                    "valor" => "-3",
                    "mensaje"=>"Ocurrió un error inesperado paso:".$paso." descripción del error:".$e->getMessage(),
                ];            
            return new JsonResponse ($respuesta) ;
        }         
    }    
 

    /*
    Esta funcion permite duplicar una cotizacion
    */   
    #[Route('/{id}/app_cotizacion_copy', name: 'app_cotizacion_copy', methods: ['GET'])]
    public function copyCotizacion(
        Request $request,
        InventarioRepository $inventarioRepository,
        CotizacionRepository $cotizacionRepository,
        DetalleCotizacionRepository $detalleCotizacionRepository,
        ClienteRepository $clienteRepository,
         EntityManagerInterface $entityManager,
        ): Response
    {
        try {
            $paso=1;

            $respuesta=[
                'valor'=>'1',
                'mensaje'=>'Se envió la cotización con exito'
            ];
            $paso=141;
            return new JsonResponse ($respuesta);
        }  catch (\Exception $e) {
                $respuesta=[
                    "valor" => "-3",
                    "mensaje"=>"Ocurrió un error inesperado paso:".$paso." descripción del error:".$e->getMessage(),
                ];            
            return new JsonResponse ($respuesta) ;
        }         
    }      
    
}
