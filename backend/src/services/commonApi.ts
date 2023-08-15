import TTLCache from '@isaacs/ttlcache';
import axios from 'axios';
import {DEVCON_ID, TICKET_CLASS} from '../constant';
import {env} from '../env';

const catcheConfig = {
  max: 10000, // max cache size
  ttl: 3 * 60 * 60 * 1000, // 3 hours
};

const cache = new TTLCache(catcheConfig);

export async function createTicketLink(ticketId: string, email: string) {
  return (
    await axios.post(
      `${env.COMMON_API}/tickets`,
      {
        email,
        devconId: DEVCON_ID,
        ticketId,
        ticketClass: TICKET_CLASS,
        rootUrl: `${env.ROOT_URL_PREFIX}/ticket`,
        ticketType: 'eas',
      },
      {
        headers: {
          'x-stl-key': env.PROJECT_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    )
  ).data;
}

export async function verifyTicket(signedTicket: string, ticketType = 'eas') {
  let result;
  if (cache.has(signedTicket)) {
    result = cache.get(signedTicket);
  } else {
    result = (
      await axios.post(
        `${env.COMMON_API}/tickets/verify`,
        {
          devconId: DEVCON_ID,
          signedTicket,
          ticketClass: TICKET_CLASS,
          ticketType,
        },
        {
          headers: {
            'x-stl-key': env.PROJECT_API_KEY,
            'Content-Type': 'application/json',
          },
        }
      )
    ).data;
    cache.set(signedTicket, result);
  }
  return result;
}

export async function sendMail(
  email: string,
  subject: string,
  templateUrl: string,
  params: any
) {
  return await axios.post(
    `${env.COMMON_API}/mails`,
    {
      email,
      subject,
      templateUrl,
      params,
    },
    {
      headers: {
        'x-stl-key': env.PROJECT_API_KEY,
        'Content-Type': 'application/json',
      },
    }
  );
}
