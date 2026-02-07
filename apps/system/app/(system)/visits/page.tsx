'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const STATUS_LABELS: Record<string, string> = {
  scheduled: 'Agendada',
  completed: 'Realizada',
  cancelled: 'Cancelada',
  no_show: 'Nao compareceu',
}

type Visit = {
  id: number
  lead_id: number | null
  scheduled_at: string
  status: string | null
  address: string | null
  lead?: { id: number; name: string; email: string; phone: string | null } | null
}

type User = { id: number; name: string }

export default function VisitsPage() {
  const [visits, setVisits] = useState<Visit[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    lead_id: '',
    scheduled_at: '',
    seller_id: '',
    technician_id: '',
    address: '',
    notes: '',
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch('/api/visits').then((r) => r.json()),
      fetch('/api/users').then((r) => r.json()),
    ]).then(([vRes, uRes]) => {
      if (vRes.success && vRes.data) setVisits(vRes.data)
      if (uRes.success && uRes.users) setUsers(uRes.users)
      setLoading(false)
    })
  }, [])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.scheduled_at || !form.lead_id) {
      alert('Informe data/hora e lead.')
      return
    }
    setSubmitting(true)
    const res = await fetch('/api/visits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lead_id: Number(form.lead_id),
        scheduled_at: form.scheduled_at,
        seller_id: form.seller_id ? Number(form.seller_id) : null,
        technician_id: form.technician_id ? Number(form.technician_id) : null,
        address: form.address || undefined,
        notes: form.notes || undefined,
      }),
    })
    const data = await res.json()
    setSubmitting(false)
    if (data.success) {
      setVisits((prev) => [data.data, ...prev])
      setForm({ lead_id: '', scheduled_at: '', seller_id: '', technician_id: '', address: '', notes: '' })
    } else {
      alert(data.message || 'Erro ao agendar')
    }
  }

  if (loading) {
    return (
      <div>
        <h1 style={{ marginBottom: 24, color: '#1a2036' }}>Visitas e medicoes</h1>
        <p style={{ color: '#64748b' }}>Carregando...</p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 8, color: '#1a2036', fontSize: 22, fontWeight: 700 }}>Visitas e medicoes</h1>
      <p style={{ color: '#64748b', marginBottom: 20 }}>Agende visitas, registre medi??es e vincule ao lead/projeto.</p>

      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 20, marginBottom: 20 }}>
        <h3 style={{ marginTop: 0, marginBottom: 16, color: '#1a2036', fontSize: 18 }}>Nova visita</h3>
        <form onSubmit={onSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 640 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#4a5568' }}>Lead (ID)</label>
            <input
              type="number"
              min={1}
              value={form.lead_id}
              onChange={(e) => setForm((f) => ({ ...f, lead_id: e.target.value }))}
              placeholder="ID do lead"
              style={{ width: '100%', padding: 10, border: '2px solid #e2e8f0', borderRadius: 6 }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#4a5568' }}>Data e hora</label>
            <input
              type="datetime-local"
              required
              value={form.scheduled_at}
              onChange={(e) => setForm((f) => ({ ...f, scheduled_at: e.target.value }))}
              style={{ width: '100%', padding: 10, border: '2px solid #e2e8f0', borderRadius: 6 }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#4a5568' }}>Vendedor</label>
            <select
              value={form.seller_id}
              onChange={(e) => setForm((f) => ({ ...f, seller_id: e.target.value }))}
              style={{ width: '100%', padding: 10, border: '2px solid #e2e8f0', borderRadius: 6 }}
            >
              <option value="">-</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#4a5568' }}>Tecnico / Medidor</label>
            <select
              value={form.technician_id}
              onChange={(e) => setForm((f) => ({ ...f, technician_id: e.target.value }))}
              style={{ width: '100%', padding: 10, border: '2px solid #e2e8f0', borderRadius: 6 }}
            >
              <option value="">-</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#4a5568' }}>Endere?o</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
              placeholder="Endere?o da visita"
              style={{ width: '100%', padding: 10, border: '2px solid #e2e8f0', borderRadius: 6 }}
            />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#4a5568' }}>Observacoes</label>
            <textarea
              rows={2}
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              placeholder="Checklist, observacoes"
              style={{ width: '100%', padding: 10, border: '2px solid #e2e8f0', borderRadius: 6 }}
            />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #1a2036 0%, #252b47 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                fontWeight: 600,
                cursor: submitting ? 'not-allowed' : 'pointer',
              }}
            >
              {submitting ? 'Salvando...?' : 'Agendar visita'}
            </button>
          </div>
        </form>
      </div>

      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 20, overflow: 'hidden' }}>
        <h3 style={{ marginTop: 0, marginBottom: 16, color: '#1a2036', fontSize: 18 }}>Lista de visitas</h3>
        {visits.length === 0 ? (
          <p style={{ color: '#64748b', padding: 40, textAlign: 'center' }}>Nenhuma visita cadastrada.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#1a2036', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>ID</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Lead</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Data/Hora</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Endere?o</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}></th>
              </tr>
            </thead>
            <tbody>
              {visits.map((v) => (
                <tr key={v.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px' }}>{v.id}</td>
                  <td style={{ padding: '12px 16px' }}>
                    {v.lead_id ? (
                      <Link href={`/leads/${v.lead_id}`} style={{ color: '#1a2036' }}>
                        {v.lead?.name ?? `Lead #${v.lead_id}`}
                      </Link>
                    ) : (
                      '?'
                    )}
                  </td>
                  <td style={{ padding: '12px 16px' }}>{new Date(v.scheduled_at).toLocaleString('pt-BR')}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 10px',
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 600,
                        background: (v.status === 'completed' && '#dcfce7') || (v.status === 'cancelled' && '#fee2e2') || (v.status === 'no_show' && '#fef3c7') || '#dbeafe',
                        color: (v.status === 'completed' && '#166534') || (v.status === 'cancelled' && '#991b1b') || (v.status === 'no_show' && '#92400e') || '#1d4ed8',
                      }}
                    >
                      {STATUS_LABELS[v.status || 'scheduled'] ?? v.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>{(v.address || '').slice(0, 40)}{(v.address?.length ?? 0) > 40 ? '?' : ''}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <Link href={`/visits/${v.id}`} style={{ color: '#1a2036', fontWeight: 500 }}>Ver / Medicao</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
