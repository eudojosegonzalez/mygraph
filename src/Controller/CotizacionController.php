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

#[IsGranted("ROLE_ADMIN")]
#[Route('/cotizacion')]
final class CotizacionController extends AbstractController
{
    #[Route(name: 'app_cotizacion_index', methods: ['GET'])]
    public function index(CotizacionRepository $cotizacionRepository): Response
    {
        $fontSize= $this->getParameter('fontSize');
        $iconsWidthSize=$this->getParameter('iconsWidthSize');
        $iconsHeightSize=$this->getParameter('iconsHeightSize');
        $sizeSeparador=$this->getParameter('sizeSeparador');
        $colorSeparator=$this->getParameter('colorSeparator');
        $appLogo=$this->getParameter('logo');         
        return $this->render('cotizacion/index.html.twig', [
            'cotizacions' => $cotizacionRepository->findAll(),
            'logo'=>$appLogo,
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
           // $tasas = $bcvService->getTasas();
           $tasas=[
            'EUR'=>400.00,
            'USD'=>300.00,
            'fecha'=>'2025-12-31'
           ];
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
                        $entityManager->persist($newDetalleCotizacion);
                        $paso=88;
                        $entityManager->flush();
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

    #[Route('/{id}', name: 'app_cotizacion_show', methods: ['GET'])]
    public function show(Cotizacion $cotizacion): Response
    {
        $fontSize= $this->getParameter('fontSize');
        $iconsWidthSize=$this->getParameter('iconsWidthSize');
        $iconsHeightSize=$this->getParameter('iconsHeightSize');
        $sizeSeparador=$this->getParameter('sizeSeparador');
        $colorSeparator=$this->getParameter('colorSeparator');
        $appLogo=$this->getParameter('logo');          
        return $this->render('cotizacion/show.html.twig', [
            'cotizacion' => $cotizacion,
            'logo'=>$appLogo,
        ]);
    }

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

    #[Route('/{id}', name: 'app_cotizacion_delete', methods: ['POST'])]
    public function delete(Request $request, Cotizacion $cotizacion, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$cotizacion->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($cotizacion);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_cotizacion_index', [], Response::HTTP_SEE_OTHER);
    }

    
}
