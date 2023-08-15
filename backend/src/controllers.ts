import {createTicket, resendTicket} from './handlers/ticketsActions';
import {Controller, JwtFilterRule} from './_core/type';

export const controllers: Controller[] = [
  {
    prefix: '/tickets',
    actions: [createTicket, resendTicket],
  },
];

export const securityRules: JwtFilterRule[] = [{pattern: /^\/tickets/}];
