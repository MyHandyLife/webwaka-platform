// app/api/orchestrate/start/route.ts
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
  return NextResponse.json({ started: true, opId: `op_${Date.now()}` });
}
