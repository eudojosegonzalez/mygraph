<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251230010621 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE cotizacion (id INT AUTO_INCREMENT NOT NULL, fecha_creacion DATE NOT NULL, fecha_actualizacion DATE NOT NULL, fecha_aprobacion DATE NOT NULL, estado INT NOT NULL, monto NUMERIC(13, 2) NOT NULL, por_descuento NUMERIC(5, 2) NOT NULL, monto_descuento NUMERIC(13, 2) NOT NULL, precio NUMERIC(13, 2) NOT NULL, cliente_id INT NOT NULL, usuario_id INT NOT NULL, INDEX IDX_44A5EC03DE734E51 (cliente_id), INDEX IDX_44A5EC03DB38439E (usuario_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE cotizacion ADD CONSTRAINT FK_44A5EC03DE734E51 FOREIGN KEY (cliente_id) REFERENCES cliente (id)');
        $this->addSql('ALTER TABLE cotizacion ADD CONSTRAINT FK_44A5EC03DB38439E FOREIGN KEY (usuario_id) REFERENCES user (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE cotizacion DROP FOREIGN KEY FK_44A5EC03DE734E51');
        $this->addSql('ALTER TABLE cotizacion DROP FOREIGN KEY FK_44A5EC03DB38439E');
        $this->addSql('DROP TABLE cotizacion');
    }
}
