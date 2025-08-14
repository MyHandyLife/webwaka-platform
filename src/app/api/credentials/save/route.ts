// app/api/credentials/save/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { encrypt } from '../_crypto';
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { env, keyName, value, userId } = body as {
    env: 'staging' | 'production';
    keyName: string;
    value: string;
    userId: string;
  };
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { cipher, iv } = await encrypt(process.env.KMS_SECRET!, value);
  const upsert = await supabase
    .from('admin_credentials')
    .upsert(
      {
        env,
        key_name: keyName,
        value_cipher: cipher,
        value_nonce: iv,
        updated_by: userId,
        verified: false,
      },
      { onConflict: 'env,key_name' }
    )
    .select();
  return NextResponse.json({ ok: !upsert.error, data: upsert.data, error: upsert.error });
}
