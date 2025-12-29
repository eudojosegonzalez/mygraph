<?php

namespace App\Form;

use App\Entity\Inventario;
use App\Entity\Unidad;
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

class InventarioType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('codigo')
            ->add('nombre', TextType::class, ['required' => true, 'label' => 'Descripción del Material'])
            ->add('modelo')
            ->add(
                'tipo',
                ChoiceType::class,
                [
                    'label' => 'Tipo',
                    'required' => true,
                    'multiple' => false,
                    'expanded' => false,
                    'choices' => [
                        'Material' => '1',
                        'Servicio' => '2',
                    ],
                ]
            )             
            ->add('existencia', 
                NumberType::class, 
                ['required' => true, 
                'label' => 'Existencia',
                'attr' => [
                'style' => 'text-align: right;',
                'placeholder' => '0.00']
                ]                                
                )
            ->add('critico', 
                NumberType::class, 
                ['required' => true, 
                'label' => 'Cantidad Mínima Aceptable',
                'attr' => [
                'style' => 'text-align: right;',
                'placeholder' => '0.00']
                ]                                
                )                
            ->add('unidad', EntityType::class, [
                'class' => Unidad::class,
                'label' => 'Unidad de Medida',
                'choice_label' => 'nombre',
            ])
            ->add(
                'estado',
                ChoiceType::class,
                [
                    'label' => 'Estado del Material',
                    'required' => true,
                    'multiple' => false,
                    'expanded' => false,
                    'choices' => [
                        'Activo' => '1',
                        'Inactivo' => '0',
                    ],
                ]
            ) 
            ->add('fecha_act',
                DateType::class,
                [
                    'label'=>'Fecha de Actualización',
                    'required' => true,                    
                ]
            )
            ->add('costo', 
                NumberType::class, 
                ['required' => true, 
                'label' => 'Costo',
                'attr' => [
                'style' => 'text-align: right;',
                'placeholder' => '0.00']
                ])            
            ->add('precio',
                NumberType::class,  
                ['required' => true, 
                'label' => 'Costo',
                'attr' => [
                'style' => 'text-align: right;',
                'placeholder' => '0.00']
                ]            
            )            
            ;                          
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Inventario::class,
        ]);
    }
}
