<?php

namespace App\Form;

use App\Entity\Cliente;
use App\Entity\Cotizacion;
use App\Entity\User;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CotizacionType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('fecha_creacion')
            ->add('fecha_actualizacion')
            ->add('fecha_aprobacion')
            ->add('estado')
            ->add('monto')
            ->add('por_descuento')
            ->add('monto_descuento')
            ->add('precio')
            ->add('cliente', EntityType::class, [
                'class' => Cliente::class,
                'choice_label' => 'id',
            ])
            ->add('usuario', EntityType::class, [
                'class' => User::class,
                'choice_label' => 'id',
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Cotizacion::class,
        ]);
    }
}
