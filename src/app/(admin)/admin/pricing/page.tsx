// app/(admin)/admin/pricing/page.tsx
'use client';
import { useState } from 'react';
interface Plan {
  id: string;
  name: string;
  price: string;
  currency: string;
  description: string;
  trialDays: string;
  visible: boolean;
}
export default function PricingPage() {
  const [plans, setPlans] = useState<Plan[]>([
    { id: 'free', name: 'Free', price: '0', currency: 'NGN', description: 'Limited features', trialDays: '14', visible: true },
    { id: 'basic', name: 'Basic', price: '5000', currency: 'NGN', description: 'Basic plan for individuals', trialDays: '30', visible: true },
    { id: 'premium', name: 'Premium', price: '15000', currency: 'NGN', description: 'Advanced features', trialDays: '30', visible: true },
    { id: 'enterprise', name: 'Enterprise', price: 'Contact us', currency: 'NGN', description: 'Custom features and support', trialDays: '0', visible: true },
  ]);
  function updatePlan(id: string, field: keyof Plan, value: string | boolean) {
    setPlans((ps) => ps.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  }
  function addPlan() {
    const newPlan: Plan = { id: Date.now().toString(), name: 'New Plan', price: '0', currency: 'NGN', description: '', trialDays: '0', visible: true };
    setPlans((ps) => [...ps, newPlan]);
  }
  function save() {
    alert('Plans saved');
  }
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Pricing & Plans</h1>
      <button onClick={addPlan} className="mt-2 mb-4 px-3 py-1 bg-green-600 text-white rounded">Add Plan</button>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Currency</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Trial Days</th>
            <th className="p-2 border">Visible</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((p) => (
            <tr key={p.id} className="border">
              <td className="p-2 border">
                <input className="w-full border rounded px-1" value={p.name} onChange={(e) => updatePlan(p.id, 'name', e.target.value)} />
              </td>
              <td className="p-2 border">
                <input className="w-full border rounded px-1" value={p.price} onChange={(e) => updatePlan(p.id, 'price', e.target.value)} />
              </td>
              <td className="p-2 border">
                <input className="w-full border rounded px-1" value={p.currency} onChange={(e) => updatePlan(p.id, 'currency', e.target.value)} />
              </td>
              <td className="p-2 border">
                <input className="w-full border rounded px-1" value={p.description} onChange={(e) => updatePlan(p.id, 'description', e.target.value)} />
              </td>
              <td className="p-2 border">
                <input className="w-full border rounded px-1" value={p.trialDays} onChange={(e) => updatePlan(p.id, 'trialDays', e.target.value)} />
              </td>
              <td className="p-2 border text-center">
                <input type="checkbox" checked={p.visible} onChange={(e) => updatePlan(p.id, 'visible', e.target.checked)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={save} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Save</button>
    </main>
  );
}
