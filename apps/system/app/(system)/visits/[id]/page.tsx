'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
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
  ended_at: string | null
  status: string | null
  address: string | null
  notes: string | null
  seller_id: number | null
  technician_id: number | null
}

export default function VisitDetailPage() {
  const params = useParams()
  const id = Number(params.id)
  const [visit, setVisit] = useState<Visit | null>(null)
  const [leadName, setLeadName] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('')
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    if (!id) return
    fetch(`/api/visits/${id}`)
      .then((r) => r.json())
      .then((res) => {
        if (res.success && res.data) {
          setVisit(res.data)
          setStatus(res.data.status || 'scheduled')
          if (res.data.lead_id) {
            fetch(`/api/leads/${res.data.lead_id}`)
              .then((r2) => r2.json())
              .then((r2d) => {
                if (r2d.success && r2d.data) setLeadName(r2d.data.name || '')
              })
          }
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  const onUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)
    const res = await fetch(`/api/visits/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    const data = await res.json()
    setUpdating(false)
    if (data.success && data.data) {
      setVisit(data.data)
    } else {
      alert(data.message || 'Erro ao atualizar')
    }
  }

  if (loading || !visit) {
    return (
      <div>
        <h1 style={{ marginBottom: 24, color: '#1a2036' }}>Visita #{id}</h1>
        {!loading && !visit && <p style={{ color: '#e53e3e' }}>Visita n?o encontrada.</p>}
        {loading && <p style={{ color: '#64748b' }}>Carregando...</p>}
        <Link href="/visits" style={{ color: '#1a2036', marginTop: 16, display: 'inline-block' }}>&lt; Voltar para Visitas</Link>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 8, color: '#1a2036', fontSize: 22, fontWeight: 700 }}>Visita #{visit.id}</h1>
      <p style={{ marginBottom: 20 }}>
        <Link href="/visits" style={{ color: '#1a2036' }}>&lt; Voltar para Visitas</Link>
        {visit.lead_id && (
          <> | <Link href={`/leads/${visit.lead_id}`} style={{ color: '#1a2036' }}>Ver lead</Link></>
        )}
      </p>

      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 20, marginBottom: 20 }}>
        <h2 style={{ marginTop: 0, marginBottom: 16, color: '#1a2036', fontSize: 18 }}>Dados da visita</h2>
        <div style={{ display: 'flex', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
          <span style={{ fontWeight: 600, color: '#4a5568', width: 140, flexShrink: 0 }}>Data/Hora</span>
          <span>{new Date(visit.scheduled_at).toLocaleString('pt-BR')}</span>
        </div>
        <div style={{ display: 'flex', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
          <span style={{ fontWeight: 600, color: '#4a5568', width: 140, flexShrink: 0 }}>Status</span>
          <span>{STATUS_LABELS[visit.status || 'scheduled'] ?? visit.status}</span>
        </div>
        <div style={{ display: 'flex', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
          <span style={{ fontWeight: 600, color: '#4a5568', width: 140, flexShrink: 0 }}>Lead</span>
          <span>{leadName || (visit.lead_id ? `#${visit.lead_id}` : '-')}</span>
        </div>
        {visit.address && (
          <div style={{ display: 'flex', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
            <span style={{ fontWeight: 600, color: '#4a5568', width: 140, flexShrink: 0 }}>Endereco</span>
            <span>{visit.address}</span>
          </div>
        )}
        {visit.notes && (
          <div style={{ display: 'flex', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
            <span style={{ fontWeight: 600, color: '#4a5568', width: 140, flexShrink: 0 }}>Observa??es</span>
            <span style={{ whiteSpace: 'pre-wrap' }}>{visit.notes}</span>
          </div>
        )}

        <form onSubmit={onUpdateStatus} style={{ marginTop: 16 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Alterar status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ padding: 10, border: '2px solid #e2e8f0', borderRadius: 6, marginRight: 8 }}
          >
            {Object.entries(STATUS_LABELS).map(([k, l]) => (
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
            {updating ? 'Salvando...' : 'Atualizar'}
          </button>
        </form>
      </div>

      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 20 }}>
        <h2 style={{ marginTop: 0, marginBottom: 16, color: '#1a2036', fontSize: 18 }}>Medi??es</h2>
        <p style={{ color: '#64748b', fontSize: 14 }}>Registre medicoes nas observa??es da visita ou use o campo acima. Para medicoes detalhadas por ambiente, uma tabela de medicoes pode ser adicionada em vers?es futuras.</p>
      </div>
    </div>
  )
}
