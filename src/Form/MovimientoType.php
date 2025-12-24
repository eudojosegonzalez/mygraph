<?php

namespace App\Form;

use App\Entity\Inventario;
use App\Entity\Movimiento;
use App\Entity\Unidad;
use App\Entity\User;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\DecimalType;

class MovimientoType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add(
                'tipo',
                ChoiceType::class,
                [
                    'label' => 'Estado del Material',
                    'required' => true,
                    'multiple' => false,
                    'expanded' => false,
                    'choices' => [
                        'Anexar' => '1',
                        'Retirar' => '2',
                    ],
                ]
            )             
            ->add('cantidad', 
                NumberType::class, 
                ['required' => true, 
                'label' => 'Cantidad de Material',
                'attr' => ['placeholder' => 'Cantidad de material a anexar o restar del inventario']
                ])
            ->add('proyecto', 
                NumberType::class, 
                ['required' => true, 
                'label' => 'Proyecto',
                'attr' => ['placeholder' => 'Número de Proyecto donde usará el material']
                ])
            ->add('documento', 
                TextType::class, 
                ['required' => true, 
                'label' => 'Documento',
                'attr' => ['placeholder' => 'Número de factura o remisión']
                ])
            ->add('inventario', EntityType::class, [
                'class' => Inventario::class,
                'choice_label' => 'nombre',
            ])
            ->add('unidad', EntityType::class, [
                'class' => Unidad::class,
                'choice_label' => 'nombre',
            ])
            ->add('usuario', EntityType::class, [
                'class' => User::class,
                'choice_label' => 'name',
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Movimiento::class,
        ]);
    }
}
