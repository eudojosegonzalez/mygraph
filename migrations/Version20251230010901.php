<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251230010901 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE detalle_cotizacion (id INT AUTO_INCREMENT NOT NULL, cantidad NUMERIC(13, 2) NOT NULL, costo NUMERIC(13, 2) NOT NULL, precio NUMERIC(13, 2) NOT NULL, cliente_id INT NOT NULL, cotizacion_id INT NOT NULL, inventario_id INT NOT NULL, unidad_id INT NOT NULL, INDEX IDX_3258C122DE734E51 (cliente_id), INDEX IDX_3258C122307090AA (cotizacion_id), INDEX IDX_3258C122DFDFBE2A (inventario_id), INDEX IDX_3258C1229D01464C (unidad_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE detalle_cotizacion ADD CONSTRAINT FK_3258C122DE734E51 FOREIGN KEY (cliente_id) REFERENCES cliente (id)');
        $this->addSql('ALTER TABLE detalle_cotizacion ADD CONSTRAINT FK_3258C122307090AA FOREIGN KEY (cotizacion_id) REFERENCES cotizacion (id)');
        $this->addSql('ALTER TABLE detalle_cotizacion ADD CONSTRAINT FK_3258C122DFDFBE2A FOREIGN KEY (inventario_id) REFERENCES inventario (id)');
        $this->addSql('ALTER TABLE detalle_cotizacion ADD CONSTRAINT FK_3258C1229D01464C FOREIGN KEY (unidad_id) REFERENCES unidad (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE detalle_cotizacion DROP FOREIGN KEY FK_3258C122DE734E51');
        $this->addSql('ALTER TABLE detalle_cotizacion DROP FOREIGN KEY FK_3258C122307090AA');
        $this->addSql('ALTER TABLE detalle_cotizacion DROP FOREIGN KEY FK_3258C122DFDFBE2A');
        $this->addSql('ALTER TABLE detalle_cotizacion DROP FOREIGN KEY FK_3258C1229D01464C');
        $this->addSql('DROP TABLE detalle_cotizacion');
    }
}
