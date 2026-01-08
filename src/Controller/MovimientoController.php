<?php

namespace App\Controller;

use App\Entity\Movimiento;
use App\Entity\Inventario;
use App\Entity\Unidad;
use App\Entity\Proyecto;
use App\Form\MovimientoType;
use App\Repository\MovimientoRepository;
use App\Repository\InventarioRepository;
use App\Repository\UnidadRepository;
use App\Repository\ProyectoRepository;

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
use Exception;


use DateTime;
use DateTimeInterface;

#[IsGranted("ROLE_ADMIN")]
#[Route('/movimiento')]
final class MovimientoController extends AbstractController
{
    #[Route(name: 'app_movimiento_index', methods: ['GET'])]
    public function index(
        Request $request,
        PaginatorInterface $paginator,
        MovimientoRepository $movimientoRepository): Response
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
            $registros=$movimientoRepository->findAll();
        } else{
            // 1. Iniciar un QueryBuilder
            $registros = $movimientoRepository->createQueryBuilder('m') // 'c' es el alias para Cotizacion
            ->innerJoin('m.inventario', 'i')    // Unimos con la propiedad 'cliente' de la entidad Cotización
            ->where('i.nombre LIKE :val or i.modelo LIKE :val')    // Filtramos por el nombre del cliente
            ->setParameter('val', '%' . $searchInput . '%') // El comodín % permite buscar coincidencias parciales
            ->orderBy('m.id', 'ASC')         // Opcional: ordenar por las más recientes
            ->getQuery()
            ->getResult();
        }        

        $movimientos = $paginator->paginate(
            $registros, // Objeto de la consulta a paginar
            $page, // Número de página actual
            $limit // Cantidad de elementos por página
        );  


        return $this->render('movimiento/index.html.twig', [
            'movimientos' => $movimientos,
            'logo'=>$appLogo
        ]);
    }

    #[Route('/new', name: 'app_movimiento_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $movimiento = new Movimiento();
        $form = $this->createForm(MovimientoType::class, $movimiento);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($movimiento);
            $entityManager->flush();

            return $this->redirectToRoute('app_movimiento_index', [], Response::HTTP_SEE_OTHER);
        }

        $fontSize= $this->getParameter('fontSize');
        $iconsWidthSize=$this->getParameter('iconsWidthSize');
        $iconsHeightSize=$this->getParameter('iconsHeightSize');
        $sizeSeparador=$this->getParameter('sizeSeparador');
        $colorSeparator=$this->getParameter('colorSeparator');
        $appLogo=$this->getParameter('logo');              
        
        // buscamos los materiales 
        return $this->render('movimiento/new.html.twig', [
            'movimiento' => $movimiento,
            'form' => $form,
            'logo'=>$appLogo
        ]);
    }


    #[Route('/crear_movimiento', name: 'app_crear_movimento', methods: ['GET'])]
    public function createMovimiento(
        Request $request, 
        InventarioRepository $inventarioRepository,
        UnidadRepository $unidadRepository,
        ProyectoRepository $proyectoRepository,
        EntityManagerInterface $entityManager): Response
    {

        $fontSize= $this->getParameter('fontSize');
        $iconsWidthSize=$this->getParameter('iconsWidthSize');
        $iconsHeightSize=$this->getParameter('iconsHeightSize');
        $sizeSeparador=$this->getParameter('sizeSeparador');
        $colorSeparator=$this->getParameter('colorSeparator');
        $appLogo=$this->getParameter('logo');              
        
        // buscamos los materiales 
        $materiales=$inventarioRepository->findBy(['estado'=>1]);

        // buscamos las unidades
        $unidades=$unidadRepository->findBy(['estado'=>1]);

        // buscamos los proyectos activos
        $proyectos=$proyectoRepository->findBy(['estado'=>1]);

        return $this->render('movimiento/new2.html.twig', [
            'logo'=>$appLogo,
            'materiales'=>$materiales,
            'unidades'=>$unidades,
            'proyectos'=>$proyectos
        ]);
    }

     

    #[Route('/{id}', name: 'app_movimiento_show', methods: ['GET'])]
    public function show(Movimiento $movimiento): Response
    {
        $fontSize= $this->getParameter('fontSize');
        $iconsWidthSize=$this->getParameter('iconsWidthSize');
        $iconsHeightSize=$this->getParameter('iconsHeightSize');
        $sizeSeparador=$this->getParameter('sizeSeparador');
        $colorSeparator=$this->getParameter('colorSeparator');
        $appLogo=$this->getParameter('logo');        
        return $this->render('movimiento/show.html.twig', [
            'movimiento' => $movimiento,
            'logo'=>$appLogo
        ]);
    }


    #[Route('/{id}/edit', name: 'app_movimiento_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Movimiento $movimiento, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(MovimientoType::class, $movimiento);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_movimiento_index', [], Response::HTTP_SEE_OTHER);
        }

        $fontSize= $this->getParameter('fontSize');
        $iconsWidthSize=$this->getParameter('iconsWidthSize');
        $iconsHeightSize=$this->getParameter('iconsHeightSize');
        $sizeSeparador=$this->getParameter('sizeSeparador');
        $colorSeparator=$this->getParameter('colorSeparator');
        $appLogo=$this->getParameter('logo');                
        return $this->render('movimiento/edit.html.twig', [
            'movimiento' => $movimiento,
            'form' => $form,
            'logo'=>$appLogo
        ]);
    }

    #[Route('/{id}', name: 'app_movimiento_delete', methods: ['POST'])]
    public function delete(Request $request, Movimiento $movimiento, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$movimiento->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($movimiento);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_movimiento_index', [], Response::HTTP_SEE_OTHER);
    }



    /*
    Esta ruta permite grabar los movimientos de materia prima
    si es para aumentar se guarda una referencia que representa una factura o nota de entrega de materiales
    si es para disminuir se asume que idproyecto es el proyecto donde se va a utilizar el material
    */    
    #[Route('/salvar_movimiento/', name: 'app_salvar_movimento', methods: ['POST'])]
    public function saveMovimiento(
        Request $request, 
        InventarioRepository $inventarioRepository,
        ProyectoRepository $proyectoRepository,
        MovimientoRepository $movimientoRepository,
        ManagerRegistry $doctrine): Response
    {

        $user=$this->getuser();
        $params = $request->request->all();

        /*
        tipo:tipoV,
        cantidad:catidadV,
        idProyecto:idProyectoV,
        documento:dicumentoV,
        idMaterial:idMaterialV
        */

        $tipo=intval($params['tipo']);
        $cantidad=floatval($params['cantidad']);
        $idProyecto=intval($params['idProyecto']);
        $documento=$params['documento'];
        $idMaterial=intval($params['idMaterial']);
        $observacion=trim($params['observacion']);

        try {
            // verificamos si movimiento es para reducir materia prima
            if ($tipo==2){
                // verificamos que exista un id de proyecto
                if  ($idProyecto !=0){
                    // buscamos el proyecto
                    $proyecto=$proyectoRepository->find($idProyecto);
                }
            }

            // busamos el material
            $material=$inventarioRepository->find($idMaterial);

            // validamos que se pueda hacer laoperacion desade el punto de vista de inventario
            $sePuede=false;
            $saldoInicial=$material->getExistencia();
            $saldoFinal=0.00;
            if ($tipo==1){
                $saldoFinal=$saldoInicial+$cantidad;
                $sePuede=true;
            }  else {
                $saldoFinal=$saldoInicial-$cantidad;
                if ($saldoFinal>=0){
                    $sePuede=true;
                } else {
                    $sePuede=false;
                }
            
            }

            if ($sePuede){
                /*
                estructura de la tabla movimiento
                id	int(11) AI PK
                tipo	int(11)
                cantidad	decimal(13,2)
                inicial	decimal(13,2)
                final	decimal(13,2)
                proyecto	int(11)
                documento	varchar(50)
                estado	int(11)
                fecha_act	datetime
                inventario_id	int(11)
                unidad_id	int(11)
                usuario_id	int(11)
                observacion	longtext     
                */
                // creamos el nuevo registro 
                $newMovimiento = new Movimiento();

                $fecha=new DateTime();

                $newMovimiento->setTipo($tipo);
                $newMovimiento->setCantidad($cantidad);
                $newMovimiento->setInicial($saldoInicial);
                $newMovimiento->setFinal($saldoFinal);
                $newMovimiento->setProyecto($idProyecto);
                $newMovimiento->setDocumento($documento);
                $newMovimiento->setEstado(1);
                $newMovimiento->setFechaAct($fecha);
                $newMovimiento->setInventario($material);
                $newMovimiento->setUnidad($material->getUnidad());
                $newMovimiento->setUsuario($user);
                $newMovimiento->setObservacion($observacion);

                $entityManager = $doctrine->getManager();
                $entityManager->persist($newMovimiento);
                $entityManager->flush();  
                
                // actualizamos la existencia
                if ($newMovimiento){
                    $material->setExistencia($saldoFinal);
                    $material->setFechaAct($fecha); 

                    $entityManager = $doctrine->getManager();
                    $entityManager->persist($material);
                    $entityManager->flush();       
                    $respuesta= ['valor'=>"1",'mensaje'=>'Se insertó el movimiento con exito'];
                    
                }

                return new JsonResponse ($respuesta) ;
                // validamos si se obtuvieron datos 
                /*
                if (count($arregloPrecio)> 0){
                    $precio=$arregloPrecio[0]['PREC_VTA1'];
                    $respuesta= ['valor'=>"1",'precio'=>$precio,"query"=>$query];
                }  else {
                    $precio=0.00;
                    $respuesta= ['valor'=>"-1",'precio'=>$precio,"query"=>$query];                
                }*/            

            } else {
                $respuesta= ['valor'=>"-1",'mensaje'=>'No posee material suficiente en inventario para registrar el movimiento'];
            }

            return new JsonResponse ($respuesta) ;
        } catch (\Exception $e) {
            // Manejo del error
            $respuesta= ['valor'=>"-3",'mensaje'=>"Ocurrió un error que no pudo ser controlado ".$e->getMessage()];
            return new JsonResponse ($respuesta) ;
        }


    }   

    /*
    Esta funcion  permite cargar un movimiento de inventario para la actualización
    solo es posible actuaizar el estado y la observacion
    los demas datos no serán modificados
    */
    #[Route('/{id}/editar_movimiento', name: 'app_editar_movimento', methods: ['GET'])]
    public function editarMovimiento(
        Request $request, 
        InventarioRepository $inventarioRepository,
        UnidadRepository $unidadRepository,
        ProyectoRepository $proyectoRepository,
        MovimientoRepository $movimientoRepository,
        ?Movimiento $movimiento,
        EntityManagerInterface $entityManager): Response
    {

        try{
            $fontSize= $this->getParameter('fontSize');
            $iconsWidthSize=$this->getParameter('iconsWidthSize');
            $iconsHeightSize=$this->getParameter('iconsHeightSize');
            $sizeSeparador=$this->getParameter('sizeSeparador');
            $colorSeparator=$this->getParameter('colorSeparator');
            $appLogo=$this->getParameter('logo');              
            
            // buscamos los materiales 
            $materiales=$inventarioRepository->findBy(['estado'=>1]);

            // buscamos las unidades
            $unidades=$unidadRepository->findBy(['estado'=>1]);

            // buscamos los proyectos activos
            $proyectos=$proyectoRepository->findBy(['estado'=>1]);

            /*$idMovimiento=intval($request->query->get('id'));

            $movimiento=$movimientoRepository->find($idMovimiento);*/

            if ($movimiento){ 
                return $this->render('movimiento/edit2.html.twig', [
                    'logo'=>$appLogo,
                    'materiales'=>$materiales,
                    'unidades'=>$unidades,
                    'proyectos'=>$proyectos,
                    'movimiento'=>$movimiento
                ]);
            } else {
                $this->addFlash('error', 'Este movimiento no existe ');
                return $this->render('movimiento/not_found.html.twig', [
                    'logo'=>$appLogo
                ]);                
            }
        } catch (Exception $e) {
            $this->addFlash('error', 'Ocurrio un error que no pudo ser controlado '.$e->getMessage());
            return $this->render('movimiento/not_found.html.twig', [
                'logo'=>$appLogo,
                'movimiento'=>null
            ]);
        }
    }    


   /*
    Esta ruta permite grabar los movimientos de materia prima
    si es para aumentar se guarda una referencia que representa una factura o nota de entrega de materiales
    si es para disminuir se asume que idproyecto es el proyecto donde se va a utilizar el material
    */    
    #[Route('/actualizar_movimiento/', name: 'app_actualizar_movimento', methods: ['POST'])]
    public function updateMovimiento(
        Request $request, 
        InventarioRepository $inventarioRepository,
        ProyectoRepository $proyectoRepository,
        MovimientoRepository $movimientoRepository,
        ManagerRegistry $doctrine): Response
    {

        $user=$this->getuser();
        $params = $request->request->all();

        /*
        tipo:tipoV,
        cantidad:catidadV,
        idProyecto:idProyectoV,
        documento:dicumentoV,
        idMaterial:idMaterialV
        */

        $id=intval($params['idMovimiento']);
        $estado=intval($params['estado']);
        $observacion=($params['observacion']);


        try {
            // buscamos el movimiento
            $movimiento=$movimientoRepository->find($id);

            if ($movimiento){
                $fecha=new DateTime();
                // movimiento encontrado
                // determinamos el monto
                $cantidad=$movimiento->getCantidad();
                // determinamos el tipo
                $tipo=$movimiento->getTipo();
                // determinamos el material
                $inventario=$movimiento->getInventario();
                // determinamos el estado del movimiento
                $estadoMovimiento=$movimiento->getEstado();

                // determinamos la cantidad inicial
                $inicial=$inventario->getExistencia();

                // reversamos en el material al cantidad segun sea el tipo
                // si es de adicion restamos
                // si es de resta adicionamos

                if ($estado!=$estadoMovimiento) {
                    if ($estadoMovimiento == 1){
                        //esta activo
                        if ($tipo==1){
                            // es un ingreso restamos
                            $final=$inicial-$cantidad;
                        } else {
                            // es un egreso sumamos
                            $final=$inicial+$cantidad;
                        }                        
                    } else {
                        // esta inactivo y lo vamos a activar
                        if ($tipo==1){
                            // es un ingreso restamos
                            $final=$inicial+$cantidad;
                        } else {
                            // es un egreso
                            $final=$inicial-$cantidad;
                        }
                    }
                    // verificamos que el resultado sea valido
                    if ($final >=0){
                        // actualizamos el inventario del material
                        $inventario->setExistencia($final);
                        $inventario->setFechaAct($fecha);

                        $entityManager = $doctrine->getManager();
                        $entityManager->persist($inventario);
                        $entityManager->flush();  

                        // actualizamos el estado del movimiento     
                        $movimiento->setEstado($estado);
                        $movimiento->setFechaAct($fecha);
                        $movimiento->setUsuario($user);
                        $movimiento->setObservacion($observacion);

                        $entityManager = $doctrine->getManager();
                        $entityManager->persist($movimiento);
                        $entityManager->flush();                          
                        
                        $respuesta= ['valor'=>"1",'mensaje'=>'Movimiento actualizado con éxito'];
                    } else {
                        $respuesta= ['valor'=>"-1",'mensaje'=>'No posee material suficiente en inventario para registrar el movimiento'];
                    }   
                } else {
                    $respuesta= ['valor'=>"-2",'mensaje'=>'No se está cambiando el estado del movimiento, operación no valida'];
                }

            } else {
                $respuesta= ['valor'=>"-2",'mensaje'=>'Este movimiento no existe'];
            }

            return new JsonResponse ($respuesta) ;
        } catch (\Exception $e) {
            // Manejo del error
            $respuesta= ['valor'=>"-3",'mensaje'=>"Ocurrió un error que no pudo ser controlado ".$e->getMessage()];
            return new JsonResponse ($respuesta) ;
        }


    }       
 
}
