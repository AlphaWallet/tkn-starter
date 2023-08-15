import axios from 'axios';
import {DEVCON_ID, TICKET_CLASS} from '../constant';
import {env} from '../env';

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
