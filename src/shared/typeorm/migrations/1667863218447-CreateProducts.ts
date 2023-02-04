import { MigrationInterface, QueryRunner, Table } from 'typeorm';

//Para criar as migrations:
//yarn typeorm migration:create -n CreateNomeTabela

//Para executar as migrations:
//yarn typeorm migration:run

export class CreateProducts1667863218447 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2
          },
          {
            name: 'quantity',
            type: 'int'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products')
  }
}
