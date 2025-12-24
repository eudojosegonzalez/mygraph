<?php

namespace App\Form;

use App\Entity\Cliente;
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


class ClienteType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('nombre', TextType::class, ['required' => true, 'label' => 'Nombre'])
            ->add(
                'tipo_doc',
                ChoiceType::class,
                [
                    'label' => 'Tipo de Documento',
                    'required' => true,
                    'multiple' => false,
                    'expanded' => false,
                    'choices' => [
                        'V' => 'V',
                        'E' => 'E',
                        'J' => 'J',
                        'G' => 'G',
                        'R' => 'R',

                    ],
                ]

            )        
            ->add('documento', TextType::class, ['required' => true, 'label' => 'Documento'])                
            ->add('direccion', TextareaType::class, ['required' => true, 'label' => 'Dirección'])                    
            ->add('telefono', TextType::class, ['required' => true, 'label' => 'Teléfono'])
            ->add('email', EmailType::class, ['required' => true, 'label' => 'Correo Electrónico'])
            ->add(
                'estado',
                ChoiceType::class,
                [
                    'label' => 'Estado del Cliente',
                    'required' => true,
                    'multiple' => false,
                    'expanded' => false,
                    'choices' => [
                        'Activo' => '1',
                        'Inactivo' => '0',
                    ],
                ]
            )
            ->add('fecha_creacion',
                DateType::class,
                [
                    'label'=>'Fecha de Creación',
                    'required' => true,                    
                ]
            );        

    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Cliente::class,
        ]);
    }
}
