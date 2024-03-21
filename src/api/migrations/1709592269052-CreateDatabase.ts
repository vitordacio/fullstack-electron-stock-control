import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDatabase1709592269052 implements MigrationInterface {
    name = 'CreateDatabase1709592269052'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employees" ("id_employee" uuid NOT NULL, "company_id" uuid NOT NULL, "user_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "REL_2d83c53c3e553a48dadb9722e3" UNIQUE ("user_id"), CONSTRAINT "PK_b9bd6c02b7e061e4b5398ddadd6" PRIMARY KEY ("id_employee"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id_user" uuid NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "role_name" character varying NOT NULL DEFAULT 'user', "actived" boolean NOT NULL DEFAULT true, "tags" character varying array NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_fbb07fa6fbd1d74bee9782fb945" PRIMARY KEY ("id_user"))`);
        await queryRunner.query(`CREATE TABLE "sales" ("id_sale" uuid NOT NULL, "cash" numeric(10,2), "pix" numeric(10,2), "debit" numeric(10,2), "credit" numeric(10,2), "discount" numeric(10,2), "change" numeric(10,2) NOT NULL, "received" numeric(10,2) NOT NULL, "subtotal" numeric(10,2) NOT NULL, "total" numeric(10,2) NOT NULL, "company_id" uuid NOT NULL, "author_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_14df41ad90010de4de26f35e9bf" PRIMARY KEY ("id_sale"))`);
        await queryRunner.query(`CREATE TABLE "stock_movements" ("id_stock_movement" uuid NOT NULL, "price" numeric(10,2), "local_in" integer NOT NULL DEFAULT '0', "local_out" integer NOT NULL DEFAULT '0', "store_in" integer NOT NULL DEFAULT '0', "store_out" integer NOT NULL DEFAULT '0', "product_id" uuid NOT NULL, "user_id" uuid NOT NULL, "sale_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_dae5f9c089e15219f1656ccf249" PRIMARY KEY ("id_stock_movement"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id_product" uuid NOT NULL, "name" character varying NOT NULL, "code" character varying, "price" numeric(10,2) NOT NULL, "price_cost" numeric(10,2), "stock_local_qtd" integer NOT NULL DEFAULT '0', "stock_local_min" integer, "stock_local_max" integer, "stock_store_qtd" integer NOT NULL DEFAULT '0', "stock_store_min" integer, "stock_store_max" integer, "actived" boolean NOT NULL DEFAULT true, "tags" character varying array NOT NULL, "category_id" uuid, "company_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_61a11191b5789c8a8035edf88f7" PRIMARY KEY ("id_product"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id_category" uuid NOT NULL, "name" character varying NOT NULL, "tags" character varying array NOT NULL, "company_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_8ac255b9743120147e61fb5465b" PRIMARY KEY ("id_category"))`);
        await queryRunner.query(`CREATE TABLE "expenses" ("id_expense" uuid NOT NULL, "name" character varying NOT NULL, "description" character varying, "total" numeric(10,2) NOT NULL, "tags" character varying array NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_78bbec7c3d28e13026bae48e540" PRIMARY KEY ("id_expense"))`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_7f3eeef59eece4147effe7bfa6a" FOREIGN KEY ("company_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_2d83c53c3e553a48dadb9722e38" FOREIGN KEY ("user_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_6126ce1093dd7ed2d023c47633c" FOREIGN KEY ("company_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_d7584a7b436ece1ce8d9514ebfe" FOREIGN KEY ("author_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock_movements" ADD CONSTRAINT "FK_2c1bb05b80ddcc562cd28d826c6" FOREIGN KEY ("product_id") REFERENCES "products"("id_product") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock_movements" ADD CONSTRAINT "FK_d7fedfd6ee0f4a06648c48631c6" FOREIGN KEY ("user_id") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock_movements" ADD CONSTRAINT "FK_b6d549c625b2e9979c1f72a6731" FOREIGN KEY ("sale_id") REFERENCES "sales"("id_sale") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "categories"("id_category") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_b417f1726f6ccafb18730adffb0" FOREIGN KEY ("company_id") REFERENCES "users"("id_user") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_987f987126a3f2e4f9ec03db04e" FOREIGN KEY ("company_id") REFERENCES "users"("id_user") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_987f987126a3f2e4f9ec03db04e"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_b417f1726f6ccafb18730adffb0"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`);
        await queryRunner.query(`ALTER TABLE "stock_movements" DROP CONSTRAINT "FK_b6d549c625b2e9979c1f72a6731"`);
        await queryRunner.query(`ALTER TABLE "stock_movements" DROP CONSTRAINT "FK_d7fedfd6ee0f4a06648c48631c6"`);
        await queryRunner.query(`ALTER TABLE "stock_movements" DROP CONSTRAINT "FK_2c1bb05b80ddcc562cd28d826c6"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_d7584a7b436ece1ce8d9514ebfe"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_6126ce1093dd7ed2d023c47633c"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_2d83c53c3e553a48dadb9722e38"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_7f3eeef59eece4147effe7bfa6a"`);
        await queryRunner.query(`DROP TABLE "expenses"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "stock_movements"`);
        await queryRunner.query(`DROP TABLE "sales"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "employees"`);
    }

}
