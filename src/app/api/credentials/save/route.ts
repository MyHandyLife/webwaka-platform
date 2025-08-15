export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { encrypt } from "../_crypto";

export async function POST(req: NextRequest) {
  const { env, keyName, value, userId } = await req.json();

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.KMS_SECRET) {
    return NextResponse.json({ ok: false, error: "Server env misconfigured" }, { status: 500 });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { cipher, iv } = await encrypt(process.env.KMS_SECRET!, value || "");

  const { data, error } = await supabase
    .from("admin_credentials")
    .upsert(
      {
        env,
        key_name: keyName,
        value_cipher: cipher,   // base64 text
        value_nonce: iv,        // base64 text
        updated_by: userId,
        verified: false
      },
      { onConflict: "env,key_name" }
    )
    .select();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, data });
}
