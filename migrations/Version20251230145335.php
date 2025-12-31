<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251230145335 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE detalle_cotizacion ADD taza_aplicada INT NOT NULL, ADD taza1 NUMERIC(10, 2) DEFAULT NULL, ADD taza2 NUMERIC(10, 2) DEFAULT NULL, ADD taza3 NUMERIC(10, 2) DEFAULT NULL, ADD factor NUMERIC(5, 2) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE detalle_cotizacion DROP taza_aplicada, DROP taza1, DROP taza2, DROP taza3, DROP factor');
    }
}
