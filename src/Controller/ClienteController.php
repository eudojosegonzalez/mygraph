<?php

namespace App\Controller;

use App\Entity\Cliente;
use App\Form\ClienteType;
use App\Repository\ClienteRepository;
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
#[Route('/cliente')]
final class ClienteController extends AbstractController
{
    #[Route(name: 'app_cliente_index', methods: ['GET'])]
    public function index(ClienteRepository $clienteRepository): Response
    {
        $fontSize= $this->getParameter('fontSize');
        $iconsWidthSize=$this->getParameter('iconsWidthSize');
        $iconsHeightSize=$this->getParameter('iconsHeightSize');
        $sizeSeparador=$this->getParameter('sizeSeparador');
        $colorSeparator=$this->getParameter('colorSeparator');
        $appLogo=$this->getParameter('logo');        
        return $this->render('cliente/index.html.twig', [
            'clientes' => $clienteRepository->findAll(),
             'logo'=>$appLogo,
        ]);
    }

    #[Route('/new', name: 'app_cliente_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $cliente = new Cliente();
        $form = $this->createForm(ClienteType::class, $cliente);
        $form->handleRequest($request);
        $fontSize= $this->getParameter('fontSize');
        $iconsWidthSize=$this->getParameter('iconsWidthSize');
        $iconsHeightSize=$this->getParameter('iconsHeightSize');
        $sizeSeparador=$this->getParameter('sizeSeparador');
        $colorSeparator=$this->getParameter('colorSeparator');
        $appLogo=$this->getParameter('logo');           

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($cliente);
            $entityManager->flush();

            return $this->redirectToRoute('app_cliente_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('cliente/new.html.twig', [
            'cliente' => $cliente,
            'form' => $form,
             'logo'=>$appLogo,
        ]);
    }

    #[Route('/{id}', name: 'app_cliente_show', methods: ['GET'])]
    public function show(Cliente $cliente): Response
    {
        $fontSize= $this->getParameter('fontSize');
        $iconsWidthSize=$this->getParameter('iconsWidthSize');
        $iconsHeightSize=$this->getParameter('iconsHeightSize');
        $sizeSeparador=$this->getParameter('sizeSeparador');
        $colorSeparator=$this->getParameter('colorSeparator');
        $appLogo=$this->getParameter('logo');           
        return $this->render('cliente/show.html.twig', [
            'cliente' => $cliente,
             'logo'=>$appLogo,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_cliente_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Cliente $cliente, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(ClienteType::class, $cliente);
        $form->handleRequest($request);
        $fontSize= $this->getParameter('fontSize');
        $iconsWidthSize=$this->getParameter('iconsWidthSize');
        $iconsHeightSize=$this->getParameter('iconsHeightSize');
        $sizeSeparador=$this->getParameter('sizeSeparador');
        $colorSeparator=$this->getParameter('colorSeparator');
        $appLogo=$this->getParameter('logo');   
        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_cliente_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('cliente/edit.html.twig', [
            'cliente' => $cliente,
            'form' => $form,
            'logo'=>$appLogo,
        ]);
    }

    #[Route('/{id}', name: 'app_cliente_delete', methods: ['POST'])]
    public function delete(Request $request, Cliente $cliente, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$cliente->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($cliente);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_cliente_index', [], Response::HTTP_SEE_OTHER);
    }

    // Dentro de la clase ClienteController
    #[Route('importar_clientes', name: 'app_importar_clientes', methods: ['POST'])]
    public function importar(
        Request $request, 
        EntityManagerInterface $entityManager): Response
    {
        
        /** @var UploadedFile $file */
        $file = $request->files->get('archivo');

        if ($file) {
            $handle = fopen($file->getRealPath(), "r");
            
            // Omitir la primera línea si contiene cabeceras
            fgetcsv($handle, 1000, ","); 

            while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
                $cliente = new Cliente();
                
                // Supongamos que tu CSV tiene: Nombre, Email, Teléfono
                // Ajusta los setters según tus campos reales en la entidad Cliente
                // nombre;tipo_doc;documento;direccion;telefono;email;estado
                $cliente->setNombre($data[0]); 
                $cliente->setTipoDoc($data[1]);
                $cliente->setDocumento($data[2]);
                $cliente->setDireccion($data[3]);
                $cliente->setTelefono($data[4]);
                $cliente->setEmail($data[5]);
                $cliente->setEstado($data[6]);
                $cliente->setFechaCreacion(new \DateTime());

                $entityManager->persist($cliente);
            }

            fclose($handle);
            $entityManager->flush();

            $this->addFlash('success', '¡Clientes importados correctamente!');
            return $this->redirectToRoute('app_cliente_index');
        } else {
            $this->addFlash('error', 'No se ha subido ningún archivo.');
            return $this->redirectToRoute('app_cliente_index');
        }
        
    }    
}
