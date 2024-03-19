export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/add-book', '/browse', '/edit-room'],
};
