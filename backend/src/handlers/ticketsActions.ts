import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import z from 'zod';
import {EMAIL_TEMPLATE, errorResponseSchema} from '../constant';
import {verifyTicket} from '../services/commonApi';
import {createSingleTicket} from '../services/ticketsService';
import {DbService} from '../_core/services/dbService';
import {Action} from '../_core/type';

export const createTicket: Action = {
  path: '/',
  method: 'post',
  options: {
    schema: {
      body: z.object({
        chain: z.coerce.number(),
        email: z.string().email(),
      }),
      response: {
        201: z.object({ticketId: z.string()}),
        400: errorResponseSchema,
      },
      security: [{jwt: []}],
    },
  },
  handler: createTicketHandler,
};

async function createTicketHandler(
  this: FastifyInstance,
  request: FastifyRequest,
  reply: FastifyReply
) {
  const dbService: DbService = this.diContainer.resolve('dbService');
  const {chain, email: rawEmail} = request.body as any;

  try {
    const ticketId = await createSingleTicket(dbService, chain, rawEmail, {
      subject: EMAIL_TEMPLATE.subject,
      templateUrl: EMAIL_TEMPLATE.url,
    });
    return reply.status(201).send({ticketId});
  } catch (e: any) {
    return reply.status(400).send({
      error: e.message,
    });
  }
}

export const claimReward: Action = {
  path: '/',
  method: 'post',
  options: {
    schema: {
      body: z.object({
        signedToken: z.coerce.string(),
      }),
      response: {
        201: z.object({ticketId: z.string()}),
        400: errorResponseSchema,
      },
      security: [{jwt: []}],
    },
  },
  handler: claimRewardHandler,
};

async function claimRewardHandler(
  this: FastifyInstance,
  request: FastifyRequest,
  reply: FastifyReply
) {
  // const dbService: DbService = this.diContainer.resolve('dbService');
  const {signedToken} = request.body as any;

  let result = {};
  try {
    result = await verifyTicket(signedToken);
    // verify passed!
    return reply.status(200).send(result);
  } catch (e) {
    return reply.status(400).send({error: 'invalid signedToken!'});
  }
}
