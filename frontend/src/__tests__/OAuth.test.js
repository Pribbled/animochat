/**
 * Unit testing for OAuth signIn callback
 *
 * PURPOSE:
 * - to make sure that the callback only allows for @dlsu.edu.ph domains.
 */

// next-auth is mocked, as it interferes with Jest because of next-auth uses ESM only stuff.
jest.mock("next-auth", () => {
    return jest.fn(() => {}); 
});

import { signInCallback } from '@/app/api/auth/[...nextauth]/route';

test('allows for login with @dlsu.edu.ph emails', async () => {
    const result = await signInCallback({ profile: { email: "someone@dlsu.edu.ph" }});
    expect(result).toBe(true);
});

test('rejects for login with non-DLSU emails', async () => {
    const result = await signInCallback({ profile: { email: "someone@gmail.com" }});
    expect(result).toBe(false);
});

test ('rejects when no email is provided', async () => {
    const result = await signInCallback({ profile: { email: "" }});
    expect(result).toBe(false);
});
