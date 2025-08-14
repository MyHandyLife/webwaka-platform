// app/(admin)/admin/page.tsx
export default function AdminHome() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">WebWaka Admin</h1>
      <ul className="mt-4 list-disc pl-5 space-y-2">
        <li><a className="underline" href="/admin/credentials">Credentials</a></li>
        <li><a className="underline" href="/admin/ai">AI Config & Monitoring</a></li>
        <li><a className="underline" href="/admin/pricing">Pricing & Plans</a></li>
        <li><a className="underline" href="/admin/partners">Partner Management</a></li>
        <li><a className="underline" href="/admin/enterprise">Hosted Enterprise</a></li>
      </ul>
    </main>
  );
}
