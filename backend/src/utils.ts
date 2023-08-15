export function normalizeEmail(email: string): string {
  const parts = email.toLowerCase().split('@');

  if (parts.length !== 2) {
    throw new Error(`Invalid email: ${email}`);
  }

  // Remove dots and everything after a plus sign
  // https://support.google.com/mail/answer/7436150?hl=en#:~:text=If%20someone%20accidentally%20adds%20dots,john.smith%40gmail.com
  // https://support.google.com/a/users/answer/9282734?hl=en
  return `${parts[0].replace(/\./g, '').split('+')[0]}@${parts[1]}`;
}
