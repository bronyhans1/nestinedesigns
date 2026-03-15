import { redirect } from 'next/navigation';

/**
 * Application form lives at /register (upgraded Register flow).
 * Redirect any /application visitors to /register.
 */
export default function ApplicationPage() {
  redirect('/register');
}
