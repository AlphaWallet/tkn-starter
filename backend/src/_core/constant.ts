import pino from 'pino';
import {env} from '../env';

export const LOGGER = pino({level: env.LOG_LEVEL});

export const API_INFO = {
  title: 'TKN starter API',
  description: 'A backend api server for TKN starter.',
  version: '0.1.0',
};
