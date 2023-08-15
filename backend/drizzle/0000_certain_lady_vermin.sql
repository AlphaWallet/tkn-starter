CREATE TABLE IF NOT EXISTS "tickets" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"email" varchar(100) NOT NULL,
	"chain" integer NOT NULL,
	"ticket_id" varchar(100) NOT NULL,
	"ticket_link" varchar(800) NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "unique_chain_email" ON "tickets" ("chain","email");
CREATE UNIQUE INDEX IF NOT EXISTS "unique_chain_ticketId" ON "tickets" ("chain","ticket_id");