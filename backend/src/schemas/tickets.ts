import {
  bigserial,
  integer,
  pgTable,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';

export const tickets = pgTable(
  'tickets',
  {
    id: bigserial('id', {mode: 'number'}).primaryKey(),
    email: varchar('email', {length: 100}).notNull(),
    chain: integer('chain').notNull(),
    ticketId: varchar('ticket_id', {length: 100}).notNull(),
    ticketLink: varchar('ticket_link', {length: 800}).notNull(),
  },
  table => {
    return {
      uniqueEmailPerChain: uniqueIndex('unique_chain_email').on(
        table.chain,
        table.email
      ),
      uniqueTicketIdPerChain: uniqueIndex('unique_chain_ticketId').on(
        table.chain,
        table.ticketId
      ),
    };
  }
);
