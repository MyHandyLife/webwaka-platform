// app/api/credentials/_crypto.ts
import { webcrypto as crypto } from 'crypto';

export async function encrypt(secretKey: string, plaintext: string) {
  const enc = new TextEncoder();
  const keyData = enc.encode(secretKey.padEnd(32).slice(0, 32));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await crypto.subtle.importKey('raw', keyData, 'AES-GCM', false, ['encrypt']);
  const cipher = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(plaintext));
  return { cipher: Buffer.from(cipher), iv: Buffer.from(iv) };
}

export async function decrypt(secretKey: string, cipher: Buffer, iv: Buffer) {
  const enc = new TextEncoder();
  const keyData = enc.encode(secretKey.padEnd(32).slice(0, 32));
  const key = await crypto.subtle.importKey('raw', keyData, 'AES-GCM', false, ['decrypt']);
  const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, cipher);
  return Buffer.from(plain).toString('utf8');
}
