'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const QUOTE_STATUS: Record<string, string> = {
  draft: 'Rascunho',
  sent: 'Enviado',
  viewed: 'Visualizado',
  approved: 'Aprovado',
  accepted: 'Aceito',
  rejected: 'Rejeitado',
  declined: 'Recusado',
  expired: 'Expirado',
}

const FLOOR_TYPES: Record<string, string> = {
  vinyl: 'Vinyl',
  hardwood: 'Hardwood',
  tile: 'Tile',
  carpet: 'Carpet',
  refinishing: 'Refinishing',
  laminate: 'Laminate',
  other: 'Outro',
}

type Quote = {
  id: number
  lead_id: number | null
  total_amount: string
  status: string | null
  created_at: string
  lead?: { id: number; name: string; email: string } | null
}

type Lead = { id: number; name: string; email: string }

export default function QuotesPage() {
  const router = useRouter()
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('')
  const [form, setForm] = useState({
    lead_id: '',
    floor_type: 'other',
    area_sqft: '',
    unit_price: '',
    margin_percent: '15',
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch(`/api/quotes${filterStatus ? `?status=${encodeURIComponent(filterStatus)}` : ''}`).then((r) => r.json()),
      fetch('/api/leads?limit=100').then((r) => r.json()),
    ]).then(([qRes, lRes]) => {
      if (qRes.success && qRes.data) setQuotes(qRes.data)
      if (lRes.success && lRes.data) setLeads(lRes.data)
      setLoading(false)
    })
  }, [filterStatus])

  const filteredQuotes = quotes

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const leadId = Number(form.lead_id)
    const area = Number(form.area_sqft.replace(',', '.'))
    const unit = Number(form.unit_price.replace(',', '.'))
    const marginPercent = Number(form.margin_percent.replace(',', '.')) || 15
    if (!leadId || area <= 0 || unit < 0) {
      alert('Informe lead, metragem e preco unitario.')
      return
    }
    const materials = area * unit
    setSubmitting(true)
    const margin = marginPercent || 15
    const res = await fetch('/api/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lead_id: leadId,
        margin_percent: margin,
        items: [{ floor_type: form.floor_type, area_sqft: area, unit_price: unit, total_price: materials, notes: '' }],
      }),
    })
    const data = await res.json()
    setSubmitting(false)
    if (data.success && data.data) {
      router.push(`/quotes/${data.data.id}`)
      return
    }
    alert(data.message || 'Erro ao criar orcamento')
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 8, color: '#1a2036', fontSize: 22, fontWeight: 700 }}>Orcamentos</h1>
      <p style={{ color: '#64748b', marginBottom: 20 }}>Crie e gerencie or?amentos. Filtros por status. Abra um or?amento para editar itens e status.</p>

      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 20, marginBottom: 20 }}>
        <h3 style={{ marginTop: 0, marginBottom: 16, color: '#1a2036', fontSize: 18 }}>Novo orcamento (rapido)</h3>
        <form onSubmit={onSubmit} style={{ maxWidth: 560 }}>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Lead</label>
            <select
              required
              value={form.lead_id}
              onChange={(e) => setForm((f) => ({ ...f, lead_id: e.target.value }))}
              style={{ width: '100%', padding: 10, border: '2px solid #e2e8f0', borderRadius: 6 }}
            >
              <option value="">-- Selecione o lead --</option>
              {leads.map((l) => (
                <option key={l.id} value={l.id}>{l.name} - {l.email} - #{l.id}</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Tipo de piso</label>
            <select
              value={form.floor_type}
              onChange={(e) => setForm((f) => ({ ...f, floor_type: e.target.value }))}
              style={{ width: '100%', padding: 10, border: '2px solid #e2e8f0', borderRadius: 6 }}
            >
              {Object.entries(FLOOR_TYPES).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Metragem (sqft)</label>
            <input
              type="text"
              required
              value={form.area_sqft}
              onChange={(e) => setForm((f) => ({ ...f, area_sqft: e.target.value }))}
              placeholder="Ex: 450"
              style={{ width: '100%', padding: 10, border: '2px solid #e2e8f0', borderRadius: 6 }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Pre?o unit?rio ($/sqft)</label>
            <input
              type="text"
              required
              value={form.unit_price}
              onChange={(e) => setForm((f) => ({ ...f, unit_price: e.target.value }))}
              placeholder="Ex: 5.50"
              style={{ width: '100%', padding: 10, border: '2px solid #e2e8f0', borderRadius: 6 }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Margem (%)</label>
            <input
              type="text"
              value={form.margin_percent}
              onChange={(e) => setForm((f) => ({ ...f, margin_percent: e.target.value }))}
              placeholder="15"
              style={{ width: '100%', padding: 10, border: '2px solid #e2e8f0', borderRadius: 6 }}
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            style={{
              padding: '10px 20px',
              background: '#1a2036',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              fontWeight: 600,
              cursor: submitting ? 'not-allowed' : 'pointer',
            }}
          >
            {submitting ? 'Criando...' : 'Criar e editar orcamento'}
          </button>
        </form>
      </div>

      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 20, marginBottom: 20 }}>
        <h3 style={{ marginTop: 0, marginBottom: 16, color: '#1a2036', fontSize: 18 }}>Lista de or?amentos</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-end', marginBottom: 20 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ padding: '8px 12px', border: '2px solid #e2e8f0', borderRadius: 6 }}
            >
              <option value="">-- Todos --</option>
              {Object.entries(QUOTE_STATUS).map(([k, l]) => (
                <option key={k} value={k}>{l}</option>
              ))}
            </select>
          </div>
          <Link href="/quotes" style={{ color: '#64748b', fontSize: 14 }}>Limpar</Link>
        </div>
        {loading ? (
          <p style={{ color: '#64748b' }}>Carregando?</p>
        ) : filteredQuotes.length === 0 ? (
          <p style={{ color: '#64748b' }}>Nenhum orcamento encontrado.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#1a2036', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>N? / ID</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Cliente / Lead</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Total</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Data</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotes.map((q) => (
                <tr key={q.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 16px' }}>#{q.id}</td>
                  <td style={{ padding: '12px 16px' }}>
                    {q.lead_id ? (
                      <Link href={`/leads/${q.lead_id}`} style={{ color: '#1a2036' }}>
                        {q.lead?.name ?? `Lead #${q.lead_id}`}
                      </Link>
                    ) : (
                      q.lead?.name ?? '-'
                    )}
                  </td>
                  <td style={{ padding: '12px 16px' }}>R$ {Number(q.total_amount).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 10px',
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 600,
                        background: (q.status === 'approved' || q.status === 'accepted') ? '#dcfce7' : (q.status === 'rejected' || q.status === 'declined') ? '#fee2e2' : (q.status === 'sent' || q.status === 'viewed') ? '#dbeafe' : '#e2e8f0',
                        color: (q.status === 'approved' || q.status === 'accepted') ? '#166534' : (q.status === 'rejected' || q.status === 'declined') ? '#991b1b' : (q.status === 'sent' || q.status === 'viewed') ? '#1d4ed8' : '#475569',
                      }}
                    >
                      {QUOTE_STATUS[q.status || 'draft'] ?? q.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>{new Date(q.created_at).toLocaleDateString('pt-BR')}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <Link href={`/quotes/${q.id}`} style={{ padding: '6px 12px', background: '#1a2036', color: '#fff', borderRadius: 6, fontSize: 13, textDecoration: 'none' }}>Ver / Editar</Link>
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
