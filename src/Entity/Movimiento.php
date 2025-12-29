<?php

namespace App\Entity;

use App\Repository\MovimientoRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MovimientoRepository::class)]
class Movimiento
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Inventario $inventario = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Unidad $unidad = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $usuario = null;

    #[ORM\Column]
    private ?int $tipo = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 13, scale: 2)]
    private ?string $cantidad = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 13, scale: 2)]
    private ?string $inicial = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 13, scale: 2)]
    private ?string $final = null;

    #[ORM\Column(nullable: true)]
    private ?int $proyecto = null;

    #[ORM\Column(length: 50, nullable: true)]
    private ?string $documento = null;

    #[ORM\Column]
    private ?int $estado = null;

    #[ORM\Column]
    private ?\DateTime $fecha_act = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $observacion = null;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getUsuario(): ?User
    {
        return $this->usuario;
    }

    public function setUsuario(?User $usuario): static
    {
        $this->usuario = $usuario;

        return $this;
    }

    public function getTipo(): ?int
    {
        return $this->tipo;
    }

    public function setTipo(int $tipo): static
    {
        $this->tipo = $tipo;

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

    public function getInicial(): ?string
    {
        return $this->inicial;
    }

    public function setInicial(string $inicial): static
    {
        $this->inicial = $inicial;

        return $this;
    }

    public function getFinal(): ?string
    {
        return $this->final;
    }

    public function setFinal(string $final): static
    {
        $this->final = $final;

        return $this;
    }

    public function getProyecto(): ?int
    {
        return $this->proyecto;
    }

    public function setProyecto(?int $proyecto): static
    {
        $this->proyecto = $proyecto;

        return $this;
    }

    public function getDocumento(): ?string
    {
        return $this->documento;
    }

    public function setDocumento(?string $documento): static
    {
        $this->documento = $documento;

        return $this;
    }

    public function getEstado(): ?int
    {
        return $this->estado;
    }

    public function setEstado(int $estado): static
    {
        $this->estado = $estado;

        return $this;
    }

    public function getFechaAct(): ?\DateTime
    {
        return $this->fecha_act;
    }

    public function setFechaAct(\DateTime $fecha_act): static
    {
        $this->fecha_act = $fecha_act;

        return $this;
    }

    public function getObservacion(): ?string
    {
        return $this->observacion;
    }

    public function setObservacion(?string $observacion): static
    {
        $this->observacion = $observacion;

        return $this;
    }
}
