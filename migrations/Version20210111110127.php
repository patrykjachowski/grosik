<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210111110127 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE bank ADD type VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE budget DROP FOREIGN KEY FK_73F2F77BF78A56EE');
        $this->addSql('DROP INDEX UNIQ_73F2F77BF78A56EE ON budget');
        $this->addSql('ALTER TABLE budget CHANGE subcategory_id subcategory_id INT NOT NULL');
        $this->addSql('ALTER TABLE budget ADD CONSTRAINT FK_73F2F77BF78A56EE FOREIGN KEY (subcategory_id) REFERENCES subcategory (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_73F2F77BF78A56EE ON budget (subcategory_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE bank DROP type');
        $this->addSql('ALTER TABLE budget DROP FOREIGN KEY FK_73F2F77BF78A56EE');
        $this->addSql('DROP INDEX UNIQ_73F2F77BF78A56EE ON budget');
        $this->addSql('ALTER TABLE budget CHANGE subcategory_id subcategory_id INT NOT NULL');
        $this->addSql('ALTER TABLE budget ADD CONSTRAINT FK_73F2F77BF78A56EE FOREIGN KEY (subcategory_id) REFERENCES subcategory (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_73F2F77BF78A56EE ON budget (subcategory_id)');
    }
}
