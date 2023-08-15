import pino from 'pino';
import {env} from '../env';

export const LOGGER = pino({level: env.LOG_LEVEL});

export const API_INFO = {
  title: 'Smart Layer API',
  description: 'A backend api server for smart layer.',
  version: '0.1.0',
};
