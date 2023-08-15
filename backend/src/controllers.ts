import {claimReward, createTicket} from './handlers/ticketsActions';
import {Controller, JwtFilterRule} from './_core/type';

export const controllers: Controller[] = [
  {
    prefix: '/tickets',
    actions: [createTicket],
  },
  {
    prefix: '/reward',
    actions: [claimReward],
  },
];

export const securityRules: JwtFilterRule[] = [{pattern: /^\/tickets/}];
