<?php

namespace App\Controller;

use App\Entity\Unidad;
use App\Form\UnidadType;
use App\Repository\UnidadRepository;
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
#[Route('/unidad')]
final class UnidadController extends AbstractController
{
    #[Route(name: 'app_unidad_index', methods: ['GET'])]
    public function index(UnidadRepository $unidadRepository): Response
    {
        $fontSize= $this->getParameter('fontSize');
        $iconsWidthSize=$this->getParameter('iconsWidthSize');
        $iconsHeightSize=$this->getParameter('iconsHeightSize');
        $sizeSeparador=$this->getParameter('sizeSeparador');
        $colorSeparator=$this->getParameter('colorSeparator');
        $appLogo=$this->getParameter('logo');           
        return $this->render('unidad/index.html.twig', [
            'unidads' => $unidadRepository->findAll(),
            'logo'=>$appLogo,
        ]);
    }

    #[Route('/new', name: 'app_unidad_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $unidad = new Unidad();
        $form = $this->createForm(UnidadType::class, $unidad);
        $form->handleRequest($request);

        $fontSize= $this->getParameter('fontSize');
        $iconsWidthSize=$this->getParameter('iconsWidthSize');
        $iconsHeightSize=$this->getParameter('iconsHeightSize');
        $sizeSeparador=$this->getParameter('sizeSeparador');
        $colorSeparator=$this->getParameter('colorSeparator');
        $appLogo=$this->getParameter('logo');   

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($unidad);
            $entityManager->flush();

            return $this->redirectToRoute('app_unidad_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('unidad/new.html.twig', [
            'unidad' => $unidad,
            'form' => $form,
            'logo'=>$appLogo,
        ]);
    }

    #[Route('/{id}', name: 'app_unidad_show', methods: ['GET'])]
    public function show(Unidad $unidad): Response
    {
        $fontSize= $this->getParameter('fontSize');
        $iconsWidthSize=$this->getParameter('iconsWidthSize');
        $iconsHeightSize=$this->getParameter('iconsHeightSize');
        $sizeSeparador=$this->getParameter('sizeSeparador');
        $colorSeparator=$this->getParameter('colorSeparator');
        $appLogo=$this->getParameter('logo');           
        return $this->render('unidad/show.html.twig', [
            'unidad' => $unidad,
            'logo'=>$appLogo,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_unidad_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Unidad $unidad, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(UnidadType::class, $unidad);
        $form->handleRequest($request);
        $fontSize= $this->getParameter('fontSize');
        $iconsWidthSize=$this->getParameter('iconsWidthSize');
        $iconsHeightSize=$this->getParameter('iconsHeightSize');
        $sizeSeparador=$this->getParameter('sizeSeparador');
        $colorSeparator=$this->getParameter('colorSeparator');
        $appLogo=$this->getParameter('logo');   
        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_unidad_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('unidad/edit.html.twig', [
            'unidad' => $unidad,
            'form' => $form,
            'logo'=>$appLogo,
        ]);
    }

    #[Route('/{id}', name: 'app_unidad_delete', methods: ['POST'])]
    public function delete(Request $request, Unidad $unidad, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$unidad->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($unidad);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_unidad_index', [], Response::HTTP_SEE_OTHER);
    }
}
