<?php

namespace App\Controller;

use App\Entity\Inventario;
use App\Form\InventarioType;
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

#[IsGranted("ROLE_ADMIN")]
#[Route('/inventario')]
final class InventarioController extends AbstractController
{
    #[Route(name: 'app_inventario_index', methods: ['GET'])]
    public function index(InventarioRepository $inventarioRepository): Response
    {
        $fontSize= $this->getParameter('fontSize');
        $iconsWidthSize=$this->getParameter('iconsWidthSize');
        $iconsHeightSize=$this->getParameter('iconsHeightSize');
        $sizeSeparador=$this->getParameter('sizeSeparador');
        $colorSeparator=$this->getParameter('colorSeparator');
        $appLogo=$this->getParameter('logo');           
        return $this->render('inventario/index.html.twig', [
            'inventarios' => $inventarioRepository->findAll(),
            'logo'=>$appLogo,
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
}
