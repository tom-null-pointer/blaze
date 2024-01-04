import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1704316148177 implements MigrationInterface {
    name = 'FirstMigration1704316148177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "venue" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "capacity" character varying NOT NULL, "surface" character varying NOT NULL, "teamId" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_824a52c2599d374feff4fd67e93" UNIQUE ("name"), CONSTRAINT "PK_c53deb6d1bcb088f9d459e7dbc0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "detail_type" ("id" SERIAL NOT NULL, "key" character varying NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_286ff0522312e55d60c9aee0ff2" UNIQUE ("key"), CONSTRAINT "PK_753ff42e285b0bbe2dfd68660f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "player_detail" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, "typeId" integer NOT NULL, "playerId" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_328f75d6e55129d3516e2b41603" UNIQUE ("typeId", "playerId"), CONSTRAINT "PK_d9f59227b8047e92d56d8273921" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "player" ("id" SERIAL NOT NULL, "apiPlayerId" character varying NOT NULL, "key" bigint NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_0b800e516c4e2849becc0f67285" UNIQUE ("apiPlayerId"), CONSTRAINT "UQ_4d55d45165f28616e4ec39e5eba" UNIQUE ("key"), CONSTRAINT "UQ_cf0dbebb149b9f43ff51c06ef40" UNIQUE ("apiPlayerId", "key"), CONSTRAINT "PK_65edadc946a7faf4b638d5e8885" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "match" ("id" SERIAL NOT NULL, "apiFootballId" character varying NOT NULL, "date" character varying NOT NULL, "time" character varying NOT NULL, "status" character varying NOT NULL, "homeTeamId" integer NOT NULL, "awayTeamId" integer NOT NULL, "homeTeamScore" character varying, "homeTeamHalfTimeScore" character varying, "awayTeamScore" character varying, "awayTeamHalfTimeScore" character varying, "homeTeamExtraScore" character varying, "awayTeamExtraScore" character varying, "homeTeamPenaltyScore" character varying, "awayTeamPenaltyScore" character varying, "homeTeamFtScore" character varying, "awayTeamFtScore" character varying, "homeTeamSystem" character varying, "awayTeamSystem" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_25f1ab87bb3a9d0b6ff5c136806" UNIQUE ("apiFootballId"), CONSTRAINT "PK_92b6c3a6631dd5b24a67c69f69d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "team" ("id" SERIAL NOT NULL, "key" character varying NOT NULL, "name" character varying NOT NULL, "country" character varying NOT NULL, "founded" character varying NOT NULL, "badge" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_56adad28700186557f8d3209189" UNIQUE ("key"), CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "coach" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "country" character varying, "age" character varying, "teamId" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_44a6dfed2247b45d64cbe94b5f8" UNIQUE ("name"), CONSTRAINT "PK_c2ca0875fe0755b197d0147713d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "team_player" ("teamId" integer NOT NULL, "playerId" integer NOT NULL, CONSTRAINT "PK_913de7114c0d76a3c61dc698b7b" PRIMARY KEY ("teamId", "playerId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ba439df2ee27e9bf3dd1e380b6" ON "team_player" ("teamId") `);
        await queryRunner.query(`CREATE INDEX "IDX_869480e0ee5775a480eb7d92a4" ON "team_player" ("playerId") `);
        await queryRunner.query(`ALTER TABLE "venue" ADD CONSTRAINT "FK_8c79a60bb023648260c04d8654c" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player_detail" ADD CONSTRAINT "FK_23f438a299868776270a8c60d1d" FOREIGN KEY ("typeId") REFERENCES "detail_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player_detail" ADD CONSTRAINT "FK_e334b46439ef6a7efe89a9a0cdb" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_5caac1768e2f5b7b9c69b62090c" FOREIGN KEY ("homeTeamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_07f5b02809e195be415834ed78a" FOREIGN KEY ("awayTeamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coach" ADD CONSTRAINT "FK_df472cf8910d5104ffe957d5793" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_player" ADD CONSTRAINT "FK_ba439df2ee27e9bf3dd1e380b65" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "team_player" ADD CONSTRAINT "FK_869480e0ee5775a480eb7d92a44" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team_player" DROP CONSTRAINT "FK_869480e0ee5775a480eb7d92a44"`);
        await queryRunner.query(`ALTER TABLE "team_player" DROP CONSTRAINT "FK_ba439df2ee27e9bf3dd1e380b65"`);
        await queryRunner.query(`ALTER TABLE "coach" DROP CONSTRAINT "FK_df472cf8910d5104ffe957d5793"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_07f5b02809e195be415834ed78a"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_5caac1768e2f5b7b9c69b62090c"`);
        await queryRunner.query(`ALTER TABLE "player_detail" DROP CONSTRAINT "FK_e334b46439ef6a7efe89a9a0cdb"`);
        await queryRunner.query(`ALTER TABLE "player_detail" DROP CONSTRAINT "FK_23f438a299868776270a8c60d1d"`);
        await queryRunner.query(`ALTER TABLE "venue" DROP CONSTRAINT "FK_8c79a60bb023648260c04d8654c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_869480e0ee5775a480eb7d92a4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ba439df2ee27e9bf3dd1e380b6"`);
        await queryRunner.query(`DROP TABLE "team_player"`);
        await queryRunner.query(`DROP TABLE "coach"`);
        await queryRunner.query(`DROP TABLE "team"`);
        await queryRunner.query(`DROP TABLE "match"`);
        await queryRunner.query(`DROP TABLE "player"`);
        await queryRunner.query(`DROP TABLE "player_detail"`);
        await queryRunner.query(`DROP TABLE "detail_type"`);
        await queryRunner.query(`DROP TABLE "venue"`);
    }

}
