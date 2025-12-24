<?php

namespace App\Controller;

use App\Entity\Movimiento;
use App\Form\MovimientoType;
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

#[IsGranted("ROLE_ADMIN")]
#[Route('/movimiento')]
final class MovimientoController extends AbstractController
{
    #[Route(name: 'app_movimiento_index', methods: ['GET'])]
    public function index(MovimientoRepository $movimientoRepository): Response
    {
        $fontSize= $this->getParameter('fontSize');
        $iconsWidthSize=$this->getParameter('iconsWidthSize');
        $iconsHeightSize=$this->getParameter('iconsHeightSize');
        $sizeSeparador=$this->getParameter('sizeSeparador');
        $colorSeparator=$this->getParameter('colorSeparator');
        $appLogo=$this->getParameter('logo');            
        return $this->render('movimiento/index.html.twig', [
            'movimientos' => $movimientoRepository->findAll(),
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
        return $this->render('movimiento/new.html.twig', [
            'movimiento' => $movimiento,
            'form' => $form,
            'logo'=>$appLogo
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
}
