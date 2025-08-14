// app/(admin)/admin/enterprise/page.tsx
'use client';
import { useState } from 'react';
interface Module {
  id: string;
  name: string;
  selected: boolean;
}
export default function EnterprisePage() {
  const [modules, setModules] = useState<Module[]>([
    { id: 'auth', name: 'Authentication', selected: true },
    { id: 'payments', name: 'Payments', selected: true },
    { id: 'messaging', name: 'Messaging', selected: true },
    { id: 'analytics', name: 'Analytics', selected: true },
    { id: 'partners', name: 'Partner Management', selected: false },
    { id: 'pricing', name: 'Pricing & Plans', selected: false },
    { id: 'ai', name: 'AI Configuration', selected: false },
    { id: 'system-hospital', name: 'Healthcare System', selected: false },
    { id: 'system-school', name: 'School System', selected: false },
  ]);
  const [domain, setDomain] = useState('');
  const [status, setStatus] = useState('');
  function toggleModule(id: string) {
    setModules((ms) => ms.map((m) => (m.id === id ? { ...m, selected: !m.selected } : m)));
  }
  async function deploy() {
    setStatus('Deploying...');
    await new Promise((r) => setTimeout(r, 1000));
    setStatus('Deployment triggered! Check status in the portal.');
  }
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Hosted Enterprise Deployment</h1>
      <div className="mt-4">
        <label className="block font-medium">Custom Domain / Subdomain</label>
        <input
          className="mt-1 w-full border rounded px-2 py-1"
          placeholder="e.g. enterprise.mycompany.com"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />
      </div>
      <h2 className="mt-6 text-xl font-semibold">Select Modules</h2>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
        {modules.map((m) => (
          <label key={m.id} className="flex items-center space-x-2">
            <input type="checkbox" checked={m.selected} onChange={() => toggleModule(m.id)} />
            <span>{m.name}</span>
          </label>
        ))}
      </div>
      <button onClick={deploy} className="mt-6 px-4 py-2 bg-blue-600 text-white rounded">Deploy</button>
      <p className="mt-3 text-sm">{status}</p>
    </main>
  );
}
