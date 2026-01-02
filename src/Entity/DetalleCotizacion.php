<?php

namespace App\Entity;

use App\Repository\DetalleCotizacionRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DetalleCotizacionRepository::class)]
class DetalleCotizacion
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Cliente $cliente = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Cotizacion $cotizacion = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Inventario $inventario = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Unidad $unidad = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 13, scale: 2)]
    private ?string $cantidad = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 13, scale: 2)]
    private ?string $costo = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 13, scale: 2)]
    private ?string $precio = null;

    #[ORM\Column]
    private ?int $taza_aplicada = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2, nullable: true)]
    private ?string $taza1 = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2, nullable: true)]
    private ?string $taza2 = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2, nullable: true)]
    private ?string $taza3 = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 5, scale: 2)]
    private ?string $factor = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 5, scale: 2)]
    private ?string $porcentaje_descuento = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2)]
    private ?string $monto_descuento = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCliente(): ?Cliente
    {
        return $this->cliente;
    }

    public function setCliente(?Cliente $cliente): static
    {
        $this->cliente = $cliente;

        return $this;
    }

    public function getCotizacion(): ?Cotizacion
    {
        return $this->cotizacion;
    }

    public function setCotizacion(?Cotizacion $cotizacion): static
    {
        $this->cotizacion = $cotizacion;

        return $this;
    }

    public function getInventario(): ?Inventario
    {
        return $this->inventario;
    }

    public function setInventario(?Inventario $inventario): static
    {
        $this->inventario = $inventario;

        return $this;
    }

    public function getUnidad(): ?Unidad
    {
        return $this->unidad;
    }

    public function setUnidad(?Unidad $unidad): static
    {
        $this->unidad = $unidad;

        return $this;
    }

    public function getCantidad(): ?string
    {
        return $this->cantidad;
    }

    public function setCantidad(string $cantidad): static
    {
        $this->cantidad = $cantidad;

        return $this;
    }

    public function getCosto(): ?string
    {
        return $this->costo;
    }

    public function setCosto(string $costo): static
    {
        $this->costo = $costo;

        return $this;
    }

    public function getPrecio(): ?string
    {
        return $this->precio;
    }

    public function setPrecio(string $precio): static
    {
        $this->precio = $precio;

        return $this;
    }

    public function getTazaAplicada(): ?int
    {
        return $this->taza_aplicada;
    }

    public function setTazaAplicada(int $taza_aplicada): static
    {
        $this->taza_aplicada = $taza_aplicada;

        return $this;
    }

    public function getTaza1(): ?string
    {
        return $this->taza1;
    }

    public function setTaza1(?string $taza1): static
    {
        $this->taza1 = $taza1;

        return $this;
    }

    public function getTaza2(): ?string
    {
        return $this->taza2;
    }

    public function setTaza2(?string $taza2): static
    {
        $this->taza2 = $taza2;

        return $this;
    }

    public function getTaza3(): ?string
    {
        return $this->taza3;
    }

    public function setTaza3(?string $taza3): static
    {
        $this->taza3 = $taza3;

        return $this;
    }

    public function getFactor(): ?string
    {
        return $this->factor;
    }

    public function setFactor(string $factor): static
    {
        $this->factor = $factor;

        return $this;
    }

    public function getPorcentajeDescuento(): ?string
    {
        return $this->porcentaje_descuento;
    }

    public function setPorcentajeDescuento(string $porcentaje_descuento): static
    {
        $this->porcentaje_descuento = $porcentaje_descuento;

        return $this;
    }

    public function getMontoDescuento(): ?string
    {
        return $this->monto_descuento;
    }

    public function setMontoDescuento(string $monto_descuento): static
    {
        $this->monto_descuento = $monto_descuento;

        return $this;
    }
}
