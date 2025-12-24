<?php

namespace App\Entity;

use App\Repository\UnidadRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UnidadRepository::class)]
class Unidad
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    private ?string $nombre = null;

    #[ORM\Column(length: 10)]
    private ?string $simbolo = null;

    #[ORM\Column]
    private ?int $estado = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNombre(): ?string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre): static
    {
        $this->nombre = $nombre;

        return $this;
    }

    public function getSimbolo(): ?string
    {
        return $this->simbolo;
    }

    public function setSimbolo(string $simbolo): static
    {
        $this->simbolo = $simbolo;

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
}
