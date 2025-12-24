<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251218223810 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE inventario (id INT AUTO_INCREMENT NOT NULL, codigo VARCHAR(50) NOT NULL, nombre VARCHAR(150) NOT NULL, modelo VARCHAR(50) NOT NULL, estado INT NOT NULL, existencia NUMERIC(18, 2) NOT NULL, fecha_act DATE NOT NULL, unidad_id INT NOT NULL, INDEX IDX_6A194EF59D01464C (unidad_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE inventario ADD CONSTRAINT FK_6A194EF59D01464C FOREIGN KEY (unidad_id) REFERENCES unidad (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE inventario DROP FOREIGN KEY FK_6A194EF59D01464C');
        $this->addSql('DROP TABLE inventario');
    }
}
