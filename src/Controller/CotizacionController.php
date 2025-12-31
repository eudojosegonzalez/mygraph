<?php

namespace App\Controller;

use App\Entity\Cotizacion;
use App\Form\CotizacionType;
use App\Repository\ClienteRepository;
use App\Repository\CotizacionRepository;
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
