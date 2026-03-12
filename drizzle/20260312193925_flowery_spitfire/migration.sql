CREATE TYPE "patent" AS ENUM('comercial', 'industrial', 'profesional');--> statement-breakpoint
CREATE TABLE "activity" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "activity_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text DEFAULT 'N/A' NOT NULL UNIQUE,
	"activity_code" integer
);
--> statement-breakpoint
CREATE TABLE "business" (
	"rut" varchar(12) PRIMARY KEY,
	"legal_name" varchar NOT NULL UNIQUE,
	"email" text UNIQUE,
	"formalized" integer NOT NULL,
	"patent" "patent",
	"commune_id" integer
);
--> statement-breakpoint
CREATE TABLE "business_activity" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "business_activity_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"business_rut" varchar(12),
	"activity_id" integer
);
--> statement-breakpoint
CREATE TABLE "business_fund" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "business_fund_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"fund_id" integer,
	"state" text DEFAULT 'no participa' NOT NULL,
	"business_rut" varchar(12)
);
--> statement-breakpoint
CREATE TABLE "document" (
	"id" integer PRIMARY KEY,
	"name" text NOT NULL UNIQUE,
	"description" text NOT NULL,
	"business_rut" varchar(12)
);
--> statement-breakpoint
CREATE TABLE "funds" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "funds_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL UNIQUE,
	"institution_id" integer
);
--> statement-breakpoint
CREATE TABLE "institution" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "institution_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL UNIQUE
);
--> statement-breakpoint
CREATE TABLE "item" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "item_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"amount" integer DEFAULT 1 NOT NULL,
	"production_loss_id" integer,
	"loss_type_id" integer
);
--> statement-breakpoint
CREATE TABLE "loss_type" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "loss_type_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL UNIQUE
);
--> statement-breakpoint
CREATE TABLE "production_loss" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "production_loss_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"event_type" text NOT NULL,
	"house_service_register" integer DEFAULT 0,
	"other_background" text
);
--> statement-breakpoint
CREATE TABLE "record" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "record_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL UNIQUE,
	"created_at" timestamp DEFAULT now() NOT NULL UNIQUE,
	"updated_at" timestamp DEFAULT now() NOT NULL UNIQUE,
	"state" boolean DEFAULT false NOT NULL,
	"description" text,
	"recordable_id" integer,
	"business_rut" varchar(12)
);
--> statement-breakpoint
CREATE TABLE "training" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "training_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "address" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "address_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"street" text NOT NULL,
	"number" integer NOT NULL,
	"dpt_local_number" integer,
	"area" text,
	"locality_id" integer
);
--> statement-breakpoint
CREATE TABLE "comune" (
	"postal_code" integer PRIMARY KEY,
	"name" text NOT NULL UNIQUE
);
--> statement-breakpoint
CREATE TABLE "locality" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "locality_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL UNIQUE,
	"commune_id" integer
);
--> statement-breakpoint
CREATE TABLE "occupation" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "occupation_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text DEFAULT 'sin_especificar' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "person" (
	"rut" varchar(12) PRIMARY KEY,
	"names" text NOT NULL,
	"password" text NOT NULL,
	"mother_name" text NOT NULL,
	"pather_name" text NOT NULL,
	"email" text UNIQUE,
	"phone" text UNIQUE,
	"person_type" text NOT NULL,
	"is_head_of_household" boolean DEFAULT false NOT NULL,
	"occupation_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "session_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"created_at" timestamp DEFAULT now() NOT NULL UNIQUE,
	"employee_rut" varchar(12),
	"legalRepresentativeRut" varchar(12)
);
--> statement-breakpoint
DROP TABLE "users";--> statement-breakpoint
ALTER TABLE "business" ADD CONSTRAINT "business_commune_id_comune_postal_code_fkey" FOREIGN KEY ("commune_id") REFERENCES "comune"("postal_code");--> statement-breakpoint
ALTER TABLE "business_activity" ADD CONSTRAINT "business_activity_business_rut_business_rut_fkey" FOREIGN KEY ("business_rut") REFERENCES "business"("rut");--> statement-breakpoint
ALTER TABLE "business_activity" ADD CONSTRAINT "business_activity_activity_id_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activity"("id");--> statement-breakpoint
ALTER TABLE "business_fund" ADD CONSTRAINT "business_fund_fund_id_funds_id_fkey" FOREIGN KEY ("fund_id") REFERENCES "funds"("id");--> statement-breakpoint
ALTER TABLE "business_fund" ADD CONSTRAINT "business_fund_business_rut_business_rut_fkey" FOREIGN KEY ("business_rut") REFERENCES "business"("rut");--> statement-breakpoint
ALTER TABLE "document" ADD CONSTRAINT "document_business_rut_business_rut_fkey" FOREIGN KEY ("business_rut") REFERENCES "business"("rut");--> statement-breakpoint
ALTER TABLE "funds" ADD CONSTRAINT "funds_institution_id_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institution"("id");--> statement-breakpoint
ALTER TABLE "item" ADD CONSTRAINT "item_production_loss_id_production_loss_id_fkey" FOREIGN KEY ("production_loss_id") REFERENCES "production_loss"("id");--> statement-breakpoint
ALTER TABLE "item" ADD CONSTRAINT "item_loss_type_id_loss_type_id_fkey" FOREIGN KEY ("loss_type_id") REFERENCES "loss_type"("id");--> statement-breakpoint
ALTER TABLE "record" ADD CONSTRAINT "record_business_rut_business_rut_fkey" FOREIGN KEY ("business_rut") REFERENCES "business"("rut");--> statement-breakpoint
ALTER TABLE "address" ADD CONSTRAINT "address_locality_id_locality_id_fkey" FOREIGN KEY ("locality_id") REFERENCES "locality"("id");--> statement-breakpoint
ALTER TABLE "locality" ADD CONSTRAINT "locality_commune_id_comune_postal_code_fkey" FOREIGN KEY ("commune_id") REFERENCES "comune"("postal_code");--> statement-breakpoint
ALTER TABLE "person" ADD CONSTRAINT "person_occupation_id_occupation_id_fkey" FOREIGN KEY ("occupation_id") REFERENCES "occupation"("id");--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_employee_rut_person_rut_fkey" FOREIGN KEY ("employee_rut") REFERENCES "person"("rut");--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_legalRepresentativeRut_person_rut_fkey" FOREIGN KEY ("legalRepresentativeRut") REFERENCES "person"("rut");