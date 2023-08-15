import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import z from 'zod';
import {EMAIL_TEMPLATE, errorResponseSchema, RESOURCE_ROOT} from '../constant';
import {
  createSingleTicket,
  resendSingleTicket,
} from '../services/ticketsService';
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
        theme: z.string(),
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
  const {chain, email: rawEmail, theme} = request.body as any;
  const email_template = EMAIL_TEMPLATE[theme];

  if (!email_template) {
    return reply.status(400).send({
      error: 'No theme to use!',
    });
  }

  let mail = {
    subject: email_template.subject,
    templateUrl: email_template.url,
    moreParams: {
      theme: theme,
      bgColor: email_template.bgColor,
      termsURL: email_template.termsURL,
      resourceRoot: RESOURCE_ROOT,
    },
  };

  try {
    const ticketId = await createSingleTicket(dbService, chain, rawEmail, mail);
    return reply.status(201).send({ticketId});
  } catch (e: any) {
    return reply.status(400).send({
      error: e.message,
    });
  }
}

export const resendTicket: Action = {
  path: '/resend',
  method: 'put',
  options: {
    schema: {
      body: z.object({
        chain: z.coerce.number(),
        email: z.string().email(),
        theme: z.string(),
      }),
      response: {
        201: z.object({ticketId: z.string()}),
        400: errorResponseSchema,
      },
      security: [{jwt: []}],
    },
  },
  handler: resendTicketHandler,
};

async function resendTicketHandler(
  this: FastifyInstance,
  request: FastifyRequest,
  reply: FastifyReply
) {
  const dbService: DbService = this.diContainer.resolve('dbService');
  const {chain, email: rawEmail, theme} = request.body as any;
  const email_template = EMAIL_TEMPLATE[theme];

  if (!email_template) {
    return reply.status(400).send({
      error: 'No theme to use!',
    });
  }

  let mail = {
    subject: email_template.subject,
    templateUrl: email_template.url,
    moreParams: {
      theme: theme,
      bgColor: email_template.bgColor,
      termsURL: email_template.termsURL,
      resourceRoot: RESOURCE_ROOT,
    },
  };

  try {
    const ticketId = await resendSingleTicket(dbService, chain, rawEmail, mail);
    return reply.status(201).send({ticketId});
  } catch (e: any) {
    return reply.status(400).send({
      error: e.message,
    });
  }
}
