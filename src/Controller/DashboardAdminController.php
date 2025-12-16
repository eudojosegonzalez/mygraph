<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\DependencyInjection\ParameterBag\ContainerBagInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\RequestStack;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface; 
use Doctrine\DBAL\Connection; // ¡Importante!
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\File\Exception\FileException;


#[IsGranted("ROLE_ADMIN")]
final class DashboardAdminController extends AbstractController
{
    #[Route('/dashboard_admin', name: 'app_dashboard_admin')]
    public function index(): Response
    {
        $fontSize= $this->getParameter('fontSize');
        $iconsWidthSize=$this->getParameter('iconsWidthSize');
        $iconsHeightSize=$this->getParameter('iconsHeightSize');
        $sizeSeparador=$this->getParameter('sizeSeparador');
        $colorSeparator=$this->getParameter('colorSeparator');
        $appLogo=$this->getParameter('logo');


        return $this->render('dashboard_admin/index.html.twig', [
            'controller_name' => 'DashboardAdminController',
            'logo'=>$appLogo
        ]);
    }
}
