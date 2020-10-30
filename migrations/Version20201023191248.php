<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201023191248 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        $this->addSql('CREATE TABLE transaction (id INT AUTO_INCREMENT NOT NULL, bank_id INT NOT NULL, subcategory_id INT DEFAULT NULL, date DATE NOT NULL, value DOUBLE PRECISION NOT NULL, payee VARCHAR(255) NOT NULL, memo VARCHAR(255) DEFAULT NULL, INDEX IDX_723705D111C8FB41 (bank_id), INDEX IDX_723705D15DC6FE57 (subcategory_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE transaction ADD CONSTRAINT FK_723705D111C8FB41 FOREIGN KEY (bank_id) REFERENCES bank (id)');
        $this->addSql('ALTER TABLE transaction ADD CONSTRAINT FK_723705D15DC6FE57 FOREIGN KEY (subcategory_id) REFERENCES subcategory (id)');
    }

    public function down(Schema $schema) : void
    {
        $this->addSql('DROP TABLE transaction');
    }
}
