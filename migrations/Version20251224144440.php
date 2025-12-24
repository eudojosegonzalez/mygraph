<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251224144440 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE movimiento (id INT AUTO_INCREMENT NOT NULL, tipo INT NOT NULL, cantidad NUMERIC(13, 2) NOT NULL, inicial NUMERIC(13, 2) NOT NULL, final NUMERIC(13, 2) NOT NULL, proyecto INT DEFAULT NULL, documento VARCHAR(50) DEFAULT NULL, estado INT NOT NULL, fecha_act DATETIME NOT NULL, inventario_id INT NOT NULL, unidad_id INT NOT NULL, usuario_id INT NOT NULL, INDEX IDX_C8FF107ADFDFBE2A (inventario_id), INDEX IDX_C8FF107A9D01464C (unidad_id), INDEX IDX_C8FF107ADB38439E (usuario_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE movimiento ADD CONSTRAINT FK_C8FF107ADFDFBE2A FOREIGN KEY (inventario_id) REFERENCES inventario (id)');
        $this->addSql('ALTER TABLE movimiento ADD CONSTRAINT FK_C8FF107A9D01464C FOREIGN KEY (unidad_id) REFERENCES unidad (id)');
        $this->addSql('ALTER TABLE movimiento ADD CONSTRAINT FK_C8FF107ADB38439E FOREIGN KEY (usuario_id) REFERENCES user (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE movimiento DROP FOREIGN KEY FK_C8FF107ADFDFBE2A');
        $this->addSql('ALTER TABLE movimiento DROP FOREIGN KEY FK_C8FF107A9D01464C');
        $this->addSql('ALTER TABLE movimiento DROP FOREIGN KEY FK_C8FF107ADB38439E');
        $this->addSql('DROP TABLE movimiento');
    }
}
