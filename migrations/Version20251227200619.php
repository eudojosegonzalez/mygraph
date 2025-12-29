<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251227200619 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE proyecto (id INT AUTO_INCREMENT NOT NULL, descripcion VARCHAR(150) NOT NULL, fecha_creacion DATE NOT NULL, estado INT NOT NULL, cliente_id INT NOT NULL, INDEX IDX_6FD202B9DE734E51 (cliente_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE proyecto ADD CONSTRAINT FK_6FD202B9DE734E51 FOREIGN KEY (cliente_id) REFERENCES cliente (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE proyecto DROP FOREIGN KEY FK_6FD202B9DE734E51');
        $this->addSql('DROP TABLE proyecto');
    }
}
