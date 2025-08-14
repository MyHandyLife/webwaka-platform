// app/(admin)/admin/partners/page.tsx
'use client';
import { useState } from 'react';
interface Level {
  id: string;
  name: string;
  commission: string;
  reseller: boolean;
  whitelabel: boolean;
}
export default function PartnersPage() {
  const [levels, setLevels] = useState<Level[]>([
    { id: 'affiliate', name: 'Affiliate', commission: '5', reseller: false, whitelabel: false },
    { id: 'reseller', name: 'Reseller', commission: '10', reseller: true, whitelabel: false },
    { id: 'whitelabel', name: 'Whitelabel', commission: '15', reseller: true, whitelabel: true },
  ]);
  function updateLevel(id: string, field: keyof Level, value: string | boolean) {
    setLevels((lv) => lv.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  }
  function addLevel() {
    const newLevel: Level = { id: Date.now().toString(), name: 'New Level', commission: '0', reseller: false, whitelabel: false };
    setLevels((lv) => [...lv, newLevel]);
  }
  function save() {
    alert('Partner levels saved');
  }
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Partner Management</h1>
      <button onClick={addLevel} className="mt-2 mb-4 px-3 py-1 bg-green-600 text-white rounded">Add Level</button>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Commission (%)</th>
            <th className="p-2 border">Can Resell</th>
            <th className="p-2 border">Whitelabel</th>
          </tr>
        </thead>
        <tbody>
          {levels.map((l) => (
            <tr key={l.id} className="border">
              <td className="p-2 border">
                <input className="w-full border rounded px-1" value={l.name} onChange={(e) => updateLevel(l.id, 'name', e.target.value)} />
              </td>
              <td className="p-2 border">
                <input className="w-full border rounded px-1" value={l.commission} onChange={(e) => updateLevel(l.id, 'commission', e.target.value)} />
              </td>
              <td className="p-2 border text-center">
                <input type="checkbox" checked={l.reseller} onChange={(e) => updateLevel(l.id, 'reseller', e.target.checked)} />
              </td>
              <td className="p-2 border text-center">
                <input type="checkbox" checked={l.whitelabel} onChange={(e) => updateLevel(l.id, 'whitelabel', e.target.checked)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={save} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Save</button>
    </main>
  );
}
