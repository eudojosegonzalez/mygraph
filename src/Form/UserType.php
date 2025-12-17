<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\CallbackTransformer;
class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {

        $builder
            ->add('name', TextType::class, ['required' => true, 'label' => 'Nombre'])
           ->add('email', TextType::class, ['required' => true, 'label' => 'Correo Electrónico'])
            ->add('password', PasswordType::class, ['required' => true, 'label' => 'Contraseña'])
            ->add('telefono', TextType::class, ['required' => true, 'label' => 'Telefono'])
            ->add(
                'nivel',
                ChoiceType::class,
                [
                    'label' => 'Nivel',
                    'required' => true,
                    'multiple' => false,
                    'expanded' => false,
                    'choices' => [
                        'Consultor' => '10',
                        'Operador' => '30',
                        'Administrador' => '99',
                    ],
                ]

            )

            ->add('Roles', ChoiceType::class, [
                'label' => 'Rol del Usuario',
                'required' => true,
                'multiple' => false,
                'expanded' => false,
                'choices' => [
                    'Usuario' => 'ROLE_USER',
                    'Administrador' => 'ROLE_ADMIN',
                ],
            ])
            ->add(
                'estado',
                ChoiceType::class,
                [
                    'label' => 'Estado del Usuario',
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
                DateTimeType::class,
                [
                    'label'=>'Fecha de Creación',
                    'required' => true,                    
                ]
            );

        // roles field data transformer
        $builder->get('Roles')
            ->addModelTransformer(new CallbackTransformer(
                function ($rolesArray) {
                    // transform the array to a string
                    return count($rolesArray) ? $rolesArray[0] : null;
                },
                function ($rolesString) {
                    // transform the string back to an array
                    return [$rolesString];
                }

            ));                

    }


    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
