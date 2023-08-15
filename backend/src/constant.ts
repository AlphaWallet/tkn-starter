import {z} from 'zod';

export const MAX_LIMIT = 100;
export const DEVCON_ID = 'DEMO';
export const TICKET_CLASS = 1;

export const errorResponseSchema = z.object({error: z.string()});
export const EMAIL_TEMPLATE = {
  subject: 'Activate Your Pass',
  url: `https://d3eqrcfzdi90o1.cloudfront.net/demo-magiclink.template.html`,
};

export const RESOURCE_ROOT = 'https://d3eqrcfzdi90o1.cloudfront.net';
