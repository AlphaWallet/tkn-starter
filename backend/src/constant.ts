import {z} from 'zod';

export const MAX_LIMIT = 100;
export const DEVCON_ID = 'TODA';
export const TICKET_CLASS = 1;
export const EMAIL_TEMPLATE_URL =
  'https://d3eqrcfzdi90o1.cloudfront.net/emails/v1'; //dev
// 'http://127.0.0.1:8080/emails/v1';

export const errorResponseSchema = z.object({error: z.string()});
export const EMAIL_TEMPLATE: {
  [key: string]: {
    subject: string;
    url: string;
    bgColor: string;
    termsURL: string;
  };
} = {
  'new-media': {
    subject: 'Activate Your TODA New Media Pass',
    url: `${EMAIL_TEMPLATE_URL}/magiclink.template.html`,
    bgColor: '#ECFF31',
    termsURL: '476',
  },
  concerts: {
    subject: 'Activate Your TODA 360° Concerts Pass',
    url: `${EMAIL_TEMPLATE_URL}/magiclink.template.html`,
    bgColor: '#66FF7F',

    termsURL: '345',
  },
  'family-shows': {
    subject: 'Activate Your TODA Family Shows Pass',
    url: `${EMAIL_TEMPLATE_URL}/magiclink.template.html`,
    bgColor: '#8DDCFF',
    termsURL: '234',
  },
  wellness: {
    subject: 'Activate Your TODA Wellness Pass',
    url: `${EMAIL_TEMPLATE_URL}/magiclink.template.html`,
    bgColor: '#8ddcff',
    termsURL: '123',
  },
};

export function getEmailTemplate(theme: string) {
  return EMAIL_TEMPLATE[theme];
}

export const RESOURCE_ROOT = 'https://d3eqrcfzdi90o1.cloudfront.net'; // todo
