<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210112130531 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE budget (id INT AUTO_INCREMENT NOT NULL, subcategory_id INT NOT NULL, value DOUBLE PRECISION NOT NULL, date DATE NOT NULL, UNIQUE INDEX UNIQ_73F2F77B5DC6FE57 (subcategory_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE budget ADD CONSTRAINT FK_73F2F77B5DC6FE57 FOREIGN KEY (subcategory_id) REFERENCES subcategory (id)');
        $this->addSql('ALTER TABLE bank ADD type VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE subcategory ADD column budget_id INT');
        $this->addSql('ALTER TABLE subcategory ADD CONSTRAINT FK_DDCA44836ABA6B8 FOREIGN KEY (budget_id) REFERENCES budget (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_DDCA44836ABA6B8 ON subcategory (budget_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE subcategory DROP FOREIGN KEY FK_DDCA44836ABA6B8');
        $this->addSql('DROP TABLE budget');
        $this->addSql('ALTER TABLE bank DROP type');
        $this->addSql('DROP INDEX UNIQ_DDCA44836ABA6B8 ON subcategory');
        $this->addSql('ALTER TABLE subcategory DROP COLUMN budget_id');
    }
}
