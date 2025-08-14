// app/api/credentials/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';

async function verifyOpenAI(key: string) {
  try {
    const r = await fetch('https://api.openai.com/v1/models', {
      headers: { Authorization: `Bearer ${key}` },
    });
    return r.ok;
  } catch {
    return false;
  }
}
async function verifyGemini(key: string) {
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
    return r.ok;
  } catch {
    return false;
  }
}
async function verifyAnthropic(key: string) {
  try {
    const r = await fetch('https://api.anthropic.com/v1/models', {
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01' },
    });
    return r.ok;
  } catch {
    return false;
  }
}
async function verifyOpenRouter(key: string) {
  try {
    const r = await fetch('https://openrouter.ai/api/v1/models', {
      headers: { Authorization: `Bearer ${key}` },
    });
    return r.ok;
  } catch {
    return false;
  }
}
async function verifyPaystack(secret: string) {
  try {
    const r = await fetch('https://api.paystack.co/bank', {
      headers: { Authorization: `Bearer ${secret}` },
    });
    return r.ok;
  } catch {
    return false;
  }
}
async function verifyFlutterwave(secret: string) {
  try {
    const r = await fetch('https://api.flutterwave.com/v3/banks/NG', {
      headers: { Authorization: `Bearer ${secret}` },
    });
    return r.ok;
  } catch {
    return false;
  }
}
async function verifyTermii(key: string) {
  try {
    const r = await fetch(`https://api.ng.termii.com/api/sender-id?api_key=${key}`);
    return r.ok;
  } catch {
    return false;
  }
}
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { keyName, value } = body as { keyName: string; value: string };
  const ok = await (async () => {
    switch (keyName) {
      case 'OPENAI_API_KEY':
        return verifyOpenAI(value);
      case 'GOOGLE_API_KEY':
        return verifyGemini(value);
      case 'ANTHROPIC_API_KEY':
        return verifyAnthropic(value);
      case 'OPENROUTER_API_KEY':
        return verifyOpenRouter(value);
      case 'PAYSTACK_SECRET_KEY':
        return verifyPaystack(value);
      case 'FLUTTERWAVE_SECRET_KEY':
        return verifyFlutterwave(value);
      case 'TERMII_API_KEY':
        return verifyTermii(value);
      default:
        return true;
    }
  })();
  return NextResponse.json({ verified: ok });
}
