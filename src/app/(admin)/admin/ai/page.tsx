// app/(admin)/admin/ai/page.tsx
'use client';
import { useState } from 'react';
interface Model {
  id: string;
  name: string;
  provider: string;
  price: number;
  context: number;
  enabled: boolean;
  budget: string;
}
export default function AIConfigPage() {
  const [models, setModels] = useState<Model[]>([
    { id: 'gpt-5', name: 'GPT‑5', provider: 'OpenAI', price: 0.01, context: 128000, enabled: true, budget: '100' },
    { id: 'gemini-2.5', name: 'Gemini 2.5 Pro', provider: 'Google', price: 0.008, context: 1000000, enabled: true, budget: '80' },
    { id: 'gemini-1.5', name: 'Gemini 1.5 Pro', provider: 'Google', price: 0.006, context: 1000000, enabled: false, budget: '50' },
    { id: 'claude-3', name: 'Claude 3', provider: 'Anthropic', price: 0.009, context: 200000, enabled: false, budget: '30' },
  ]);
  function toggleModel(id: string) {
    setModels((ms) => ms.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m)));
  }
  function updateBudget(id: string, value: string) {
    setModels((ms) => ms.map((m) => (m.id === id ? { ...m, budget: value } : m)));
  }
  function save() {
    alert('AI settings saved');
  }
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">AI Config & Monitoring</h1>
      <table className="mt-4 w-full border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Model</th>
            <th className="p-2 border">Provider</th>
            <th className="p-2 border">Price/token</th>
            <th className="p-2 border">Context</th>
            <th className="p-2 border">Enabled</th>
            <th className="p-2 border">Budget ($)</th>
          </tr>
        </thead>
        <tbody>
          {models.map((m) => (
            <tr key={m.id} className="border">
              <td className="p-2 border">{m.name}</td>
              <td className="p-2 border">{m.provider}</td>
              <td className="p-2 border">${m.price.toFixed(3)}</td>
              <td className="p-2 border">{m.context.toLocaleString()}</td>
              <td className="p-2 border text-center">
                <input type="checkbox" checked={m.enabled} onChange={() => toggleModel(m.id)} />
              </td>
              <td className="p-2 border">
                <input type="number" value={m.budget} onChange={(e) => updateBudget(m.id, e.target.value)} className="w-20 border rounded px-1 py-0.5" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={save} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Save</button>
    </main>
  );
}
