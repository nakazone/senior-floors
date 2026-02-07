'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
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

type QuoteItem = { id: number; floor_type: string; area_sqft: string; unit_price: string; total_price: string; notes: string | null }
type Quote = {
  id: number
  lead_id: number | null
  total_amount: string
  labor_amount: string | null
  materials_amount: string | null
  status: string | null
  sent_at: string | null
  approved_at: string | null
  created_at: string
  items?: QuoteItem[]
  quote_items?: QuoteItem[]
}

export default function QuoteDetailPage() {
  const params = useParams()
  const id = Number(params.id)
  const [quote, setQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('')
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    if (!id) return
    fetch(`/api/quotes/${id}`)
      .then((r) => r.json())
      .then((res) => {
        if (res.success && res.data) {
          setQuote(res.data)
          setStatus(res.data.status || 'draft')
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  const onUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)
    const res = await fetch(`/api/quotes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    const data = await res.json()
    setUpdating(false)
    if (data.success && data.data) {
      setQuote(data.data)
    } else {
      alert(data.message || 'Erro ao atualizar')
    }
  }

  const items = quote?.items ?? quote?.quote_items ?? []

  if (loading || !quote) {
    return (
      <div>
        <h1 style={{ marginBottom: 24, color: '#1a2036' }}>Orcamento #{id}</h1>
        {!loading && !quote && <p style={{ color: '#e53e3e' }}>Orcamento nao encontrado.</p>}
        {loading && <p style={{ color: '#64748b' }}>Carregando?</p>}
        <Link href="/quotes" style={{ color: '#1a2036', marginTop: 16, display: 'inline-block' }}>? Voltar</Link>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 8, color: '#1a2036' }}>Orcamento #{quote.id}</h1>
      <p style={{ marginBottom: 20 }}>
        <Link href="/quotes" style={{ color: '#1a2036', padding: '6px 12px', background: '#f1f5f9', borderRadius: 6, textDecoration: 'none', fontSize: 13 }}>? Voltar</Link>
        {quote.lead_id && (
          <> | <Link href={`/leads/${quote.lead_id}`} style={{ color: '#1a2036' }}>Ver lead</Link></>
        )}
      </p>

      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 20, marginBottom: 20 }}>
        <h2 style={{ marginTop: 0, marginBottom: 16, color: '#1a2036', fontSize: 18 }}>Resumo</h2>
        <div style={{ display: 'flex', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
          <span style={{ fontWeight: 600, color: '#4a5568', width: 140, flexShrink: 0 }}>Total</span>
          <span>R$ {Number(quote.total_amount).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        <div style={{ display: 'flex', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
          <span style={{ fontWeight: 600, color: '#4a5568', width: 140, flexShrink: 0 }}>Status</span>
          <span>{QUOTE_STATUS[quote.status || 'draft'] ?? quote.status}</span>
        </div>
        <form onSubmit={onUpdateStatus} style={{ marginTop: 16 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Alterar status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ padding: 10, border: '2px solid #e2e8f0', borderRadius: 6, marginRight: 8 }}
          >
            {Object.entries(QUOTE_STATUS).map(([k, l]) => (
              <option key={k} value={k}>{l}</option>
            ))}
          </select>
          <button
            type="submit"
            disabled={updating}
            style={{
              padding: '10px 20px',
              background: '#1a2036',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              fontWeight: 600,
              cursor: updating ? 'not-allowed' : 'pointer',
            }}
          >
            {updating ? 'Salvando?' : 'Atualizar'}
          </button>
        </form>
      </div>

      {items.length > 0 && (
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 20, marginBottom: 20 }}>
          <h2 style={{ marginTop: 0, marginBottom: 16, color: '#1a2036', fontSize: 18 }}>Itens</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f1f5f9', fontWeight: 600 }}>
                <th style={{ padding: 10, textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Tipo</th>
                <th style={{ padding: 10, textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Area (sqft)</th>
                <th style={{ padding: 10, textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Preco unit.</th>
                <th style={{ padding: 10, textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Total</th>
                <th style={{ padding: 10, textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Notas</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: 10 }}>{item.floor_type}</td>
                  <td style={{ padding: 10 }}>{item.area_sqft}</td>
                  <td style={{ padding: 10 }}>{item.unit_price}</td>
                  <td style={{ padding: 10 }}>R$ {Number(item.total_price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td style={{ padding: 10 }}>{item.notes || '?'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
