export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/add-book', '/complains', '/edit-room'],
};
