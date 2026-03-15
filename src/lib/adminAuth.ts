const encoder = new TextEncoder();

function getAdminSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    throw new Error(
      'ADMIN_SECRET is not set. Please define it in your environment variables.'
    );
  }
  return secret;
}

function toBase64Url(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = typeof btoa !== 'undefined'
    ? btoa(binary)
    : Buffer.from(binary, 'binary').toString('base64');
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(input: string): ArrayBuffer {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '==='.slice((base64.length + 3) % 4);
  const binary = typeof atob !== 'undefined'
    ? atob(padded)
    : Buffer.from(padded, 'base64').toString('binary');
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

async function getKey() {
  const secret = getAdminSecret();
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

export async function createAdminToken(username: string): Promise<string> {
  const payload = JSON.stringify({
    username,
    iat: Date.now(),
  });
  const key = await getKey();
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(payload)
  );
  const payloadB64 = toBase64Url(encoder.encode(payload));
  const sigB64 = toBase64Url(signature);
  return `${payloadB64}.${sigB64}`;
}

export async function verifyAdminToken(
  token: string
): Promise<{ valid: boolean; username?: string }> {
  const parts = token.split('.');
  if (parts.length !== 2) {
    return { valid: false };
  }
  const [payloadB64, sigB64] = parts;

  try {
    const payloadBytes = fromBase64Url(payloadB64);
    const signatureBytes = fromBase64Url(sigB64);
    const payloadStr = new TextDecoder().decode(payloadBytes);
    const payload = JSON.parse(payloadStr) as { username?: string; iat?: number };

    const key = await getKey();
    const ok = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBytes,
      encoder.encode(payloadStr)
    );

    if (!ok || !payload.username) {
      return { valid: false };
    }

    return { valid: true, username: payload.username };
  } catch {
    return { valid: false };
  }
}

