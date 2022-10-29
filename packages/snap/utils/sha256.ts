export const sha256 = async (secretKey: string): Promise<Uint8Array> => {
  const encoder = new TextEncoder();
  const msgBuffer = encoder.encode(secretKey);

  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return encoder.encode(hashHex);
};
