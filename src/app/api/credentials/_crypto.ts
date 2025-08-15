await fetch("/api/credentials/verify", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ keyName, value })
});

import { webcrypto as crypto } from "crypto";

export async function encrypt(secretKey: string, plaintext: string) {
  const enc = new TextEncoder();
  const keyData = enc.encode(secretKey.padEnd(32).slice(0,32));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await crypto.subtle.importKey("raw", keyData, "AES-GCM", false, ["encrypt"]);
  const cipherBuf = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, enc.encode(plaintext));
  return {
    cipher: Buffer.from(cipherBuf).toString("base64"),
    iv: Buffer.from(iv).toString("base64")
  };
}
