import {and, eq} from 'drizzle-orm';
import {tickets} from '../schemas/tickets';
import {DbService} from '../_core/services/dbService';
import {createTicketLink, sendMail} from './commonApi';

import {ethers} from 'ethers';
import {env} from '../env';
import {normalizeEmail} from '../utils';
import {LOGGER} from '../_core/constant';

const logger = LOGGER.child({from: 'ticketService'});

export async function findTicketIdByChainAndTicketId(
  dbService: DbService,
  chain: number,
  ticketId: string
) {
  const result = await dbService
    .db()
    .select({
      id: tickets.id,
      email: tickets.email,
      chain: tickets.chain,
      ticketId: tickets.ticketId,
      ticketLink: tickets.ticketLink,
    })
    .from(tickets)
    .where(and(eq(tickets.chain, chain), eq(tickets.ticketId, ticketId)))
    .limit(1);

  return result.length ? result[0] : undefined;
}

export async function findTicketByChainAndEmail(
  dbService: DbService,
  chain: number,
  email: string
) {
  const result = await dbService
    .db()
    .select({
      id: tickets.id,
      email: tickets.email,
      chain: tickets.chain,
      ticketId: tickets.ticketId,
      ticketLink: tickets.ticketLink,
    })
    .from(tickets)
    .where(and(eq(tickets.chain, chain), eq(tickets.email, email)))
    .limit(1);

  return result.length ? result[0] : undefined;
}

export async function resendSingleTicket(
  dbService: DbService,
  chain: number,
  rawEmail: string,
  mail: {
    subject: string;
    templateUrl: string;
    moreParams?: any;
  }
) {
  const email = normalizeEmail(rawEmail);

  const ticket = await findTicketByChainAndEmail(dbService, chain, email);
  if (!ticket) {
    throw new Error('There is no ticket for this email!');
  }

  const ticketId = ticket.ticketId;
  const ticketLink = ticket.ticketLink;

  await sendMail(rawEmail, mail.subject, mail.templateUrl, {
    magiclink: ticketLink,
    rootUrl: env.ROOT_URL_PREFIX,
    ...(mail.moreParams ?? {}),
  });

  return ticketId;
}

export async function createSingleTicket(
  dbService: DbService,
  chain: number,
  rawEmail: string,
  mail: {
    subject: string;
    templateUrl: string;
    moreParams?: any;
  }
) {
  const email = normalizeEmail(rawEmail);

  const ticket = await findTicketByChainAndEmail(dbService, chain, email);
  let ticketId;
  let ticketLink;
  if (ticket) {
    ticketId = ticket.ticketId;
    ticketLink = ticket.ticketLink;
  } else {
    ticketId = await generateTicketId(dbService, chain, email);
    ticketLink = await createTicketLink(ticketId, email);

    await dbService.db().insert(tickets).values({
      email,
      chain,
      ticketId,
      ticketLink,
    });
  }

  await sendMail(rawEmail, mail.subject, mail.templateUrl, {
    magiclink: ticketLink,
    rootUrl: env.ROOT_URL_PREFIX,
    ...(mail.moreParams ?? {}),
  });

  return ticketId;
}

async function generateTicketId(
  dbService: DbService,
  chain: number,
  email: string
): Promise<string> {
  const ethersId = ethers.utils
    .id(
      `${email}${chain}${new Date().getTime()}${Math.floor(
        Math.random() * 1000
      )}`
    )
    .substring(50);

  const ticketId = parseInt(
    `${ethersId.slice(0, 4)}${ethersId.slice(-4, ethersId.length)}`,
    16
  ).toString();

  if (await findTicketIdByChainAndTicketId(dbService, chain, ticketId)) {
    return generateTicketId(dbService, chain, email);
  } else {
    return ticketId;
  }
}
