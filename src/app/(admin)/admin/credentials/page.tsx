// app/(admin)/admin/credentials/page.tsx
'use client';
import { useState } from 'react';
import schema from '../../../credentials/credentials.schema.json';

export default function CredentialsPage() {
  const [env, setEnv] = useState<'staging' | 'production'>('staging');
  const [values, setValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Record<string, string>>({});
  const fields = (schema as any).fields as { key: string; label: string; type: 'secret' | 'text' }[];
  async function verify(keyName: string) {
    const value = values[keyName] || '';
    const r = await fetch('/api/credentials/verify', {
      method: 'POST',
      body: JSON.stringify({ keyName, value }),
    });
    const j = await r.json();
    setStatus((s) => ({ ...s, [keyName]: j.verified ? '✅ Verified' : '❌ Invalid' }));
  }
  async function save(keyName: string) {
    const value = values[keyName] || '';
    const r = await fetch('/api/credentials/save', {
      method: 'POST',
      body: JSON.stringify({ env, keyName, value, userId: 'superadmin' }),
    });
    const j = await r.json();
    setStatus((s) => ({ ...s, [keyName]: j.ok ? '💾 Saved' : '⚠️ Save failed' }));
  }
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Credentials ({env})</h1>
      <div className="mt-4 flex gap-2">
        <button className={`px-3 py-1 rounded ${env === 'staging' ? 'bg-black text-white' : 'bg-gray-200'}`} onClick={() => setEnv('staging')}>
          Staging
        </button>
        <button className={`px-3 py-1 rounded ${env === 'production' ? 'bg-black text-white' : 'bg-gray-200'}`} onClick={() => setEnv('production')}>
          Production
        </button>
      </div>
      <div className="mt-6 grid gap-4">
        {fields.map((f) => (
          <div key={f.key} className="border rounded p-3">
            <label className="block text-sm font-medium">{f.label}</label>
            <input
              type={f.type === 'secret' ? 'password' : 'text'}
              className="mt-1 w-full border rounded px-2 py-1"
              placeholder={`Enter ${f.label}`}
              onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
            />
            <div className="mt-2 flex gap-2">
              <button className="px-3 py-1 rounded bg-blue-600 text-white" onClick={() => verify(f.key)}>
                Verify
              </button>
              <button className="px-3 py-1 rounded bg-green-600 text-white" onClick={() => save(f.key)}>
                Save
              </button>
              <span className="text-sm">{status[f.key] || ''}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
