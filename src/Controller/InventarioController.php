<?php

namespace App\Controller;

use App\Entity\Inventario;
use App\Form\InventarioType;
use App\Repository\InventarioRepository;
use App\Repository\MovimientoRepository;
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


#[IsGranted("ROLE_ADMIN")]
#[Route('/inventario')]
final class InventarioController extends AbstractController
{
    #[Route(name: 'app_inventario_index', methods: ['GET'])]
    public function index(
        InventarioRepository $inventarioRepository,
        PaginatorInterface $paginator,
        Request $request,
        ): Response
    {
        $fontSize= $this->getParameter('fontSize');
        $iconsWidthSize=$this->getParameter('iconsWidthSize');
        $iconsHeightSize=$this->getParameter('iconsHeightSize');
        $sizeSeparador=$this->getParameter('sizeSeparador');
        $colorSeparator=$this->getParameter('colorSeparator');
        $appLogo=$this->getParameter('logo');    
        
        $page=$request->query->getInt('page', 1);
        $limit=$request->query->getInt('limit', 10);

        $searchInput=$request->query->get('searchInput', "");

        if ($searchInput==""){
            // buscamos la cotizaciones 
            $registros=$inventarioRepository->findAll();
        } else{
            // 1. Iniciar un QueryBuilder
            $registros = $inventarioRepository->createQueryBuilder('i') // 'c' es el alias para Cotizacion
            ->where('i.nombre LIKE :val or i.modelo like :val')    // Filtramos por el nombre del cliente
            ->setParameter('val', '%' . $searchInput . '%') // El comodín % permite buscar coincidencias parciales
            ->orderBy('i.id', 'ASC')         // Opcional: ordenar por las más recientes
            ->getQuery()
            ->getResult();
        }  

        $inventario = $paginator->paginate(
            $registros, // Objeto de la consulta a paginar
            $page, // Número de página actual
            $limit // Cantidad de elementos por página
        );         

        return $this->render('inventario/index.html.twig', [
            'inventarios' => $inventario,
            'logo'=>$appLogo,
            'searchInput'=>$searchInput,            
        ]);
    }

    #[Route('/new', name: 'app_inventario_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $inventario = new Inventario();
        $form = $this->createForm(InventarioType::class, $inventario);
        $form->handleRequest($request);
        $fontSize= $this->getParameter('fontSize');
        $iconsWidthSize=$this->getParameter('iconsWidthSize');
        $iconsHeightSize=$this->getParameter('iconsHeightSize');
        $sizeSeparador=$this->getParameter('sizeSeparador');
        $colorSeparator=$this->getParameter('colorSeparator');
        $appLogo=$this->getParameter('logo');           

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($inventario);
            $entityManager->flush();

            return $this->redirectToRoute('app_inventario_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('inventario/new.html.twig', [
            'inventario' => $inventario,
            'form' => $form,
            'logo'=>$appLogo,
        ]);
    }

    #[Route('/{id}', name: 'app_inventario_show', methods: ['GET'])]
    public function show(Inventario $inventario): Response
    {
        $fontSize= $this->getParameter('fontSize');
        $iconsWidthSize=$this->getParameter('iconsWidthSize');
        $iconsHeightSize=$this->getParameter('iconsHeightSize');
        $sizeSeparador=$this->getParameter('sizeSeparador');
        $colorSeparator=$this->getParameter('colorSeparator');
        $appLogo=$this->getParameter('logo');           
        return $this->render('inventario/show.html.twig', [
            'inventario' => $inventario,
            'logo'=>$appLogo,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_inventario_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Inventario $inventario, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(InventarioType::class, $inventario);
        $form->handleRequest($request);
        $fontSize= $this->getParameter('fontSize');
        $iconsWidthSize=$this->getParameter('iconsWidthSize');
        $iconsHeightSize=$this->getParameter('iconsHeightSize');
        $sizeSeparador=$this->getParameter('sizeSeparador');
        $colorSeparator=$this->getParameter('colorSeparator');
        $appLogo=$this->getParameter('logo');           

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_inventario_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('inventario/edit.html.twig', [
            'inventario' => $inventario,
            'form' => $form,
            'logo'=>$appLogo,
        ]);
    }

    #[Route('/{id}', name: 'app_inventario_delete', methods: ['POST'])]
    public function delete(Request $request, Inventario $inventario, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$inventario->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($inventario);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_inventario_index', [], Response::HTTP_SEE_OTHER);
    }


    /* esta funcion permite mostrar los movimientos de los materiales */
    #[Route('/{id}/show_movimiento_materiales', name: 'app_show_movimiento_materiales', methods: ['GET'])]
    public function showMovimientoMateriales(
        ?Inventario $inventario,
        MovimientoRepository $movimientoRepository
        ): Response
    {
        try {
            $fontSize= $this->getParameter('fontSize');
            $iconsWidthSize=$this->getParameter('iconsWidthSize');
            $iconsHeightSize=$this->getParameter('iconsHeightSize');
            $sizeSeparador=$this->getParameter('sizeSeparador');
            $colorSeparator=$this->getParameter('colorSeparator');
            $appLogo=$this->getParameter('logo');     
            
            $idInventario=$inventario->getId();

            // buscamos los movimientos del inventario
            $movimientos=$movimientoRepository->findBy(['inventario'=>$idInventario],['fecha_act' => 'DESC']);

            if ($movimientos){
                return $this->render('inventario/show_movimientos_materiales.html.twig', [
                    'inventario' => $inventario,
                    'logo'=>$appLogo,
                    'movimientos'=>$movimientos
                ]);
            } else {
                $this->addFlash('error', 'No se han encontrado movimientos para este Material');
                return $this->render('inventario/not_found_moves.html.twig', [
                    'logo'=>$appLogo
                ]);            
            }  
        } catch (Exception $e) {
            // Manejo del error
            $this->addFlash('error', 'Ocurrió unn error que no pudo ser controlado '.$e->getMessage());
            return $this->render('inventario/not_found_moves.html.twig', [
                'logo'=>$appLogo
            ]); 
        }
   

    }    
}
